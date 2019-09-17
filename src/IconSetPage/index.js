import React, { useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Flipped } from "react-flip-toolkit";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import anime from "animejs";
import iconDict from "../IconComponents";
import { Contents } from "../BaseComponents";
import IconBlock from "./IconBlock";

const IconSetGrid = styled.ul`
  display: grid;
  margin: 0;
  padding: 0;
  list-style: none;
  grid-template-columns: repeat(auto-fill, 7.5rem);
  grid-auto-rows: 4.5rem;
  grid-gap: 2rem;
  grid-auto-flow: dense;
`;

const InverseContainer = styled.div``;

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  min-height: 100vh;
  background-color: white;
  z-index: 2;
`;

const SetContents = styled(Contents)`
  margin-top: 6rem;
  min-height: 80vh;
`;

const SetDescription = styled.div`
  h2 {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
  margin-bottom: 3rem;
`;

const StyledLink = styled(Link)`
  color: black;
  &:hover {
    text-decoration: underline;
  }
`;

const onExit = (el, fadeIns) => {
  return anime({
    targets: [...fadeIns, ...el.querySelectorAll("[data-icon-nonsample]")],
    opacity: 0,
    easing: "easeOutSine",
    duration: 350,
    delay: anime.stagger(20)
  }).finished;
};

function IconSetPage({ match: { params: { set, focusedIcon } = {} } }) {
  const elementRef = useRef(null);
  const fadeInRef = useRef([]);
  return (
    <Flipped flipId={set} componentId="setPage">
      <Background ref={elementRef}>
        <Flipped inverseFlipId={set}>
          <InverseContainer>
            <SetContents>
              <SetDescription>
                <div ref={el => fadeInRef.current.push(eval)}>
                  <StyledLink
                    to={{
                      pathname: "/",
                      state: {
                        animate: () =>
                          onExit(elementRef.current, fadeInRef.current)
                      }
                    }}
                  >
                    <FontAwesomeIcon icon={faArrowLeft} /> Back
                  </StyledLink>
                </div>
                <h1 ref={el => fadeInRef.current.push(eval)}>
                  {set[0].toUpperCase() + set.slice(1)}
                  &nbsp; Icons
                </h1>
                <p ref={el => fadeInRef.current.push(eval)}>
                  click icon for detail view
                </p>
              </SetDescription>
              <IconSetGrid>
                {iconDict[set].map(({ name, Icon, id }) => {
                  return (
                    <IconBlock
                      Icon={Icon}
                      isFocused={name === focusedIcon}
                      id={id}
                      name={name}
                      set={set}
                    />
                  );
                })}
              </IconSetGrid>
            </SetContents>
          </InverseContainer>
        </Flipped>
      </Background>
    </Flipped>
  );
}

export default IconSetPage;
