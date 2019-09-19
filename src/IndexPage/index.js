import React, { useCallback, useMemo } from 'react'
import { Route, withRouter } from 'react-router-dom'

import { CardGrid } from './Components'
import Card from './Card'

import { Contents } from '../BaseComponents'
import icons from '../IconComponents'

const IndexPage = ({ history, location }) => {
    const navigate = useCallback(
        set =>
            history.push({
                pathname: `/${set.replace(/\s/g, '-')}`,
            }),
        [history],
    )

    const focusedSet = location.pathname.split(/\//g)[1]

    const visibleIconSets = useMemo(() => Object.keys(icons))
    console.log({ focusedSet })

    return (
        <div>
            <Contents>
                <CardGrid>
                    {focusedSet === '' &&
                        visibleIconSets.map(set => {
                            return (
                                <Card
                                    key={set}
                                    setKey={set}
                                    icons={icons[set]}
                                    iconCount={icons[set].length}
                                    navigate={navigate}
                                />
                            )
                        })}
                </CardGrid>
            </Contents>
        </div>
    )
}

export default withRouter(IndexPage)
