import React, { FunctionComponent } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { shadow, timing } from '~/styles'

interface Props {
  value?: 'on' | 'off'
  onInput?(v: boolean): void
  inset?: boolean
  id?: string
}

const Switch: FunctionComponent<Props> = props => (
  <ThemeProvider theme={{ ...(!props.inset && { topic: 'primary' }) }}>
    <S.Switch
      className={props.inset ? 'inset' : ''}
      data-value={props.value || 'off'}
      aria-checked={props.value === 'on' ? 'true' : 'false'}
      id={props.id}
      onClick={({ target }: { target: any }) => {
        target.setAttribute(
          'aria-checked',
          target.dataset.value === 'on' ? 'false' : 'true'
        )
        target.dataset.value = target.dataset.value === 'on' ? 'off' : 'on'
        if (props.onInput) props.onInput(target.dataset.value === 'on')
      }}
    />
  </ThemeProvider>
)
export default Switch

namespace S {
  const scale = 1
  const height = 1
  export const Switch = styled.button`
    display: block;
    position: relative;
    width: ${2 * height * scale}rem;
    height: ${0.8 * height * scale}rem;
    border-radius: ${0.4 * height * scale}rem;
    padding: 0;
    border: none;
    cursor: pointer;
    transition: background-color ${() => timing.colorSwap};
    background-color: ${({ theme }) =>
      theme
        .surface()
        .on()
        .substring(0, 7)}88;

    &:focus {
      outline: none;
    }

    &:after {
      content: '';
      display: block;
      width: ${height * scale}rem;
      height: ${height * scale}rem;
      border-radius: 50%;
      background-color: ${({ theme }) =>
        !theme.invertAction
          ? theme.surface().color
          : theme
              .surface()
              .on()
              .substring(0, 7)};
      box-shadow: ${shadow(1)};
      transition: transform 0.15s ease,
        background-color ${() => timing.colorSwap};
      position: absolute;
      transform: translateY(-50%) translateX(-10%);
    }

    &[data-value='on'] {
      background-color: ${({ theme }) =>
        `${theme[theme.topic](theme.variant).color}${
          theme.invertAction ? '88' : ''
        }`};

      &:after {
        transform: translateY(-50%) translateX(calc(10% + ${height * scale}rem));
        background-color: ${({ theme }) =>
          theme.invertAction
            ? theme[theme.topic](theme.variant).color
            : theme.surface().color};
      }
    }

    &.inset {
      height: ${height * scale}rem;
      border-radius: ${1 * height * scale}rem;
      background-color: ${({ theme }) =>
        theme[theme.topic](theme.variant).on('disabled')};

      &:after {
        height: ${0.75 * scale}rem;
        width: ${0.75 * scale}rem;
        box-shadow: none;
        background-color: ${({ theme }) =>
          theme[theme.topic](theme.variant).color};
        transform: translateY(-50%) translateX(17%);
      }

      &[data-value='on'] {
        background-color: ${({ theme }) =>
          theme[theme.topic](theme.variant).on('high')};

        &:after {
          transform: translateY(-50%)
            translateX(calc(${(2 - 0.75) * height * scale}rem - 17%));
        }
      }
    }
  `
}
