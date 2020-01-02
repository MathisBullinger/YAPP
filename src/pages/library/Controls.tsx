import React from 'react'
import { useDispatch } from 'react-redux'
import action from '~/store/actions'
import styled from 'styled-components'
import { Input, IconButton } from '~/components/atoms'
import { layout, responsive } from '~/styles'
import { useSelector } from '~/utils/hooks'

export default function Controls() {
  const dispatch = useDispatch()
  const search = useSelector(state => state.library.search)

  return (
    <S.Controls>
      <Input
        block
        placeholder="Search Library"
        value={search}
        onChange={v => dispatch(action('SET_SEARCH', v))}
        type="search"
      />
      <IconButton icon="sort" label="sort" onClick={() => {}} />
    </S.Controls>
  )
}

const S = {
  Controls: styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    margin-top: calc(-${layout.page.padding} + 1.5rem);
    margin-bottom: 1.5rem;
    justify-content: flex-end;

    @media ${responsive.navOnBottom} {
      display: none;
    }

    ${Input.sc} {
      width: 11rem;
      transition: width 0.15s ease 0.1s;
      margin-right: auto;

      &:focus {
        width: 20rem;
      }
    }
  `,
}
