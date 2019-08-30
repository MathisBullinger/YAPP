import React from 'react'
import { Icon } from '~/components/atoms'
import { Link } from 'react-router-dom'

interface Props {
  align: 'left' | 'right'
}

const Settings: React.FunctionComponent<Props> = ({ align }) => (
  <Link to="/settings" className={`action ${align}`}>
    <Icon icon="settings" />
  </Link>
)
export default Settings
