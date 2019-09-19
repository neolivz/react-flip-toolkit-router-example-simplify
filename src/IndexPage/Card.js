import React, { useCallback, useRef } from 'react'
import PropTypes from 'prop-types'
import { Flipped } from 'react-flip-toolkit'
import anime from 'animejs'

import iconBaseStyles from '../iconBaseStyles'
import {
    Card,
    CardContent,
    CardHeader,
    Description,
    IconCount,
    IndexGrid,
    IndexListItem,
    ListFlex,
    Price,
} from './CardStyle'

const IconSetCard = ({
    navigate: parentNavigate,
    setKey,
    icons,
    iconCount,
}) => {
    const fadeIns = useRef([])

    const onStart = useCallback(
        (el, { previous: prevLocation, current: currentLocation }) => {
            if (
                prevLocation.location.pathname.match(setKey) &&
                currentLocation.location.pathname === '/'
            ) {
                fadeIns.current.forEach(el => (el.style.opacity = '0'))
                el.style.zIndex = '5'
            }
        },
        [setKey],
    )

    const onComplete = useCallback(
        (el, { previous: prevLocation, current: currentLocation }) => {
            if (
                currentLocation.location.pathname === '/' &&
                prevLocation.location.pathname.match(setKey)
            ) {
                anime({
                    targets: fadeIns.current,
                    opacity: [0, 1],
                    translateY: [15, 0],
                    delay: (el, i) => i * 70 + 300,
                    easing: 'easeOutSine',
                    duration: 350,
                })
                el.style.zIndex = ''
            }
        },
        [setKey],
    )

    const onDelayedAppear = useCallback(
        (el, index) =>
            anime({
                targets: el,
                opacity: [0, 1],
                scale: [0.9, 1],
                easing: 'easeOutSine',
                delay: index * 40,
                duration: 400,
            }),
        [],
    )

    const onExit = useCallback(
        (el, index, removeElement) =>
            anime({
                targets: el,
                opacity: 0,
                scale: 0.9,
                easing: 'easeOutSine',
                duration: 400,
                delay: index * 40,
                complete: removeElement,
            }),
        [],
    )

    const navigate = useCallback(() => parentNavigate(setKey), [
        parentNavigate,
        setKey,
    ])

    return (
        <Flipped
            flipId={setKey}
            stagger
            onStartImmediate={onStart}
            onComplete={onComplete}
            onDelayedAppear={onDelayedAppear}
            onExit={onExit}
        >
            <Card onClick={navigate}>
                <Flipped inverseFlipId={setKey}>
                    <CardContent>
                        <IndexGrid>
                            {icons
                                .filter(obj => obj.highlighted)
                                .map(({ Icon, id }) => {
                                    return (
                                        <IndexListItem key={id}>
                                            <Flipped flipId={id}>
                                                <Icon style={iconBaseStyles} />
                                            </Flipped>
                                        </IndexListItem>
                                    )
                                })}
                        </IndexGrid>
                        <Description>
                            <Flipped flipId={`${setKey}-title`} translate>
                                <CardHeader
                                    ref={el => fadeIns.current.push(el)}
                                >
                                    {setKey[0].toUpperCase() + setKey.slice(1)}{' '}
                                    Icons
                                </CardHeader>
                            </Flipped>
                            <ListFlex>
                                <div>
                                    <Flipped
                                        flipId={`${setKey}-count`}
                                        translate
                                    >
                                        <IconCount
                                            ref={el => fadeIns.current.push(el)}
                                        >
                                            {iconCount} icons
                                        </IconCount>
                                    </Flipped>
                                </div>
                                <div>
                                    <Flipped
                                        flipId={`${setKey}-price`}
                                        translate
                                    >
                                        <Price
                                            ref={el => fadeIns.current.push(el)}
                                        >
                                            ${iconCount / 2}
                                        </Price>
                                    </Flipped>
                                </div>
                            </ListFlex>
                        </Description>
                    </CardContent>
                </Flipped>
            </Card>
        </Flipped>
    )
}

IconSetCard.propTypes = {
    setKey: PropTypes.string,
    highlightedIcons: PropTypes.array,
    iconCount: PropTypes.number,
}

export default IconSetCard
