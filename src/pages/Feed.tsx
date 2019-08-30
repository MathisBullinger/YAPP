import React from 'react'
import { Title } from '~/components/atoms'

class Feed extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Title>Feed</Title>
      </div>
    )
  }
}
;(Feed as any).pageConf = {
  showAppbar: true,
  appbarTitle: 'Feed',
}
export default Feed
