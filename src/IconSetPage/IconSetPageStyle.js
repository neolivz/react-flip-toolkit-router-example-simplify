import { Link } from "react-router-dom";
import styled from "styled-components";

import { Contents } from "../BaseComponents";
export const IconSetGrid = styled.ul`
  display: grid;
  margin: 0;
  padding: 0;
  list-style: none;
  grid-template-columns: repeat(auto-fill, 7.5rem);
  grid-auto-rows: 4.5rem;
  grid-gap: 2rem;
  grid-auto-flow: dense;
`;

export const InverseContainer = styled.div``;

export const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  min-height: 100vh;
  background-color: white;
  z-index: 2;
`;

export const SetContents = styled(Contents)`
  margin-top: 6rem;
  min-height: 80vh;
`;

export const SetDescription = styled.div`
  h2 {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
  margin-bottom: 3rem;
`;

export const StyledLink = styled(Link)`
  color: black;
  &:hover {
    text-decoration: underline;
  }
`;
