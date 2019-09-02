import React from "react"
import { Router } from "react-router"
import { Route } from "react-router-dom"
import { createBrowserHistory } from "history"
import IndexPage from "./IndexPage"
import { Flipper } from "react-flip-toolkit"

const history = createBrowserHistory()

const cachedPush = history.push

// override history.push method to allow to exit animations and delayed FLIP
history.push = args => {
  if (typeof args === "string") {
    return cachedPush(args)
  }
  if (args && args.state && args.state.animate) {
    args.state.animate().then(() => {
      delete args.state.animate
      cachedPush(args)
    })
  } else {
    cachedPush(args)
  }
}

const RoutFlipper = ({
  location,
  search
}) => (
  <Flipper
    flipKey={`${location.pathname}-${location.search}`}
    decisionData={{
      location,
      search
    }}
  >
    <IndexPage />
  </Flipper>
)


const App = () => (
  <Router history={history}>
    <Route render={RoutFlipper} />
  </Router>
)

export default App
