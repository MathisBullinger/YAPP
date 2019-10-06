import React from 'react'
import styled from 'styled-components'

interface Props {
  cl: number
}

const Podcast: React.FunctionComponent<Props> = props => (
  <S.Podcast data-cl={props.cl} />
)
export default Podcast

namespace S {
  export const Podcast = styled.div`
    display: block;
    background-color: ${props =>
      '#' + (props['data-cl'] * 255).toString(16)[0].repeat(6)};
    padding-bottom: 100%;
  `
}
