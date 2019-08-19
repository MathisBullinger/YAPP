import React from 'react'
import { Title } from '~/components/atoms'

const Discover = () => (
  <div>
    <Title>Discover</Title>
  </div>
)
Discover.pageConf = {
  showAppbar: true,
  appbarTitle: 'Discover',
  appbarActions: [{ name: 'search', align: 'right' }],
}
export default Discover
