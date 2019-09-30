import React, { useState } from 'react'
import styled from 'styled-components'

interface Props {
  handleChange(v: number): void
}

export default function Volume({ handleChange }: Props) {
  const [value, setValue] = useState('100')

  return (
    <S.Slider
      type="range"
      min={0}
      max={100}
      value={value}
      onChange={v => (
        setValue(v.target.value), handleChange(parseInt(value, 10) / 100)
      )}
    />
  )
}

const S = {
  Slider: styled.input``,
}
