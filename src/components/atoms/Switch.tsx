import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import { shadow } from '~/styles'

interface Props {
  value?: 'on' | 'off'
  onInput?(v: boolean): void
}

const Switch: FunctionComponent<Props> = ({
  value = 'off',
  onInput,
}: Props) => (
  <SwitchStyled
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
)
export default Switch

const activeColor = [56, 131, 131]
const SwitchStyled = styled.div`
  display: inline-block;
  width: 2rem;
  height: 0.8rem;
  border-radius: 0.4rem;
  background-color: gray;
  cursor: pointer;

  &:after {
    content: '';
    display: block;
    margin: 0;
    margin-top: -0.1rem;
    width: 1rem;
    height: 1rem;
    border-radius: 0.5rem;
    background-color: white;
    box-shadow: ${shadow(1)};
    transition: transform 0.15s ease;
  }

  &[data-value='on'] {
    background-color: rgba(${activeColor.join()}, 50%);

    &:after {
      transform: translateX(100%);
      background-color: rgb(${activeColor.join()});
    }
  }
`
