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
    <Text s1 emp="high" className="pageName">
      {props.children}
    </Text>
  </S.Item>
)
export default Item

namespace S {
  export const Item = styled(NavLink)`
    display: flex;
    align-items: center;
    text-decoration: none;

    .pageName {
      margin-left: 1rem;
      display: none;
    }

    svg {
      width: 1.8rem;
      height: 1.8rem;
    }

    @media ${() => responsive.navOnSide} {
      margin-bottom: 1.5rem;

      .pageName {
        display: initial;
      }

      svg {
        width: 1.5rem;
        height: 1.5rem;
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
