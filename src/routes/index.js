import React from 'react'
import {Route,IndexRoute} from 'react-router'
import Template from '../containers/Template'
import DatedHome from '../components/DatedHome'
const createRoutes = () => {
  return(
    <Route
      path = '/'
      component = {Template}
    >
    <IndexRoute
      component = {DatedHome}
    >
    </IndexRoute>
    </Route>
  )
}

const Routes = createRoutes()
export default Routes
