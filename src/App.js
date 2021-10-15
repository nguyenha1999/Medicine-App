import React, { lazy } from "react"
import Suspense from "./routes/Routers"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

const Recipe = lazy(() => import("./pages/recipe"))
const Chemistry = lazy(() => import("./pages/chemistry"))
const Bill = lazy(() => import("./pages/bill"))

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/recipe/:productId/create-recipe">
          <Suspense component={<Recipe />} />
        </Route>
        <Route path="/recipe/:productId/:id">
          <Suspense component={<Recipe />} />
        </Route>
        <Route exact path="/">
          <Suspense component={<Chemistry />} />
        </Route>
        <Route path="/bill">
          <Suspense component={<Bill />} />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
