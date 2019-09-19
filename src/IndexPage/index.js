import React, { useCallback, useMemo } from 'react'
import { withRouter } from 'react-router-dom'

import { CardGrid } from './Components'
import Card from './Card'

import { Contents } from '../BaseComponents'
import icons from '../IconComponents'

const IndexPage = ({ history }) => {
    const navigate = useCallback(
        set => {
            console.log({ set, url: set.replace(/\s/g, '-') })
            history.push({
                pathname: `/${set.replace(/\s/g, '-')}`,
            })
        },
        [history],
    )

    const visibleIconSets = useMemo(() => Object.keys(icons))

    return (
        <div>
            <Contents>
                <CardGrid>
                    {visibleIconSets.map(set => {
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
