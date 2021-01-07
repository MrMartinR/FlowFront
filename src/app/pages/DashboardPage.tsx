import React from 'react'

// [Martin] I imported the NavLink Class to show the menu in the dashboard
import { NavLink } from 'react-router-dom'

function DashboardPage() {
  return (
    <>
      <h1>Dashboard</h1>
      <li>
        <NavLink className="menu-link" to="/accounts">
          <span className="menu-text">Accounts(Admin)</span>
        </NavLink>
      </li>
      <li>
        <NavLink className="menu-link" to="/countries">
          <span className="menu-text">Countries(Admin)</span>
        </NavLink>
      </li>
      <li>
        <NavLink className="menu-link" to="/currencies">
          <span className="menu-text">Currencies(Admin)</span>
        </NavLink>
      </li>
      <li>
        <NavLink className="menu-link" to="/contacts">
          <span className="menu-text">Contacts</span>
        </NavLink>
      </li>
      <li>
        <NavLink className="menu-link" to="/user_accounts">
          <span className="menu-text">Accounts</span>
        </NavLink>
      </li>
      <li>
        <NavLink className="menu-link" to="/lending">
          <span className="menu-text">Lending</span>
        </NavLink>
      </li>
      <li>
        <NavLink className="menu-link" to="/platforms">
          <span className="menu-text">Platforms</span>
        </NavLink>
      </li>
      <li>
        <NavLink className="menu-link" to="/originators">
          <span className="menu-text">Originators</span>
        </NavLink>
      </li>
      <li>
        <NavLink className="menu-link" to="/property">
          <span className="menu-text">Property</span>
        </NavLink>
      </li>

      <li>
        <NavLink className="menu-link" to="/settings">
          <span className="menu-text">Settings</span>
        </NavLink>
      </li>
    </>
  )
}

export default DashboardPage
