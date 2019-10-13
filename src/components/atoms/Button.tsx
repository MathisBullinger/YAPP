import React from 'react'
import styled from 'styled-components'
import { shadow, timing } from '~/styles'
import { blendHexColorString } from '~/utils'

interface Props {
  children?: string
  contained?: boolean
  outlined?: boolean
  text?: boolean
  onClick?(): void
}

export default function Button(props: Props) {
  const Button = props.contained
    ? S.Contained
    : props.outlined
    ? S.Outlined
    : props.text
    ? S.Text
    : S.Contained

  return <Button onClick={props.onClick}>{props.children}</Button>
}

export const S = {
  Button: styled.button`
    -moz-appearance: none;
    -webkit-appearance: none;
    border: none;
    font-size: 1rem;
    padding-top: 0.55rem;
    padding-bottom: 0.55rem;
    padding-left: 1rem;
    padding-right: 1rem;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
    border-radius: 0.3rem;
    cursor: pointer;
    transition: background-color ${timing.colorSwap}, color ${timing.colorSwap},
      border-color ${timing.colorSwap}, box-shadow 0.15s ease;
  `,
  get Contained() {
    return styled(this.Button)`
      background-color: ${({ theme }) => theme.primary(theme.variant).color};
      color: ${({ theme }) => theme.primary(theme.variant).on('high')};
      box-shadow: ${shadow(0.5)};

      &:hover {
        box-shadow: ${shadow(1.2)};
      }
    `
  },
  get Outlined() {
    return styled(this.Button)`
      background-color: ${({ theme }) => theme.surface(theme.variant).color};
      color: ${({ theme }) => theme.primary(theme.variant).color};
      border: 0.15rem solid ${({ theme }) => theme.primary(theme.variant).color};

      &:hover {
        background-color: ${({ theme }) =>
          blendHexColorString(
            theme.primary(theme.variant).color.substring(0, 7) + '22',
            theme.surface(theme.variant).color
          )};
      }
    `
  },
  get Text() {
    return styled(this.Button)`
      background-color: transparent;
      color: ${({ theme }) => theme.primary(theme.variant).color};

      &:hover {
        background-color: ${({ theme }) =>
          theme.primary(theme.variant).color.substring(0, 7) + '22'};
      }
    `
  },
}
