import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { Icon, Text } from '~/components/atoms'
import { responsive } from '~/styles/'
import { LocationDescriptor } from 'history'

interface Props {
  to: LocationDescriptor<any>
  icon: string
}

const Item: React.FunctionComponent<Props> = props => (
  <S.Item to={props.to} className="item">
    <Icon icon={props.icon} />
    <Text className="pageName">{props.children}</Text>
  </S.Item>
)
export default Item

namespace S {
  export const Item = styled(NavLink)`
    display: flex;
    align-items: center;

    .pageName {
      margin-left: 1rem;
      display: none;
    }

    @media ${() => responsive.navOnSide} {
      .pageName {
        display: initial;
      }
    }

    @media ${() => responsive.navCollapsed} {
      flex-direction: column;

      .pageName {
        margin-left: 0;
        display: initial;
      }
    }
  `
}
