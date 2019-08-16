import React from 'react'
import { Text } from '~/components/atoms'
import { StackedList } from '~/components/molecules'
import styled from 'styled-components'

export default class Settings extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <S.Settings>
        <StackedList
          sections={[
            {
              title: 'Appearance',
              items: Array(15)
                .fill(0)
                .map((_, i) => <Text key={`item${i}`}>item {i}</Text>),
            },
            {
              title: 'Playback',
              items: Array(100)
                .fill(0)
                .map((_, i) => <Text key={`item2${i}`}>item {i}</Text>),
            },
          ]}
        />
      </S.Settings>
    )
  }
}

namespace S {
  export const Settings = styled.div``
}
