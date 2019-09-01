import React, { Component } from "react"
import { Route, withRouter } from "react-router-dom"
import qs from "qs"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faList,
  faTh,
  faFilter,
  faDollarSign,
  faSortAmountDown,
  faSortAmountUp
} from "@fortawesome/free-solid-svg-icons"
import {
  CardGrid,
  Controls,
  Toggle,
  NoResults
} from "./Components"

import Card from "./Card"
import IconSetPage from "../IconSetPage"
import { Contents } from "../BaseComponents"
import icons from "../IconComponents"

const defaultState = {
  filter: "",
  display: "grid",
  sort: "ascending"
}

const sortByIconCount = (iconKeys, sort) => {
  if (sort === "ascending") {
    return [...iconKeys].sort((a, b) => {
      if (icons[a].length < icons[b].length) return -1
      else if (icons[b].length < icons[a].length) return 1
      else return 0
    })
  } else {
    return [...iconKeys].sort((a, b) => {
      if (icons[a].length > icons[b].length) return -1
      else if (icons[b].length > icons[a].length) return 1
      else return 0
    })
  }
}

class IndexPage extends Component {
  static propTypes = {}

  updateQueryParam = obj => {
    this.props.history.push({
      search: `?${qs.stringify({
        ...qs.parse(this.props.location.search.replace("?", "")),
        ...obj
      })}`
    })
  }

  navigate = set => {
    this.props.history.push({
      pathname: `/${set.replace(/\s/g, "-")}`,
      search: this.props.location.search
    })
  }

  render() {
    const focusedSet = this.props.location.pathname.split(/\//g)[1]

    const queryParamState = {
      ...defaultState,
      ...qs.parse(this.props.location.search.replace("?", ""))
    }

    const visibleIconSets = sortByIconCount(
      Object.keys(icons),
      queryParamState.sort
    ).filter(set =>
      queryParamState.filter
        ? set.match(new RegExp("^" + queryParamState.filter))
        : true
    )
    return (
      <div>
        <Contents>
          <CardGrid
                display={queryParamState.display}
              >
                {visibleIconSets.map(set => {
                  if (set === focusedSet) return <li key={set} />
                  return (
                    <Card
                      key={set}
                      setKey={set}
                      icons={icons[set]}
                      iconCount={icons[set].length}
                      navigate={this.navigate}
                    />
                  )
                })}
              </CardGrid>
        </Contents>
        <Route path="/:set/:focusedIcon?" component={IconSetPage} />
      </div>
    )
  }
}

export default withRouter(IndexPage)
