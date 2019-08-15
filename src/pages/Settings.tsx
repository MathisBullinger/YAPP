import React from 'react'
import { Title, Switch } from '~/components/atoms'
import { Labeled } from '~/components/molecules'
import styled from 'styled-components'

export default class Settings extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <S.Settings>
        <Title s4>Appearance</Title>
        <Labeled for={<Switch />}>amoled dark mode</Labeled>
        <Labeled for={<Switch />}>use dark theme at night</Labeled>
      </S.Settings>
    )
  }
}

namespace S {
  export const Settings = styled.div``
}
