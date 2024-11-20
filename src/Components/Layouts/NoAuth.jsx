import React from 'react'
import { Outlet } from 'react-router-dom'

function NoAuth() {
  return (
    <div>
        <Outlet/>
    </div>
  )
}

export default NoAuth