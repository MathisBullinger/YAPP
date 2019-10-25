import React from 'react'
import styled from 'styled-components'
import Mask from './Mask'

interface Props {
  cl: number
}

const Podcast: React.FunctionComponent<Props> = props => (
  <S.Podcast data-cl={props.cl}>
    <Mask />
  </S.Podcast>
)
export default Podcast

const S = {
  Podcast: styled.div`
    position: relative;
    display: block;
    background-color: ${props =>
      '#' + (props['data-cl'] * 255).toString(16)[0].repeat(6)};
    padding-bottom: 100%;
  `,
}
