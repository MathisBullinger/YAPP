import React, { FunctionComponent } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { shadow, timing } from '~/styles'

interface Props {
  value?: 'on' | 'off'
  onInput?(v: boolean): void
  inset?: boolean
}

const Switch: FunctionComponent<Props> = ({
  value = 'off',
  onInput,
  inset = false,
}) => (
  <ThemeProvider theme={{ ...(!inset && { topic: 'primary' }) }}>
    <SwitchStyled
      className={inset ? 'inset' : ''}
      data-value={value}
      aria-checked={value === 'on' ? 'true' : 'false'}
      onClick={({ target }: { target: any }) => {
        target.setAttribute(
          'aria-checked',
          target.dataset.value === 'on' ? 'false' : 'true'
        )
        target.dataset.value = target.dataset.value === 'on' ? 'off' : 'on'
        if (onInput) onInput(target.dataset.value === 'on')
      }}
    />
  </ThemeProvider>
)
export default Switch

const SwitchStyled = styled.div`
  display: inline-block;
  width: 2rem;
  height: 0.8rem;
  border-radius: 0.4rem;
  cursor: pointer;
  transition: background-color ${() => timing.colorSwap};
  background-color: ${({ theme }) =>
    theme
      .surface()
      .on()
      .substring(0, 7)}88;

  &:after {
    content: '';
    display: block;
    margin: 0;
    margin-top: -0.1rem;
    width: 1rem;
    height: 1rem;
    border-radius: 0.5rem;
    background-color: ${({ theme }) =>
      !theme.invertAction
        ? theme.surface().color
        : theme
            .surface()
            .on()
            .substring(0, 7)};
    box-shadow: ${shadow(1)};
    transition: transform 0.15s ease, background-color ${() => timing.colorSwap};
  }

  &[data-value='on'] {
    background-color: ${({ theme }) =>
      `${theme[theme.topic](theme.variant).color}${
        theme.invertAction ? '88' : ''
      }`};

    &:after {
      transform: translateX(100%);
      background-color: ${({ theme }) =>
        theme.invertAction
          ? theme[theme.topic](theme.variant).color
          : theme.surface().color};
    }
  }

  &.inset {
    height: 1.1rem;
    width: 2.2rem;
    border-radius: 0.6rem;
    background-color: ${({ theme }) =>
      theme[theme.topic](theme.variant).on('disabled')};

    &:after {
      height: 0.9rem;
      width: 0.9rem;
      border-radius: 0.45rem;
      margin: 0.1rem;
      box-shadow: none;
      background-color: ${({ theme }) =>
        theme[theme.topic](theme.variant).color};
    }

    &[data-value='on'] {
      background-color: ${({ theme }) =>
        theme[theme.topic](theme.variant).on('high')};

      &:after {
        transform: translateX(calc(100% + 0.2rem));
      }
    }
  }
`
