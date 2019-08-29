import React, { useState, useRef, SyntheticEvent } from 'react'
import styled from 'styled-components'
import { Input, styles } from '~/components/atoms'

export default function Search() {
  const [active, setActive] = useState(false)
  const [value, setValue] = useState('')
  const inputRef = useRef(null)

  function search(e: SyntheticEvent) {
    console.log(e.preventDefault())
  }

  function toggleActive(v: boolean = !active) {
    if (v) setActive(true)
    else {
      setValue('')
      setActive(false)
      inputRef.current.blur()
    }
  }

  return (
    <S.Search
      className={['action', ...(active ? ['active'] : [])].join(' ')}
      action=""
      onSubmit={search}
    >
      <Input
        block
        placeholder="Search podcast"
        onFocus={() => toggleActive(true)}
        onBlur={() => toggleActive(false)}
        onEscape={() => toggleActive(false)}
        value={value}
        onChange={setValue}
        elRef={inputRef}
      />
    </S.Search>
  )
}

namespace S {
  export const Search = styled.form`
    ${styles.Input} {
      width: 13rem;
      text-align: center;
      transition: width 0.15s ease;
    }

    &.active {
      ${styles.Input} {
        width: 20rem;
        text-align: left;
      }
    }
  `
}
