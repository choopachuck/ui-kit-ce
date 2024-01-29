import React from 'react'

export const createDefaultStory = (Component: React.FunctionComponent) => {
  return {
    parameters: {
      liveCodeEditor: {
        disable: true,
      },
    },
    component: <Component />,
  }
}
