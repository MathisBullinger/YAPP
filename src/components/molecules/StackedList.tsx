import React from 'react'
import styled from 'styled-components'
import { Title } from '~/components/atoms'
import { timing } from '~/styles'

interface Props {
  sections: Section[]
}

interface Section {
  title: string
  items: JSX.Element[]
}

const StackedList: React.FunctionComponent<Props> = props => (
  <S.List>
    {props.sections
      .map((section, i) => [
        ...(i === 0 ? [] : [<div className="buffer" key={`buffer${i}`} />]),
        <Title className="section-title" s5 key={section.title}>
          {section.title}
        </Title>,
        section.items,
      ])
      .flat()}
  </S.List>
)
export default StackedList

namespace S {
  export const List = styled.div`
    & > * {
      position: sticky;
      top: 10px;
    }

    .section-title {
      top: 0;
      overflow: hidden;
      z-index: 500;
      margin-top: 0;
      pointer-events: none;
      margin-right: -1rem;
      margin-bottom: 0;

      &:before {
        content: '';
        width: 100%;
        height: calc(100% - 2rem);
        display: block;
        position: absolute;
        z-index: -1;
        left: 0;
        top: 0;
        background-color: ${({ theme }) =>
          theme[theme.topic](theme.variant).color};
        transition: background-color ${() => timing.colorSwap};
        pointer-events: all;
      }

      &:after {
        content: '';
        display: block;
        margin-top: 0.9rem;
        width: 100%;
        height: 2rem;
        background: linear-gradient(
          ${({ theme }) => theme[theme.topic](theme.variant).color},
          ${({ theme }) =>
            theme[theme.topic](theme.variant).color.substring(0, 7)}00
        );
        transition: background-color ${() => timing.colorSwap};
      }
    }

    .buffer {
      display: block;
      width: 100%;
      height: 2rem;
      z-index: 500;
      top: -2rem;
      background: linear-gradient(
        ${({ theme }) =>
          theme[theme.topic](theme.variant).color.substring(0, 7)}00,
        ${({ theme }) =>
          theme[theme.topic](theme.variant).color.substring(0, 7)}aa,
        ${({ theme }) =>
          theme[theme.topic](theme.variant).color.substring(0, 7)}
      );
      transition: background-color ${() => timing.colorSwap};
    }
  `
}
