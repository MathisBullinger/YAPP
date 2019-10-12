import React from 'react'
import styled from 'styled-components'

export default function Spinner() {
  return (
    <S.Spinner viewBox="25 25 50 50">
      <circle cx="50" cy="50" r="20" strokeDashoffset={0.5 * 81.68141 * -1} />
    </S.Spinner>
  )
}

const S = {
  Spinner: styled.svg`
    width: 5rem;
    height: 5rem;
    animation: rotate 2s linear infinite;

    circle {
      fill: transparent;
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
      stroke-width: 3;
      stroke-linecap: round;
      stroke: ${({ theme }) => theme.primary().color};
      stroke: ${({ theme }) => theme.vibrant};
      animation: progress 1.5s ease-in-out infinite,
        color 6s ease-in-out infinite;
    }

    @keyframes rotate {
      100% {
        transform: rotate(360deg);
      }
    }

    @keyframes progress {
      0% {
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
      }
      50% {
        stroke-dasharray: 89, 200;
        stroke-dashoffset: -35px;
      }
      100% {
        stroke-dasharray: 89, 200;
        stroke-dashoffset: -124px;
      }
    }
  `,
}
