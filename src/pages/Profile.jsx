import React from 'react'
import styled from 'styled-components'
import { Page, Title } from 'atoms'

export default class Profile extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <ProfilePage>
        <Title>Profile</Title>
      </ProfilePage>
    )
  }
}

const ProfilePage = styled(Page)``
