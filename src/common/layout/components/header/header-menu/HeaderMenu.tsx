/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from 'react'
import { useLocation } from 'react-router'
import { NavLink } from 'react-router-dom'
// import SVG from "react-inlinesvg";
import { checkIsActive } from '../../../../../_metronic/_helpers'
// import { toAbsoluteUrl } from "../../../../_helpers";

// [REV] added types any to layoutProps and url
export function HeaderMenu({ layoutProps }: any) {
  const location = useLocation()
  const getMenuItemActive = (url: any) => (checkIsActive(location, url) ? 'menu-item-active' : '')

  return (
    <div
      id="kt_header_menu"
      className={`header-menu header-menu-mobile ${layoutProps.ktMenuClasses}`}
      {...layoutProps.headerMenuAttributes}
    >
      {/* begin::Header Nav */}
      <ul className={`menu-nav ${layoutProps.ulClasses}`}>
        {/* begin::1 Level */}

        {/* dashboard */}
        <li
          className={`menu-item menu-item-rel ${getMenuItemActive(
            '/dashboard',
          )}`}
        >
          <NavLink className="menu-link" to="/dashboard">
            <span className="menu-text">Dashboard</span>
            {layoutProps.rootArrowEnabled && <i className="menu-arrow" />}
          </NavLink>
        </li>

        {/* contacts */}
        <li
          className={`menu-item menu-item-rel ${getMenuItemActive(
            '/contacts',
          )}`}
        >
          <NavLink className="menu-link" to="/contacts">
            <span className="menu-text">Contacts</span>
            {layoutProps.rootArrowEnabled && <i className="menu-arrow" />}
          </NavLink>
        </li>

        {/* user accounts */}
        <li
          className={`menu-item menu-item-rel ${getMenuItemActive(
            '/user_accounts',
          )}`}
        >
          <NavLink className="menu-link" to="/user_accounts">
            <span className="menu-text">Accounts</span>
            {layoutProps.rootArrowEnabled && <i className="menu-arrow" />}
          </NavLink>
        </li>

        {/* lending */}
        <li
          className={`menu-item menu-item-rel ${getMenuItemActive('/lending')}`}
        >
          <NavLink className="menu-link" to="/lending">
            <span className="menu-text">Lending</span>
            {layoutProps.rootArrowEnabled && <i className="menu-arrow" />}
          </NavLink>
        </li>
        {/* end::1 Level */}
      </ul>
      {/* end::Header Nav */}
    </div>
  )
}

export default HeaderMenu
