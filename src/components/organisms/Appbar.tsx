import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { layout, shadow, responsive, timing } from '~/styles'
import { Title } from '~/components/atoms'
import { connect } from 'react-redux'
import ReduxState from '~/store/state'

// @ts-ignore
import actionImport from './appbar/**.*'
const actions = Object.fromEntries(
  Object.entries(actionImport).map(([k, v]) => [
    k.toLowerCase(),
    Object.values(v)[0].default,
  ])
)

interface Props {
  title: string
  actions: ReduxState['appbar']['actions']
}

class Appbar extends React.Component<Props> {
  constructor(props) {
    super(props)
  }

  render() {
    const [actionsLeft, actionsRight] = this.props.actions.reduce(
      (a, c) =>
        !(c.name.toLowerCase() in actions)
          ? a
          : [
              [...a[0], ...(c.align === 'left' ? [c.name.toLowerCase()] : [])],
              [...a[1], ...(c.align === 'right' ? [c.name.toLowerCase()] : [])],
            ],
      [[], []]
    )
    return (
      <ThemeProvider theme={{ topic: 'surface' }}>
        <S.Appbar>
          {actionsLeft.map(action =>
            React.createElement(
              actions[action],
              { key: action, align: 'left' },
              null
            )
          )}
          <Title s5>{this.props.title}</Title>
          {actionsRight.map(action =>
            React.createElement(
              actions[action],
              { key: action, align: 'right' },
              null
            )
          )}
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
    padding-left: 1.5rem;
    padding-right: 1.5rem;

    .action.right:first-of-type {
      margin-left: auto;
    }

    .action.left {
      margin-left: -.5rem;
      margin-right: 1rem;
    }

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
