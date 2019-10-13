import React, { FunctionComponent } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { shadow, timing, responsive } from '~/styles'

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

const S = {
  Switch: styled.button`
    --scale: 1.15;

    @media ${responsive.navOnSide} {
      --scale: 1;
    }

    display: block;
    position: relative;

    width: calc(2rem * var(--scale));
    height: calc(0.8rem * var(--scale));
    border-radius: calc(0.4rem * var(--scale));

    padding: 0;
    border: none;
    cursor: pointer;
    transition: background-color ${timing.colorSwap};
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

      width: calc(1rem * var(--scale));
      height: calc(1rem * var(--scale));

      border-radius: 50%;
      background-color: ${({ theme }) =>
        !theme.invertAction
          ? theme.surface().color
          : theme
              .surface()
              .on()
              .substring(0, 7)};
      box-shadow: ${shadow(1)};
      transition: transform 0.15s ease, background-color ${timing.colorSwap};
      position: absolute;
      transform: translateY(-50%) translateX(-10%);
    }

    &[data-value='on'] {
      background-color: ${({ theme }) =>
        `${theme[theme.topic](theme.variant).color}${
          theme.invertAction ? '88' : ''
        }`};

      &:after {
        transform: translateX(calc(1rem * var(--scale) + 10%)) translateY(-50%);

        background-color: ${({ theme }) =>
          theme.invertAction
            ? theme[theme.topic](theme.variant).color
            : theme.surface().color};
      }
    }

    &.inset {
      height: calc(1rem * var(--scale));
      border-radius: calc(1rem * var(--scale));
      background-color: ${({ theme }) =>
        theme[theme.topic](theme.variant).on('disabled')};

      &:after {
        width: calc(0.75rem * var(--scale));
        height: calc(0.75rem * var(--scale));

        box-shadow: none;
        background-color: ${({ theme }) =>
          theme[theme.topic](theme.variant).color};
        transform: translateY(-50%) translateX(17%);
      }

      &[data-value='on'] {
        background-color: ${({ theme }) =>
          theme[theme.topic](theme.variant).on('high')};

        &:after {
          transform: translateX(calc((2rem - 0.75rem) * var(--scale) - 17%))
            translateY(-50%);
        }
      }
    }
  `,
}
