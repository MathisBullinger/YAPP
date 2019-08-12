import React from 'react'
import icons from 'data/icons'

const Icon = name => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    {icons(name)}
  </svg>
)

export default Icon
