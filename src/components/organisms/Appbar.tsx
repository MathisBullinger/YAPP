import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { layout, shadow, responsive, timing } from '~/styles'
import { Title } from '~/components/atoms'
import { connect } from 'react-redux'

interface Props {
  title: string
}

class Appbar extends React.Component<Props> {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <ThemeProvider theme={{ topic: 'surface' }}>
        <S.Appbar>
          <Title s5>{this.props.title}</Title>
        </S.Appbar>
      </ThemeProvider>
    )
  }
}

export default connect(({ appbar }) => appbar)(Appbar)

namespace S {
  export const Appbar = styled.div`
    z-index: 2000;
    position: fixed;
    display: none;
    width: 100vw;
    height: ${() => layout.mobile.appbarHeight};
    ${({ theme }) =>
      theme.elevationMode === 'shadow' ? `box-shadow: ${shadow(2)};` : ''}
    background-color: ${({ theme }) => theme[theme.topic]().color};
    transition: background-color ${() => timing.colorSwap};
    overflow: hidden;
    flex-direction: row;
    align-items: center;
    padding-left: 2rem;

    & > * {
      margin: 0;
    }

    @media ${() => responsive.appbarVisible} {
      display: flex;
      ${({ theme }) =>
        theme.appbar
          ? ''
          : `
          transform: translateY(-100%);
          box-shadow: none;
        `}
    }
  `
}
