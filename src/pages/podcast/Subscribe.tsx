import React from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from '~/utils/hooks'
import { Icon, Button } from '~/components/atoms'
import action from '~/store/actions'

interface Props {
  id: Podcast['id']
  compact?: boolean
  expanded?: boolean
}

export default function Subscribe({
  id,
  compact = false,
  expanded = false,
}: Props) {
  const dispatch = useDispatch()
  const subscribed = useSelector(state => state.subscriptions.includes(id))

  function toggleSubscribe() {
    if (id) dispatch(action(subscribed ? 'UNSUBSCRIBE' : 'SUBSCRIBE', id))
  }

  return (
    <S.Subscribe
      data-compact={compact && subscribed}
      {...(compact && !expanded && subscribed && { onClick: toggleSubscribe })}
    >
      {compact && !expanded && subscribed ? (
        <Icon icon="check" />
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
  `,
}
