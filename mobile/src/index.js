import React from 'react'

import createRouter from './routes'

export default function Index() {
  const Routes = createRouter(false)

  return <Routes />
}
