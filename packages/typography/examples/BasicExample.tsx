import React from 'react'
import { Text } from '@v-uik/base'

export const BasicExample = (): JSX.Element => {
  return (
    <>
      <Text gutterBottom kind="h1">
        h1. Heading
      </Text>
      <Text gutterBottom kind="h2">
        h2. Heading
      </Text>
      <Text gutterBottom kind="h3">
        h3. Heading
      </Text>
      <Text gutterBottom kind="h4">
        h4. Heading
      </Text>
      <Text gutterBottom kind="h5">
        h5. Heading
      </Text>
      <Text gutterBottom kind="h6">
        h6. Heading
      </Text>
      <Text gutterBottom kind="subtitle1">
        subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Blanditiis eaque fugiat in ipsam iure laboriosam ratione, repellat
        repudiandae suscipit voluptatum!
      </Text>
      <Text gutterBottom kind="subtitle2">
        subtitle2. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Blanditiis eaque fugiat in ipsam iure laboriosam ratione, repellat
        repudiandae suscipit voluptatum!
      </Text>
      <Text gutterBottom kind="body1">
        body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Blanditiis eaque fugiat in ipsam iure laboriosam ratione, repellat
        repudiandae suscipit voluptatum!
      </Text>
      <Text gutterBottom kind="body2">
        body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Blanditiis eaque fugiat in ipsam iure laboriosam ratione, repellat
        repudiandae suscipit voluptatum!
      </Text>
      <Text gutterBottom kind="button" as="div">
        button. Button text
      </Text>
      <Text gutterBottom kind="caption" as="div">
        caption. Caption text
      </Text>
      <Text gutterBottom kind="overline" as="div">
        overline. Overline text
      </Text>
      <Text gutterBottom kind="code1">
        {`const code1 = [
          { id: 1, name: 'First' },
          { id: 2, name: 'Second' },
          { id: 3, name: 'Third' },
        ]`}
      </Text>
      <Text gutterBottom kind="code2">
        {`const code2 = [
          { id: 1, name: 'First' },
          { id: 2, name: 'Second' },
          { id: 3, name: 'Third' },
        ]`}
      </Text>
    </>
  )
}
