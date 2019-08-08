import React from "react";
import styled from "styled-components";

// export default class Header extends React.Component {
//   constructor(props) {
//     super(props)
//     console.log(props)
//   }

//   render() {
//     return <h1>test</h1>
//   }
// }

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const Header = props => <Title>{props.children}</Title>;
export default Header;
