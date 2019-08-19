import React from 'react'
import styled from 'styled-components'
import { IconButton, Input } from '~/components/atoms'
import { withRouter } from 'react-router-dom'
import { RouteComponentProps } from 'react-router'

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
  export const Search = styled.div``

  export const Expanded = styled.div`
    position: absolute;
    transition: all 1s;
    top: 0;
    height: 100%;
    width: 100%;
    transition: transform 0.5s ease, visibility 0s 0.5s;
    visibility: hidden;
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: ${({ theme }) => theme[theme.topic](theme.variant).color};

    input,
    svg {
      transition: transform 0.5s ease;
    }

    input {
      margin-left: 1rem;
      opacity: 0;
      transition: opacity 0.5s ease-in;
    }

    &.active {
      visibility: visible;
      transition: transform 0.5s ease;

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
