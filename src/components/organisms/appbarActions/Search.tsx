import React, { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import * as S from './search/SearchStyle'
import { IconButton, Input } from '~/components/atoms'
import ResultPane from './search/ResultPane'
import { useSelector } from 'react-redux'
import State from '~/store/state'

interface Props {
  align: 'left' | 'right'
}

export default function Search(props: Props) {
  const [expanded, setExpanded] = useState(false)
  const [value, setValue] = useState('')
  const inputEl = useRef(null)
  const [searchStr, setSearchStr] = useState('')
  const dispatch = useDispatch()
  const podData = useSelector((state: State) => state.podcasts)

  function toggleExpand() {
    if (!expanded) setTimeout(() => inputEl.current.focus(), 200)
    setExpanded(!expanded)
  }

  function search(e: React.SyntheticEvent) {
    e.preventDefault()
    setSearchStr(value)
    dispatch({
      type: 'SEARCH_PODCAST',
      value: value,
    })
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
            onChange={setValue}
            value={value}
            elRef={inputEl}
            merge={true}
          />
        </form>
        {podData.searches[searchStr] && (
          <ResultPane
            podcasts={podData.searches[searchStr].map(id => podData.byId[id])}
          />
        )}
      </S.Expanded>
    </S.Search>
  )
}
