/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl, checkIsActive } from "../../../../_helpers";

export function AsideMenuList({ layoutProps }) {
  const location = useLocation();
  const getMenuItemActive = (url) => {
    return checkIsActive(location, url)
      ? " menu-item-active menu-item-open "
      : "";
  };

  return (
    <>
      {/* begin::Menu Nav */}
      <ul className={`menu-nav ${layoutProps.ulClasses}`}>
        {/*begin::1 Level*/}
        <li
          className={`menu-item ${getMenuItemActive("/dashboard")}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/dashboard">
            <span className="svg-icon menu-icon">
              <SVG
                src={toAbsoluteUrl("/media/svg/icons/Layout/Layout-grid.svg")}
              />
            </span>
            <span className="menu-text">Dashboard</span>
          </NavLink>
        </li>

        {/* <li className={`menu-item ${getMenuItemActive("/setting")}`} aria-haspopup="true">
            <NavLink className="menu-link" to="/setting">
              <span className="svg-icon menu-icon"><SVG src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")}/></span>
              <span className="menu-text">Setting</span>
            </NavLink>
          </li> */}

        <li
          className={`menu-item d-none ${getMenuItemActive("/accounts")}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/accounts">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")} />
            </span>
            <span className="menu-text">Accounts</span>
          </NavLink>
        </li>

        <li
          className={`menu-item ${getMenuItemActive("/user_accounts")}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/user_accounts">
            <span className="svg-icon menu-icon">
              <SVG
                src={toAbsoluteUrl(
                  "/media/svg/icons/Communication/Adress-book2.svg"
                )}
              />
            </span>
            <span className="menu-text">Accounts</span>
          </NavLink>
        </li>

        <li
          className={`menu-item ${getMenuItemActive("/currencies")}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/currencies">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Shopping/Pound.svg")} />
            </span>
            <span className="menu-text">Currencies</span>
          </NavLink>
        </li>

        <li
          className={`menu-item ${getMenuItemActive("/countries")}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/countries">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Map/Marker1.svg")} />
            </span>
            <span className="menu-text">Countries</span>
          </NavLink>
        </li>

        <li
          className={`menu-item d-none ${getMenuItemActive("/lending")}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/lending">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")} />
            </span>
            <span className="menu-text">Lending</span>
          </NavLink>
        </li>

        <li
          className={`menu-item d-none ${getMenuItemActive("/property")}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/property">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")} />
            </span>
            <span className="menu-text">Property</span>
          </NavLink>
        </li>

        <li
          className={`menu-item d-none ${getMenuItemActive("/platforms")}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/platforms">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")} />
            </span>
            <span className="menu-text">Platforms</span>
          </NavLink>
        </li>

        <li
          className={`menu-item d-none ${getMenuItemActive("/originators")}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/originators">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")} />
            </span>
            <span className="menu-text">Originators</span>
          </NavLink>
        </li>

        {/*end::1 Level*/}

      </ul>

      {/* end::Menu Nav */}
    </>
  );
}
