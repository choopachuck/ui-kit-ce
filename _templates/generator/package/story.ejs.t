---
to: packages/<%= h.changeCase.paramCase(name) %>/story.mdx
---
import { Meta, Story, ArgsTable, Canvas, Source } from '@storybook/addon-docs'
import { <%= h.changeCase.pascal(name) %> } from '@v-uik/<%= h.changeCase.paramCase(name) %>'
import { createTitle, COMPONENTS } from '../../docs/showroom/config'
import { Basic<%= h.changeCase.pascal(name) %> } from './examples/Basic<%= h.changeCase.pascal(name) %>'
import RawBasic<%= h.changeCase.pascal(name) %> from '!!raw-loader!./examples/Basic<%= h.changeCase.pascal(name) %>'

<Meta title={createTitle([COMPONENTS., '<%= h.changeCase.pascal(name) %>'])} component={<%= h.changeCase.pascal(name) %>} />

<Story
  name="<%= h.changeCase.pascal(name) %>"
  parameters={{
    docs: {
      disable: true,
    },
  }}
>
  {(args) => (<<%= h.changeCase.pascal(name) %> {...args} />)}
</Story>

# <%= h.changeCase.pascal(name) %>

Новый компонент.

<ArgsTable of={<%= h.changeCase.pascal(name) %>} />

## import

```ts
import { <%= h.changeCase.pascal(name) %> } from '@v-uik/<%= h.changeCase.paramCase(name) %>'
```

## Пример

<Canvas withSource="none">
  <Basic<%= h.changeCase.pascal(name) %> />
</Canvas>

<Source language="tsx" code={RawBasic<%= h.changeCase.pascal(name) %>} />
