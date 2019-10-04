import React, { useState } from 'react'
import styled from 'styled-components'

interface Props {
  handleChange?(v: number): void
  min?: number
  max?: number
  step?: number
}

export default function Slider({
  handleChange,
  min = 0,
  max = 100,
  step = 1,
}: Props) {
  const [value, setValue] = useState('1')

  return (
    <S.Slider
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={v => {
        setValue(v.target.value)
        handleChange && handleChange(parseInt(value, 10) / 100)
      }}
    />
  )
}

const S = {
  Slider: styled.input`
    -webkit-appearance: none;
    background: transparent;
    display: flex;
    align-items: center;
    height: 2rem;
    position: relative;
    width: 100%;

    &::before,
    &::after {
      content: '';
      z-index: -1;
      position: absolute;
      height: 0.3rem;
      cursor: pointer;
      background: red;
    }

    &::before {
      border-top-left-radius: 0.15rem;
      border-bottom-left-radius: 0.15rem;
      width: ${props =>
        ((props.value as number) / (props.max as number)) * 100}%;
      background-color: ${({ theme }) =>
        theme[theme.topic](theme.variant).on('high')};
    }

    &::after {
      right: 0;
      width: 50%;
      border-top-right-radius: 0.15rem;
      border-bottom-right-radius: 0.15rem;
      width: ${props =>
        (1 - (props.value as number) / (props.max as number)) * 100}%;
      background-color: ${({ theme }) =>
        theme[theme.topic](theme.variant)
          .on()
          .substring(0, 7)}33;
    }

    &:focus {
      outline: none;
    }

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
    }

    &:hover {
      &::-webkit-slider-thumb {
        height: 0.8rem;
        width: 0.8rem;
        background-color: white;
        border-radius: 0.4rem;
      }

      &::before {
        background-color: ${({ theme }) => theme.primary(theme.variant).color};
      }
    }
  `,
}
