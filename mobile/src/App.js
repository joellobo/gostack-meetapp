import React from 'react'
import { useSelector } from 'react-redux'

import createRoutes from './routes'

export default function App() {
  const { auth, toast } = useSelector(state => state)

  const Routes = createRoutes(auth.signed, toast)

  return <Routes />
}
