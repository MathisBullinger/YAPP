import React from 'react'
import { Icon } from '~/components/atoms'
import { Link } from 'react-router-dom'

const Settings: React.FunctionComponent = () => (
  <Link to="/settings" className="action">
    <Icon icon="settings" />
  </Link>
)
export default Settings
