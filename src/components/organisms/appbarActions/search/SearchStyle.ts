import styled from 'styled-components'
import { shadow } from '~/styles'

const transitionTime = '0.2s'

export const Search = styled.div`
  display: block;
`

export const Expanded = styled.div`
  position: absolute;
  transition: all 1s;
  top: 0;
  left: 100vw;
  height: 100%;
  width: 100%;
  visibility: hidden;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme[theme.topic](theme.variant).color};

  transition: transform ${transitionTime} ease ${transitionTime},
    visibility 0s linear calc(${transitionTime} * 2);

  input,
  svg {
    transition: transform ${transitionTime} ease;
    transition-delay: ${transitionTime};
  }

  input {
    margin-left: 1rem;
    opacity: 0;
  }

  &.active {
    visibility: visible;
    box-shadow: ${shadow(2)};

    transition: transform ${transitionTime} ease, visibility 0s;
    transition-delay: 0s;

    transform: translateX(-100vw);

    input,
    svg {
      transform: translateX(1rem);
      transition-delay: 0s;
    }

    input {
      opacity: 1;
      transition: none;
    }
  }
`
