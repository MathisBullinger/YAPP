import React, { useState, useRef, SyntheticEvent } from 'react'
import styled from 'styled-components'
import { useQuery } from '@apollo/react-hooks'
import { Input, styles } from '~/components/atoms'
import SearchQuery from '~/gql/SearchPodcast.gql'
import MiniResult from './search/MiniResult'

export default function Search() {
  const [active, setActive] = useState(false)
  const [value, setValue] = useState('')
  const inputRef = useRef(null)
  const [searchStr, setSearchStr] = useState('')
  const { data } = useQuery(SearchQuery, {
    variables: { name: searchStr },
    skip: searchStr.length < 3,
  })

  const results = data && data.search

  function search(e: SyntheticEvent) {
    e.preventDefault()
    setSearchStr(value)
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
      {active && results && <MiniResult podcasts={results} />}
    </S.Search>
  )
}

namespace S {
  export const Search = styled.form`
    position: relative;

    ${styles.Input} {
      width: 13rem;
      text-align: center;
      transition: width 0.15s ease;
    }

    &.active {
      ${styles.Input} {
        width: 24rem;
        text-align: left;
      }
    }
  `
}
