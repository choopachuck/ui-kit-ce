/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from 'react'
import { Bar, BarMenuItem, Link } from '@v-uik/base'
import {
  BrowserRouter as Router,
  Link as RouterLink,
  Route,
  Switch,
} from 'react-router-dom'

export const LinkWithComponent = (): JSX.Element => {
  return (
    <Router>
      <Bar>
        <Link as={RouterLink} to="/">
          <BarMenuItem>Cмартап</BarMenuItem>
        </Link>
        <Link as={RouterLink} to="/subscription">
          <BarMenuItem>Подписка</BarMenuItem>
        </Link>
      </Bar>
      <div>
        <Switch>
          <Route exact path="/" component={SmartApp} />
          <Route exact path="/subscription" component={Subscription} />
        </Switch>
      </div>
    </Router>
  )
}
