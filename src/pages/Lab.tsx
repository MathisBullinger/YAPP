import React from 'react'
import styled from 'styled-components'
import { Title } from '~/components/atoms'
import { Link } from 'react-router-dom'

const Lab = () => (
  <LabPage>
    <Title>Labs</Title>
    <Link to={'lab/shadow'}>Shadow</Link>
  </LabPage>
)

export default Lab

const LabPage = styled.div`
  a {
    display: block;
    margin-bottom: 1rem;
  }
`
