const stringify = (value, depth) => {
  if (typeof value !== 'object' || value === null) return String(value)
  const indent = ' '.repeat(depth * 4 - 2)
  const bracketIndent = ' '.repeat((depth - 1) * 4)
  const lines = Object.entries(value).map(
    ([key, val]) => `${indent}  ${key}: ${stringify(val, depth + 1)}`,
  )
  return `{\n${lines.join('\n')}\n${bracketIndent}}`
}

const format = (tree, depth = 1) => {
  const indent = ' '.repeat(depth * 4 - 2)
  const bracketIndent = ' '.repeat(depth * 4)
  const lines = tree.map((node) => {
    switch (node.type) {
      case 'nested':
        return `${indent}  ${node.key}: {\n${format(node.children, depth + 1)}\n${bracketIndent}}`
      case 'added':
        return `${indent}+ ${node.key}: ${stringify(node.value, depth + 1)}`
      case 'removed':
        return `${indent}- ${node.key}: ${stringify(node.value, depth + 1)}`
      case 'changed':
        return `${indent}- ${node.key}: ${stringify(node.oldValue, depth + 1)}\n${indent}+ ${node.key}: ${stringify(node.newValue, depth + 1)}`
      case 'unchanged':
        return `${indent}  ${node.key}: ${stringify(node.value, depth + 1)}`
      default: return ''
    }
  })
  return lines.join('\n')
}

const stylish = tree => `{\n${format(tree)}\n}`

export default stylish
