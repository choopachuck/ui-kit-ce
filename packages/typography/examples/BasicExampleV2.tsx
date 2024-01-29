import React from 'react'
import { Text } from '@v-uik/base'

export const BasicExampleV2 = (): JSX.Element => {
  return (
    <>
      <Text gutterBottom kind="displayLg">
        displayLg. Display Large
      </Text>
      <Text gutterBottom kind="displayMd">
        displayMd. Display Medium
      </Text>
      <Text gutterBottom kind="displaySm">
        displaySm. Display Small
      </Text>
      <Text gutterBottom kind="headline1">
        headline1. Headline 1 Text
      </Text>
      <Text gutterBottom kind="headline2">
        headline2. Headline 2 Text
      </Text>
      <Text gutterBottom kind="headline3">
        headline3. Headline 3 Text
      </Text>
      <Text gutterBottom kind="headline4">
        headline4. Headline 4 Text
      </Text>
      <Text gutterBottom kind="headline5">
        headline5. Headline 5 Text
      </Text>
      <Text gutterBottom kind="titleLg">
        titleLg. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Blanditiis eaque fugiat in ipsam iure laboriosam ratione, repellat
        repudiandae suscipit voluptatum!
      </Text>
      <Text gutterBottom kind="titleMd">
        titleMd. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Blanditiis eaque fugiat in ipsam iure laboriosam ratione, repellat
        repudiandae suscipit voluptatum!
      </Text>
      <Text gutterBottom kind="titleSm">
        titleSm. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Blanditiis eaque fugiat in ipsam iure laboriosam ratione, repellat
        repudiandae suscipit voluptatum!
      </Text>
      <Text gutterBottom kind="bodyXl">
        bodyXl. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Blanditiis eaque fugiat in ipsam iure laboriosam ratione, repellat
        repudiandae suscipit voluptatum!
      </Text>
      <Text gutterBottom kind="bodyLg">
        bodyLg. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Blanditiis eaque fugiat in ipsam iure laboriosam ratione, repellat
        repudiandae suscipit voluptatum!
      </Text>
      <Text gutterBottom kind="bodyMd">
        bodyMd. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Blanditiis eaque fugiat in ipsam iure laboriosam ratione, repellat
        repudiandae suscipit voluptatum!
      </Text>
      <Text gutterBottom kind="bodySm">
        bodySm. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Blanditiis eaque fugiat in ipsam iure laboriosam ratione, repellat
        repudiandae suscipit voluptatum!
      </Text>
      <div>
        <Text gutterBottom kind="uiTextLg">
          uiTextLg. UI Text Large
        </Text>
      </div>
      <div>
        <Text gutterBottom kind="uiTextMd">
          uiTextMd. UI Text Medium
        </Text>
      </div>
      <div>
        <Text gutterBottom kind="uiTextSm">
          uiTextSm. UI Text Sm
        </Text>
      </div>
      <Text gutterBottom kind="codeLg">
        {`const codeLg = [
  { id: 1, name: 'First' },
  { id: 2, name: 'Second' },
  { id: 3, name: 'Third' },
]`}
      </Text>
      <Text gutterBottom kind="codeMd">
        {`const codeMd = [
  { id: 1, name: 'First' },
  { id: 2, name: 'Second' },
  { id: 3, name: 'Third' },
]`}
      </Text>
      <Text gutterBottom kind="codeSm">
        {`const codeSm = [
  { id: 1, name: 'First' },
  { id: 2, name: 'Second' },
  { id: 3, name: 'Third' },
]`}
      </Text>
    </>
  )
}
