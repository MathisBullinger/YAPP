import React from 'react'
import { IconButton } from '~/components/atoms'
import { withRouter } from 'react-router-dom'
import { RouteComponentProps } from 'react-router'

interface Props extends RouteComponentProps {
  align: 'left' | 'right'
}

const Back: React.FunctionComponent<Props> = props => (
  <IconButton
    label="go back"
    className={`action ${props.align}`}
    icon="arrow_back"
    onClick={() => props.history.goBack()}
  />
)
export default withRouter(Back)
