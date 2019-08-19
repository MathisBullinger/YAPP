import React from 'react'
import { Title, Input } from '~/components/atoms'

const Discover = () => (
  <div>
    <Title>Discover</Title>
    <Input />
  </div>
)
Discover.pageConf = {
  showAppbar: true,
  appbarTitle: 'Discover',
  appbarActions: [{ name: 'search', align: 'right' }],
}
export default Discover
