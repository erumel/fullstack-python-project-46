import { fileURLToPath } from 'node:url'
import path, { dirname } from 'node:path'
import fs from 'node:fs'
import { describe, test, expect } from '@jest/globals'
import genDiff from '../src/index.js'
import parse from '../src/parsers.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const getFixturePath = filename => path.join(__dirname, '__fixtures__', filename)
const readFile = filename => fs.readFileSync(getFixturePath(filename), 'utf-8')

describe('gendiff for flat files', () => {
  const expectedStylish = readFile('stylish_flat.txt')
  const expectedPlain = readFile('plain_flat.txt')
  const expectedJson = readFile('json_flat.json')
  test('json files comparison stylish', () => {
    const result = genDiff(
      getFixturePath('file1.json'),
      getFixturePath('file2.json'),
      'stylish',
    )
    expect(result).toEqual(expectedStylish)
  })
  test('json files comparison plain', () => {
    const result = genDiff(
      getFixturePath('file1.json'),
      getFixturePath('file2.json'),
      'plain',
    )
    expect(result).toEqual(expectedPlain)
  })
  test('json files comparison json', () => {
    const result = genDiff(
      getFixturePath('file1.json'),
      getFixturePath('file2.json'),
      'json',
    )
    expect(result).toEqual(expectedJson)
  })
  test('yml files comparison stylish', () => {
    const result = genDiff(
      getFixturePath('file1.yml'),
      getFixturePath('file2.yml'),
      'stylish',
    )
    expect(result).toEqual(expectedStylish)
  })
  test('yml files comparison plain', () => {
    const result = genDiff(
      getFixturePath('file1.yml'),
      getFixturePath('file2.yml'),
      'plain',
    )
    expect(result).toEqual(expectedPlain)
  })
  test('yml files comparison json', () => {
    const result = genDiff(
      getFixturePath('file1.yml'),
      getFixturePath('file2.yml'),
      'json',
    )
    expect(result).toEqual(expectedJson)
  })
  describe('gendiff for nested files', () => {
    const expectedStylishNested = readFile('stylish_nested.txt')
    const expectedPlainNested = readFile('plain_nested.txt')
    const expectedJsonNested = readFile('json_nested.json')

    test('json nested files comparison stylish', () => {
      const result = genDiff(
        getFixturePath('file1_nested.json'),
        getFixturePath('file2_nested.json'),
        'stylish',
      )
      expect(result).toEqual(expectedStylishNested)
    })
    test('json nested files comparison plain', () => {
      const result = genDiff(
        getFixturePath('file1_nested.json'),
        getFixturePath('file2_nested.json'),
        'plain',
      )
      expect(result.trim()).toEqual(expectedPlainNested)
    })
    test('json nested files comparison json', () => {
      const result = genDiff(
        getFixturePath('file1_nested.json'),
        getFixturePath('file2_nested.json'),
        'json',
      )
      expect(result.trim()).toEqual(expectedJsonNested.trim())
    })
  })
  test('unsupported file format should throw error', () => {
    expect(() => {
      parse('some content', 'txt')
    }).toThrow('Unsupported format: txt')
  })
  test('unknown format should throw error', () => {
    const filepath1 = getFixturePath('file1.json')
    const filepath2 = getFixturePath('file2.json')

    expect(() => {
      genDiff(filepath1, filepath2, 'unknown')
    }).toThrow('Unknown format: unknown')
  })
})
