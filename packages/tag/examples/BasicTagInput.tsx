import * as React from 'react'
import { TagInput, Tag } from '@v-uik/base'

export const BasicTagInput = (): React.ReactElement => {
  const [text, setText] = React.useState<string>('')
  const [tags, setTags] = React.useState<string[]>(['Tag'])

  const handleTagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value)
  }

  const handleTagSubmit = (value: string) => {
    setTags([...tags, value])
    setText('')
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-start', gap: 16 }}>
      <TagInput
        value={text}
        placeholder="Tag"
        onChange={handleTagChange}
        onSubmit={handleTagSubmit}
      >
        Add
      </TagInput>
      {tags.map((item) => (
        <Tag key={item}>{item}</Tag>
      ))}
    </div>
  )
}

export default BasicTagInput
