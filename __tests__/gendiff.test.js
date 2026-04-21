import { fileURLToPath } from 'node:url'
import path, { dirname } from 'node:path'
import fs from 'node:fs'
import { describe, test, expect } from '@jest/globals'
import genDiff from '../src/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const getFixturePath = filename => path.join(__dirname, '__fixtures__', filename)
const readFile = filename => fs.readFileSync(getFixturePath(filename), 'utf-8')

describe('gendiff for flat files', () => {
  const expectedStylish = readFile('stylish_flat.txt')

  test('json files comparison', () => {
    const result = genDiff(
      getFixturePath('file1.json'),
      getFixturePath('file2.json'),
    )
    expect(result).toEqual(expectedStylish)
  })
  test('yml files comparison', () => {
    const result = genDiff(
      getFixturePath('file1.yml'),
      getFixturePath('file2.yml'),
    )
    expect(result).toEqual(expectedStylish)
  })
  describe('gendiff for nested files', () => {
    const expectedStylishNested = readFile('stylish_nested.txt')

    test('json nested files comparison', () => {
      const result = genDiff(
        getFixturePath('file1_nested.json'),
        getFixturePath('file2_nested.json'),
      )
      expect(result).toEqual(expectedStylishNested)
    })
  })
})
