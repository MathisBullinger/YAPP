import React from 'react'
import styled from 'styled-components'
import { layout, shadow } from '~/styles'

const ResultPane: React.FunctionComponent = () => <S.Pane />
export default ResultPane

namespace S {
  const transitionTime = '0.2s'

  export const Pane = styled.div`
    position: absolute;
    display: block;
    top: 100%;
    visibility: hidden;
    width: 100%;
    left: 0;
    background-color: inherit;
    height: 2rem;
    transition: all ${transitionTime} ease;
    box-shadow: ${shadow(1)};
    z-index: -1;

    .active > & {
      transition-delay: ${transitionTime};
      visibility: visible;
      height: calc(100vh - 100% - ${layout.mobile.navHeight});
    }
  `
}
