import styled from "styled-components";

import { BaseGridList } from "../BaseComponents";
import { CardGrid } from "./Components";
// using CSS inheritance here to allow the use of PureComponents
// for better performance
export const IndexGrid = styled(BaseGridList)`
  width: 100%;
  grid-auto-rows: 3rem;
  ${CardGrid} & {
    grid-template-columns: repeat(3, 5rem);
    grid-gap: 2rem;
    margin-bottom: 2rem;
  }
`;

export const IndexListItem = styled.li`
  display: flex;
  justify-content: center;
`;

export const Card = styled.li`
  height: 100%;
  transition: box-shadow 0.5s;
  background-color: white;
  overflow: hidden;
  position: relative;
  will-change: transform;
  svg {
    will-change: transform;
  }
`;

export const CardContent = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;
  will-change: transform;
  ${CardGrid} & {
    flex-direction: column;
    padding: 1.5rem;
  }
`;

export const Description = styled.div`
  min-width: 280px;
  text-align: right;
  text-decoration: none !important;
  color: black;

  > *:last-child {
    margin-bottom: 0 !important;
  }
`;

export const ListFlex = styled.div`
  ${CardGrid + '[display="grid"]'} & {
    display: block;
  }
  ${CardGrid + '[display="list"]'} & {
    display: flex;
    > div:first-of-type {
      margin-right: 1rem;
    }
  }

  justify-content: flex-end;
  > * {
    margin-bottom: 0.5rem;
  }
`;

export const CardHeader = styled.h2`
  display: inline-block;
  margin-top: 0;
  margin-bottom: 0.5rem;
`;

export const IconCount = styled.span`
  display: inline-block;
  font-weight: bold;
`;

export const Price = styled.span`
  display: inline-block;
`;
