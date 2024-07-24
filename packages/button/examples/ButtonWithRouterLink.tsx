/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import React from 'react'
import { Bar, PolymorphicButton } from '@v-uik/base'
import {
  BrowserRouter as Router,
  Link as RouterLink,
  Route,
  Switch,
} from 'react-router-dom'
import { Home } from './Home'
import { Blog } from './Blog'

export const ButtonWithRouterLink = (): JSX.Element => {
  return (
    <Router>
      <Bar>
        <PolymorphicButton as={RouterLink} to="/">
          Home
        </PolymorphicButton>
        <PolymorphicButton as={RouterLink} to="/blog">
          Blog
        </PolymorphicButton>
      </Bar>
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/blog" component={Blog} />
        </Switch>
      </div>
    </Router>
  )
}
