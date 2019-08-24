import React from 'react'
import styled from 'styled-components'
import { IconButton, Input } from '~/components/atoms'
import { withRouter } from 'react-router-dom'
import { RouteComponentProps } from 'react-router'
import { shadow } from '~/styles'
import ResultPane from './search/ResultPane'
import { connect } from 'react-redux'
import { toggleAppbarLoading } from '~/store/actions'

interface Props extends RouteComponentProps {
  align: 'left' | 'right'
  toggleAppbarLoading: typeof toggleAppbarLoading
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
        <IconButton
          label="search podcast"
          icon="search"
          onClick={() => this.toggleExpand()}
        />
        <S.Expanded
          ref={this.expandedRef}
          className={this.state.expanded && 'active'}
        >
          <IconButton
            label="close search"
            icon="arrow_back"
            onClick={() => this.toggleExpand()}
          />
          <form action="" onSubmit={e => e.preventDefault()}>
            <Input placeholder="Search podcast" />
          </form>
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

  componentDidMount() {
    this.props.toggleAppbarLoading(true)
    setTimeout(this.props.toggleAppbarLoading, 3000)
  }
}
export default connect(
  null,
  { toggleAppbarLoading }
)(withRouter(Search))

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
    visibility: hidden;
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: ${({ theme }) => theme[theme.topic](theme.variant).color};

    transition: transform ${transitionTime} ease ${transitionTime},
      visibility 0s linear calc(${transitionTime} * 2);

    input,
    svg {
      transition: transform ${transitionTime} ease;
      transition-delay: ${transitionTime};
    }

    input {
      margin-left: 1rem;
      opacity: 0;
    }

    &.active {
      visibility: visible;
      box-shadow: ${shadow(2)};

      transition: transform ${transitionTime} ease, visibility 0s;
      transition-delay: 0s;

      // @ts-ignore
      ${({ forwardedRef: { current: ref } }) => {
        if (!ref) return
        return `
          transform: translateX(${-ref.offsetLeft}px);
          
          input, svg {
            transform: translateX(1rem);
            transition-delay: 0s;
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
