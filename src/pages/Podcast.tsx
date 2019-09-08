import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'

interface RouteParams {
  id: string
}
interface Props extends RouteComponentProps<RouteParams> {}

function Podcast(props: Props) {
  return <div>podcast id: {props.match.params.id}</div>
}

export default withRouter(Podcast) as React.ComponentClass<{}>
