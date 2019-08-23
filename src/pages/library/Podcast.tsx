import React from 'react'
import styled from 'styled-components'

const Podcast: React.FunctionComponent = () => <S.Podcast />
export default Podcast

namespace S {
  export const Podcast = styled.div`
    display: block;
    background-color: ${({ color = Math.random() * 100 + 50 }) =>
      `rgba(${color}, ${color}, ${color})`};
    padding-bottom: 100%;
  `
}
