import React from 'react'
import { Title } from '~/components/atoms'

const Profile = () => (
  <div>
    <Title>Profile</Title>
  </div>
)
Profile.pageConf = {
  showAppbar: true,
  appbarTitle: 'Profile',
  appbarActions: [{ name: 'Settings', align: 'right' }],
}
export default Profile
