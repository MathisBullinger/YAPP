import React from 'react'
import { useDispatch } from 'react-redux'
import action from '~/store/actions'
import styled from 'styled-components'
import { Input } from '~/components/atoms'
import { layout, responsive } from '~/styles'

export default function Controls() {
  const dispatch = useDispatch()

  return (
    <S.Controls>
      <Input
        block
        placeholder="Search Library"
        onChange={v => dispatch(action('SET_SEARCH', v))}
      />
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

    @media ${responsive.navOnBottom} {
      display: none;
    }
  `,
}
