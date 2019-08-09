import React from 'react'
import { Page, Title } from 'atoms'
import labs from './labs/**.jsx'
import { Link } from 'react-router-dom'

const Lab = () => (
  <Page>
    <Title>Labs</Title>
    {Object.keys(labs).map(lab => (
      <Link key={lab} to={lab.toLowerCase()}>
        {lab}
      </Link>
    ))}
  </Page>
)

export default Lab
