import React from 'react'

export const Col: React.FC = ({ children }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '33.3333%',
        gap: '12px',
      }}
    >
      {children}
    </div>
  )
}
