import { readFileSync } from 'node:fs'
import path from 'node:path'
import parse from './parsers.js'
import build from './diff.js'
import stylish from './formatters/stylish.js'

const genDiff = (filepath1, filepath2) => {
  const absolutePath1 = path.resolve(process.cwd(), filepath1)
  const absolutePath2 = path.resolve(process.cwd(), filepath2)

  const content1 = readFileSync(absolutePath1, 'utf-8')
  const content2 = readFileSync(absolutePath2, 'utf-8')

  const ext1 = path.extname(filepath1).slice(1)
  const ext2 = path.extname(filepath2).slice(1)

  const data1 = parse(content1, ext1)
  const data2 = parse(content2, ext2)

  const tree = build(data1, data2)
  return stylish(tree)
}

export default genDiff
