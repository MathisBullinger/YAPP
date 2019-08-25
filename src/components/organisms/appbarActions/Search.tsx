import React, { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import * as S from './search/SearchStyle'
import { IconButton, Input } from '~/components/atoms'
import ResultPane from './search/ResultPane'

interface Props {
  align: 'left' | 'right'
}

export default function Search(props: Props) {
  const [expanded, setExpanded] = useState(false)
  const [value, setValue] = useState('')
  const dispatch = useDispatch()
  const inputEl = useRef(null)
  const [searchStr, setSearchStr] = useState('')
  const { loading, error, data } = useQuery(
    gql`
      query searchPodcast($name: String!) {
        search(name: $name) {
          name
          creator
        }
      }
    `,
    { variables: { name: searchStr }, skip: searchStr.length < 3 }
  )

  if (error) throw Error(error.message)

  if (loading)
    dispatch({
      type: 'TOGGLE_APPBAR_LOADING',
      value: true,
    })
  else dispatch({ type: 'TOGGLE_APPBAR_LOADING', value: false })

  function toggleExpand() {
    if (!expanded) setTimeout(() => inputEl.current.focus(), 200)
    setExpanded(!expanded)
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value)
  }

  function search(e: React.SyntheticEvent) {
    e.preventDefault()
    setSearchStr(value)
  }

  return (
    <S.Search className={'action ' + props.align}>
      <IconButton label="search podcast" icon="search" onClick={toggleExpand} />
      <S.Expanded className={expanded && 'active'}>
        <IconButton
          label="close search"
          icon="arrow_back"
          onClick={toggleExpand}
        />
        <form action="" onSubmit={e => search(e)}>
          <Input
            placeholder="Search podcast"
            value={value}
            onChange={handleChange}
            inputRef={inputEl}
          />
        </form>
        <ResultPane podcasts={!data ? [] : data.search} />
      </S.Expanded>
    </S.Search>
  )
}
