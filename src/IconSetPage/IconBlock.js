import React, { useState, useCallback } from 'react'
import { Flipped } from 'react-flip-toolkit'
import anime from 'animejs'
import iconBaseStyles from '../iconBaseStyles'
import { AnimatedIconTitle, IconGridItem, StyledLink } from './IconBlockStyle'

const IconBlock = ({ Icon, isFocused, id, name, set }) => {
    const onAppear = useCallback((el, i) => {
        anime({
            targets: el,
            delay: 250 + i * 30,
            opacity: [0, 1],
            scale: [0.25, 1],
            duration: 250,
            easing: 'easeOutSine',
        })
    }, [])

    return (
        <IconGridItem key={id} isFocused={isFocused}>
            {isFocused && (
                <Flipped flipId={`${set}-detail-title`}>
                    <AnimatedIconTitle>
                        <b>Icon:</b>
                        &nbsp;
                        {name}
                    </AnimatedIconTitle>
                </Flipped>
            )}
            <StyledLink to={`/${set}/${isFocused ? '' : name}`}>
                <Flipped flipId={id} onAppear={onAppear}>
                    <Icon style={{ ...iconBaseStyles }} />
                </Flipped>
            </StyledLink>
        </IconGridItem>
    )
}

export default IconBlock
