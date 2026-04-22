const formatValue = (value) => {
  if (typeof value === 'object' && value !== null) {
    return '[complex value]'
  }
  if (typeof value === 'string') {
    return `'${value}'`
  }
  return String(value)
}

const plain = (diff, parentPath = '') => {
  const lines = diff
    .filter(item => item.type !== 'unchanged')
    .map((item) => {
      const fullPath = parentPath ? `${parentPath}.${item.key}` : item.key

      switch (item.type) {
        case 'nested':
          // Рекурсивно обрабатываем вложенные узлы
          return plain(item.children, fullPath)
        case 'added':
          return `Property '${fullPath}' was added with value: ${formatValue(item.value)}`
        case 'removed':
          return `Property '${fullPath}' was removed`
        case 'changed':
          return `Property '${fullPath}' was updated. From ${formatValue(item.oldValue)} to ${formatValue(item.newValue)}`
        default:
          return ''
      }
    })
    .flat()
    .filter(Boolean)

  return lines.join('\n')
}

export default plain
