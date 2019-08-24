import React from 'react'
import styled from 'styled-components'
import { timing } from '~/styles'

class Progress extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <S.Bar />
  }
}
export default Progress

namespace S {
  export const Bar = styled.div`
    position: absolute;
    width: 100%;
    height: 0.2rem;
    top: 100%;
    left: 0;
    transform: translateY(-100%);
    overflow-x: hidden;

    transition: height 0.5s ease, background-color ${() => timing.colorSwap};
    background-color: ${({ theme }) => theme.primary().color.substring(0, 7)}66;

    &:before,
    &:after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      will-change: left, right;
      background-color: ${({ theme }) => theme.primary().color};
      transition: background-color ${() => timing.colorSwap};
    }

    &:before {
      animation: indeterminate 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395)
        infinite;
    }

    &:after {
      animation: indeterminate-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1)
        infinite;
      animation-delay: 1.15s;
    }

    @keyframes indeterminate {
      0% {
        left: -35%;
        right: 100%;
      }
      60% {
        left: 100%;
        right: -90%;
      }
      100% {
        left: 100%;
        right: -90%;
      }
    }

    @keyframes indeterminate-short {
      0% {
        left: -200%;
        right: 100%;
      }
      60% {
        left: 107%;
        right: -8%;
      }
      100% {
        left: 107%;
        right: -8%;
      }
    }
  `
}
