import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Flipped } from "react-flip-toolkit";
import anime from "animejs";

import iconBaseStyles from "../iconBaseStyles";
import {
  Card,
  CardContent,
  CardHeader,
  Description,
  IconCount,
  IndexGrid,
  IndexListItem,
  ListFlex,
  Price
} from "./CardStyle";

class IconSetCard extends PureComponent {
  static propTypes = {
    setKey: PropTypes.string,
    highlightedIcons: PropTypes.array,
    iconCount: PropTypes.number
  };

  onStart = (el, { previous: prevLocation, current: currentLocation }) => {
    if (
      prevLocation.location.pathname.match(this.props.setKey) &&
      currentLocation.location.pathname === "/"
    ) {
      [...el.querySelectorAll("[data-fade-in]")].forEach(
        el => (el.style.opacity = "0")
      );
      el.style.zIndex = "5";
    }
  };

  onComplete = (el, { previous: prevLocation, current: currentLocation }) => {
    if (
      currentLocation.location.pathname === "/" &&
      prevLocation.location.pathname.match(this.props.setKey)
    ) {
      anime({
        targets: el.querySelectorAll("[data-fade-in]"),
        opacity: [0, 1],
        translateY: [15, 0],
        delay: (el, i) => i * 70 + 300,
        easing: "easeOutSine",
        duration: 350
      });
      el.style.zIndex = "";
    }
  };

  onDelayedAppear = (el, index) => {
    anime({
      targets: el,
      opacity: [0, 1],
      scale: [0.9, 1],
      easing: "easeOutSine",
      delay: index * 40,
      duration: 400
    });
  };

  onExit = (el, index, removeElement) => {
    anime({
      targets: el,
      opacity: 0,
      scale: 0.9,
      easing: "easeOutSine",
      duration: 400,
      delay: index * 40,
      complete: removeElement
    });
  };

  navigate = () => {
    this.props.navigate(this.props.setKey);
  };

  render() {
    const { setKey, icons, iconCount } = this.props;
    return (
      <Flipped
        flipId={setKey}
        stagger
        onStartImmediate={this.onStart}
        onComplete={this.onComplete}
        onDelayedAppear={this.onDelayedAppear}
        onExit={this.onExit}
      >
        <Card onClick={this.navigate}>
          <Flipped inverseFlipId={setKey}>
            <CardContent>
              <IndexGrid>
                {icons
                  .filter(obj => obj.highlighted)
                  .map(({ Icon, id }) => {
                    return (
                      <IndexListItem key={id}>
                        <Flipped flipId={id} shouldFlip={this.shouldFlip}>
                          <Icon style={iconBaseStyles} />
                        </Flipped>
                      </IndexListItem>
                    );
                  })}
              </IndexGrid>
              <Description ref={el => (this.description = el)}>
                <Flipped
                  flipId={`${setKey}-title`}
                  translate
                  shouldFlip={this.shouldFlip}
                >
                  <CardHeader data-fade-in>
                    {setKey[0].toUpperCase() + setKey.slice(1)} Icons
                  </CardHeader>
                </Flipped>
                <ListFlex>
                  <div>
                    <Flipped
                      flipId={`${setKey}-count`}
                      translate
                      shouldFlip={this.shouldFlip}
                    >
                      <IconCount data-fade-in>{iconCount} icons</IconCount>
                    </Flipped>
                  </div>
                  <div>
                    <Flipped
                      flipId={`${setKey}-price`}
                      translate
                      shouldFlip={this.shouldFlip}
                    >
                      <Price data-fade-in>${iconCount / 2}</Price>
                    </Flipped>
                  </div>
                </ListFlex>
              </Description>
            </CardContent>
          </Flipped>
        </Card>
      </Flipped>
    );
  }
}

export default IconSetCard;
