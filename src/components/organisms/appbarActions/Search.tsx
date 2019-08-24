import React from 'react'
import styled from 'styled-components'
import { IconButton, Input } from '~/components/atoms'
import { withRouter } from 'react-router-dom'
import { RouteComponentProps } from 'react-router'
import { shadow } from '~/styles'
import ResultPane from './search/ResultPane'

interface Props extends RouteComponentProps {
  align: 'left' | 'right'
}

interface State {
  expanded: boolean
}

class Search extends React.Component<Props, State> {
  state = {
    expanded: false,
  }
  expandedRef: React.RefObject<HTMLDivElement>

  constructor(props) {
    super(props)
    this.expandedRef = React.createRef()
  }

  render() {
    return (
      <S.Search className={`action ${this.props.align}`}>
        <IconButton icon="search" onClick={() => this.toggleExpand()} />
        <S.Expanded
          ref={this.expandedRef}
          className={[...(this.state.expanded ? ['active'] : [])].join(' ')}
        >
          <IconButton
            icon={this.state.expanded ? 'arrow_back' : 'search'}
            onClick={() => this.toggleExpand()}
          />
          <Input placeholder="Search podcast" />
          <ResultPane />
        </S.Expanded>
      </S.Search>
    )
  }

  toggleExpand() {
    if (!this.state.expanded) {
      this.setState({ expanded: true })
      setTimeout(
        () => this.expandedRef.current.querySelector('input').focus(),
        200
      )
    } else {
      this.setState({ expanded: false })
    }
  }
}
export default withRouter(Search)

namespace S {
  const transitionTime = '0.2s'

  export const Search = styled.div`
    display: block;
  `

  export const Expanded = styled.div`
    position: absolute;
    transition: all 1s;
    top: 0;
    height: 100%;
    width: 100%;
    transition: transform ${transitionTime} ease,
      visibility 0s ${transitionTime};
    visibility: hidden;
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: ${({ theme }) => theme[theme.topic](theme.variant).color};
    transition-delay: ${transitionTime};

    input,
    svg {
      transition: transform ${transitionTime} ease;
    }

    input {
      margin-left: 1rem;
      opacity: 0;
    }

    &.active {
      visibility: visible;
      transition: transform ${transitionTime} ease;
      transition-delay: 0s;
      box-shadow: ${shadow(2)};

      // @ts-ignore
      ${({ forwardedRef: { current: ref } }) => {
        if (!ref) return
        return `
          transform: translateX(${-ref.offsetLeft}px);

          input, svg {
            transform: translateX(1rem);
          }

          input {
            opacity: 1;
            transition: none;
          }
        `
      }}
    }
  `
}
