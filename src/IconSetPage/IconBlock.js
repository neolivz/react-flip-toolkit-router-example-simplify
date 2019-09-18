import React, { PureComponent } from "react";
import { Flipped } from "react-flip-toolkit";
import anime from "animejs";
import iconBaseStyles from "../iconBaseStyles";
import { AnimatedIconTitle, IconGridItem, StyledLink } from "./IconBlockStyle";

class IconBlock extends PureComponent {
  state = { sampleIcon: true };
  onAppear = (el, i) => {
    anime({
      targets: el,
      delay: 250 + i * 30,
      opacity: [0, 1],
      scale: [0.25, 1],
      duration: 250,
      easing: "easeOutSine"
    });
    this.setState({ sampleIcon: false });
  };

  render() {
    const { Icon, isFocused, id, name, set } = this.props;
    const extraProps = {};
    return (
      <IconGridItem key={id} isFocused={isFocused} {...extraProps}>
        {isFocused && (
          <Flipped flipId={`${set}-detail-title`}>
            <AnimatedIconTitle>
              <b>Icon:</b>
              &nbsp;
              {name}
            </AnimatedIconTitle>
          </Flipped>
        )}
        <StyledLink to={`/${set}/${isFocused ? "" : name}`}>
          <Flipped flipId={id} onAppear={this.onAppear}>
            <Icon style={{ ...iconBaseStyles }} />
          </Flipped>
        </StyledLink>
      </IconGridItem>
    );
  }
}

export default IconBlock;
