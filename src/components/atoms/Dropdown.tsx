import React, { FunctionComponent } from 'react'
import styled from 'styled-components'

interface Props {
  items: string[]
  onInput?(v: string): void
}

const Dropdown: FunctionComponent<Props> = ({ items, onInput }: Props) => (
  <Select onChange={e => onInput && onInput(e.target.value)}>
    {items.map(item => (
      <option key={item}>{item}</option>
    ))}
  </Select>
)
export default Dropdown

const Select = styled.select`
  display: block;
  margin-top: 2rem;
  margin-bottom: 2rem;
`
