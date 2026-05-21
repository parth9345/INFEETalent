type LexicalNode = {
  text?: string
  children?: LexicalNode[]
}

export const lexicalText = (value: unknown): string[] => {
  if (!value) {
    return []
  }

  if (typeof value === 'string') {
    return [value]
  }

  const root = value as { root?: { children?: LexicalNode[] } }
  const paragraphs = root.root?.children || []

  return paragraphs.map((paragraph) => collectText(paragraph).trim()).filter((text) => text.length > 0)
}

export const richTextFromPlain = (text: string) => ({
  root: {
    type: 'root',
    format: '',
    indent: 0,
    version: 1,
    children: text
      .split(/\n+/)
      .filter(Boolean)
      .map((line) => ({
        type: 'paragraph',
        format: '',
        indent: 0,
        version: 1,
        children: [
          {
            type: 'text',
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text: line,
            version: 1,
          },
        ],
        direction: 'ltr',
        textFormat: 0,
        textStyle: '',
      })),
    direction: 'ltr',
  },
})

const collectText = (node: LexicalNode): string => {
  if (node.text) {
    return node.text
  }

  return node.children?.map(collectText).join(' ') || ''
}
