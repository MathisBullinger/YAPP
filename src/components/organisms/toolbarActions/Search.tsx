import React, { useState, useRef, SyntheticEvent } from 'react'
import styled from 'styled-components'
import { Input, styles } from '~/components/atoms'
import MiniResult from './search/MiniResult'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import State from '~/store/state'

export default function Search() {
  const [active, setActive] = useState(false)
  const [value, setValue] = useState('')
  const inputRef = useRef(null)
  const [searchStr, setSearchStr] = useState('')
  const dispatch = useDispatch()
  const podData = useSelector((state: State) => state.podcasts)

  function search(e: SyntheticEvent) {
    e.preventDefault()
    setSearchStr(value)
    dispatch({
      type: 'SEARCH_PODCAST',
      value: value,
    })
  }

  function toggleActive(v: boolean = !active) {
    if (v) setActive(true)
    else {
      setValue('')
      inputRef.current.blur()
      setTimeout(() => {
        if (this) setActive(false)
      }, 100)
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
      {active && podData.searches[searchStr] && (
        <MiniResult
          podcasts={podData.searches[searchStr].map(id => podData.byId[id])}
        />
      )}
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
