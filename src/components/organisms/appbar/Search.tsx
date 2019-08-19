import React from 'react'
import { IconButton } from '~/components/atoms'
import { withRouter } from 'react-router-dom'
import { RouteComponentProps } from 'react-router'

interface Props extends RouteComponentProps {
  align: 'left' | 'right'
}

const Search: React.FunctionComponent<Props> = props => (
  <IconButton
    className={`action ${props.align}`}
    icon="search"
    onClick={alert}
  />
)
export default withRouter(Search)
