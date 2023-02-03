import fs from "node:fs/promises"
import path from "node:path"
import matter from "gray-matter"
import prettier from "prettier"
import assert from "node:assert"
import yaml from "js-yaml"

const robots_dir = "../content/collections/_robots"
const inherits_file = "../content/_data/robot_inherits.yml"
const output_dir = "./src/automated/robots/"

const { parameters } = yaml.load(await fs.readFile(inherits_file, "utf-8")) as {
  [key: string]: any
}

const inherits: Record<string, string> = {}
for (const [name, value] of Object.entries(parameters)) {
  inherits[name] = parse_parameter(name, value).replace(`"${name}": `, "")
}

for (const category of await fs.readdir(robots_dir)) {
  // don't read 11ty_data files
  if (category.startsWith("_")) continue
  for (const robot of await fs.readdir(path.join(robots_dir, category))) {
    // only read .md files
    if (!robot.endsWith(".md")) continue
    const str = await fs.readFile(path.join(robots_dir, category, robot), "utf-8")
    processRobot(str)
  }
}

async function processRobot(file_contents: string) {
  // fs.mkdir(output_dir, { recursive: true })
  const { data } = matter(file_contents)

  const name = data.slug.replace(/-/g, "_") + "_robot_schema"

  const robot = `import { z } from 'zod';

// 🤖${data.rname}

export const ${name} = ${zobj(
    `robot: ${zlit(JSON.stringify(data.rname))}`,
    ...parse_parameters(data.parameters)
  )}.describe("${data.purpose}")
  
export type ${data.slug.split(/-/g).map(capitalize).join("")}Robot = z.infer<typeof ${name}>
`

  await fs.mkdir(path.join(output_dir, data.service_slug), { recursive: true })
  await fs.writeFile(
    path.join(output_dir, data.service_slug, data.slug + ".ts"),
    prettier.format(robot, { parser: "typescript", semi: false, printWidth: 100 }),
    "utf-8"
  )
}

function parse_parameters(params: any): string[] {
  const result: string[] = []

  if (!params) return result

  for (const [name, value] of Object.entries(params)) {
    if (name === "_inherits" && Array.isArray(value)) {
      value.forEach((x) => result.push(`"${x}": ${inherits[x]}`))
      continue
    }

    result.push(parse_parameter(name, value))
  }

  return result
}

function parse_parameter(name: string, value: any) {
  try {
    return `"${name}": ${[
      parse_type(value),
      parse_default(value),
      parse_required(value),
      parse_description(value),
    ].join("")}`
  } catch (err) {
    console.error(name, value, err)
    return ""
  }
}

function parse_default(value: Record<string, any>) {
  if (value.default) {
    switch (typeof value.default) {
      case "string": {
        // if the string doesn't start with ` that usually means its just a description of the default
        // and not the actual default, so we ignore it.
        if (!value.default.startsWith("`")) return ""
        const str = value.default.trim()
        // remove the backticks
        const unwrapped = str.replace(/`/g, "")
        // parse the string as JSON
        const parsed = JSON.parse(unwrapped)
        if (parsed === null) return `.nullable().default(null)`
        // return stringified
        return zdefault(JSON.stringify(parsed))
      }
      case "number": {
        return zdefault(value.default)
      }
      default: {
        throw new Error("Unknown default type: " + value.default)
      }
    }
  }

  return ""
}

function parse_markdown(str: string) {
  return (
    str
      // remove line breaks but not if there are multiple in a row (keeps markdown paragraphs intact)
      .replace(/(?<!\\r\n?)\\r\n?(?!\\r\n?)/g, " ")
      // replace site.baseurl with transloadit.com
      .replace(/{{site.baseurl}}/g, "https://transloadit.com")
      // escape backticks
      .replace(/`{1}/g, "\\`")
      // escape template string replacement tokens (${})
      .replace(/\${/g, "\\${")
  )
}

function parse_description(value: Record<string, any>) {
  if (value.description) {
    return zdesc(parse_markdown(value.description))
  }

  return ""
}

function parse_required(value: Record<string, any>) {
  if (value.required) return ""
  return ".optional()"
}

function parse_type(value: string | Record<string, any>): string {
  const t = typeof value === "string" ? value.trim() : value.type.trim()
  assert(t, `No type provided: ${JSON.stringify(value)}`)

  switch (true) {
    case typeof value !== "string" && "suggested_values" in value: {
      const options = (value as Record<string, string | number | boolean[]>).suggested_values as (
        | string
        | number
        | boolean
      )[]

      if (options.every((v) => typeof v === "string")) {
        return zenum(...options.map((v) => JSON.stringify(v)))
      }

      return zunion(...options.map((v) => zlit(JSON.stringify(v))))
    }
    case t.startsWith("Integer("): {
      // grab everything inside the parentheses
      const opts = t.match(/\(([^)]+)\)/)?.[1]
      // range if includes -
      if (opts?.includes("-")) {
        // parse the range
        const [min, max] = opts
          .split("-")
          .map((str: string) => str.trim().replace(/`/g, ""))
          .map(Number)

        return znum(true, min, max)
      }

      if (opts?.includes(",")) {
        // parse the numbers
        const nums = opts
          .split(",")
          .map((str: string) => str.trim().replace(/`/g, ""))
          .map(Number)

        return zunion(...nums.map((n) => zlit(n)))
      }

      return znum(true)
    }
    case t.startsWith("String("): {
      // String with a default value, just return string
      return zstr()
    }
    case t === "Array of Arrays / String": {
      // very specific case
      return zarr(zarr(zstr()))
    }
    case t.includes("/"): // multiple types
      return zunion(...t.split("/").map(parse_type))
    case t.startsWith("Array of"): {
      return zarr(parse_type(t.replace("Array of", "").trim()))
    }
    case t === "Object" || t === "Objects":
      // return zrecord for now until we can get a more accurate type
      return zrecord()
    case t === "Float" || t === "Floats":
      return znum()
    case t === "Integer" || t === "Integers":
      return znum(true)
    case t === "JSON String" || t === "String" || t === "Strings":
      return zstr()
    case t === "Boolean":
      return zbool()
    case t === "Null":
      return znull()
    default:
      throw new Error(`Unknown type: ${t}`)
  }
}

function capitalize(str: string) {
  return str[0].toUpperCase() + str.slice(1)
}

function zdefault(value: string | number) {
  return `.default(${value})`
}

function zdesc(str: string) {
  return `.describe(\`${str}\`)`
}

function zarr(str: string) {
  return `z.array(${str})`
}

function zenum(...opts: (string | number)[]) {
  return `z.enum([${opts.join(", ")}])`
}

function zunion(...str: string[]) {
  return `z.union([${str.join(", ")}])`
}

function zbool() {
  return "z.boolean()"
}

function zrecord() {
  return `z.record(z.string())`
}

function znull() {
  return `z.null()`
}

function znum(int?: boolean, min?: number, max?: number) {
  return (
    "z.number()" + (int ? ".int()" : "") + (min ? `.min(${min})` : "") + (max ? `.max(${max})` : "")
  )
}

function zstr() {
  return "z.string()"
}

function zlit(str: string) {
  return `z.literal(${str})`
}

function zobj(...str: string[]) {
  return `z.object({${str.join(", ")}})`
}
