const stringify = (value) => {
  if (typeof value === 'object' && value !== null) {
    return '[complex value]'
  }
  return String(value)
}

const stylish = (tree) => {
  const lines = tree.map((node) => {
    const { key, type } = node

    switch (type) {
      case 'added':
        return `  + ${key}: ${stringify(node.value)}`
      case 'removed':
        return `  - ${key}: ${stringify(node.value)}`
      case 'changed':
        return `  - ${key}: ${stringify(node.oldValue)}\n  + ${key}: ${stringify(node.newValue)}`
      case 'unchanged':
        return `    ${key}: ${stringify(node.value)}`
      default:
        return ''
    }
  })

  return `{\n${lines.join('\n')}\n`
}

export default stylish
