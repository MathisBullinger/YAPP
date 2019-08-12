import React from 'react'
import styled from 'styled-components'
import { Title } from 'atoms'
import labs from './labs/**.*sx'
import { Link } from 'react-router-dom'

const Lab = () => (
  <LabPage>
    <Title>Labs</Title>
    {Object.values(labs)
      .map(m => Object.values(m)[0].default.name)
      .map(lab => (
        <Link key={lab} to={'lab/' + lab.toLowerCase()}>
          {lab}
        </Link>
      ))}
  </LabPage>
)

export default Lab

const LabPage = styled.div`
  a {
    display: block;
    margin-bottom: 1rem;
  }
`
