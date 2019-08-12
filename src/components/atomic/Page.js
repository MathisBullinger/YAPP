import styled from 'styled-components'

export default styled.div`
  padding: 4rem;
  padding-top: 2rem;
  min-height: calc(100vh - 4rem);
  margin-bottom: 4rem;
  box-sizing: border-box;

  @media ${({ responsive }) => responsive.navOnSide} {
    margin-left: ${({ layout }) => layout.desktop.navWidth};
  }
`
