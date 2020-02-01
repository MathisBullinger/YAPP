import React from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from '~/utils/hooks'
import { Icon, Button } from '~/components/atoms'
import action from '~/store/actions'

interface Props {
  id: Podcast['id']
  compact?: boolean
  expanded?: boolean
  icon?: boolean
}

function Subscribe({
  id,
  compact = false,
  expanded = false,
  icon = false,
}: Props) {
  const dispatch = useDispatch()
  const subscribed = useSelector(state => state.subscriptions.includes(id))

  function toggleSubscribe() {
    if (id) dispatch(action(subscribed ? 'UNSUBSCRIBE' : 'SUBSCRIBE', id))
  }

  return (
    <S.Subscribe
      data-compact={icon || (compact && subscribed)}
      data-icon={icon}
      {...((icon || (compact && !expanded && subscribed)) && {
        onClick: toggleSubscribe,
      })}
    >
      {icon || (compact && !expanded && subscribed) ? (
        <Icon icon={!icon || subscribed ? 'check' : 'add'} />
      ) : (
        <Button
          {...{
            [subscribed ? 'text' : 'outlined']: true,
          }}
          rounded={!compact}
          onClick={toggleSubscribe}
        >
          {subscribed ? 'subscribed' : 'subscribe'}
        </Button>
      )}
    </S.Subscribe>
  )
}

const S = {
  Subscribe: styled.div`
    cursor: pointer;

    ${Icon.sc} {
      width: 1.3rem;
      height: 1.3rem;

      path {
        fill: ${({ theme }) => theme[theme.topic](theme.variant).on('high')};
      }
    }

    &[data-compact='true'] {
      ${Button.sc} {
        padding-left: 0;
        text-overflow: initial;
      }
    }

    &[data-icon='true'] {
      width: 2rem;
      height: 2rem;
      border-radius: 1rem;
      background-color: ${({ theme }) =>
        theme[theme.topic](theme.variant).on('high')};
      position: relative;

      svg {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translateX(-50%) translateY(-50%);

        path {
          fill: ${({ theme }) => theme[theme.topic](theme.variant).color};
        }
      }
    }
  `,
}
export default Object.assign(Subscribe, { sc: S.Subscribe })
