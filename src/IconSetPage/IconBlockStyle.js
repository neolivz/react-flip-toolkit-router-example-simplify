import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const StyledLink = styled(Link)`
    color: black;
    width: 100%;
    display: block;
    height: ${props => (props.isFocused ? '80%' : '100%')};
    &:hover {
        text-decoration: underline;
    }
`

export const IconGridItem = styled.li`
    grid-column: ${props => (props.isFocused ? 'span 3' : '')};
    grid-row: ${props => (props.isFocused ? 'span 3' : '')};
    padding: ${props => (props.isFocused ? '2rem' : '0')};
    padding-top: 0;
    svg {
        will-change: transform;
    }
`

export const AnimatedIconTitle = styled.h3`
    margin-top: 0;
    margin-bottom: 2rem;
    animation-delay: 0.25s;
    font-size: 1.15rem;
    font-weight: normal;
`
