import React, { useRef } from 'react'

import { Flipped } from 'react-flip-toolkit'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import iconDict from '../IconComponents'

import IconBlock from './IconBlock'
import {
    Background,
    IconSetGrid,
    InverseContainer,
    SetContents,
    SetDescription,
    StyledLink,
} from './IconSetPageStyle'

function IconSetPage({ match: { params: { set, focusedIcon } = {} } }) {
    const elementRef = useRef(null)
    return (
        <Flipped flipId={set} componentId="setPage">
            <Background ref={elementRef}>
                <Flipped inverseFlipId={set}>
                    <InverseContainer>
                        <SetContents>
                            <SetDescription>
                                <div>
                                    <StyledLink to="/">
                                        <FontAwesomeIcon icon={faArrowLeft} />{' '}
                                        Back
                                    </StyledLink>
                                </div>
                                <h1>
                                    {set[0].toUpperCase() + set.slice(1)}
                                    &nbsp; Icons
                                </h1>
                                <p>click icon for detail view</p>
                            </SetDescription>
                            <IconSetGrid>
                                {iconDict[set].map(({ name, Icon, id }) => {
                                    return (
                                        <IconBlock
                                            key={id}
                                            Icon={Icon}
                                            isFocused={name === focusedIcon}
                                            id={id}
                                            name={name}
                                            set={set}
                                        />
                                    )
                                })}
                            </IconSetGrid>
                        </SetContents>
                    </InverseContainer>
                </Flipped>
            </Background>
        </Flipped>
    )
}

export default IconSetPage
