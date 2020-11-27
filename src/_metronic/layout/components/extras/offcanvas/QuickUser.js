/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,no-undef */
import React, { useState } from "react";
import SVG from "react-inlinesvg";
import { useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { getUserProfile } from "../../../../../app/actions/userActions";
import BadgeAvatars from "../../../../../app/utils/BadgeAvatar";
import { checkIsActive, toAbsoluteUrl } from "../../../../_helpers";
const location = window.location;

const getMenuItemActive = (url) => {
  return checkIsActive(location, url)
    ? " menu-item-active menu-item-open "
    : "";
};

export function QuickUser() {
  const history = useHistory();

  const logoutClick = () => {
    const toggle = document.getElementById("kt_quick_user_toggle");
    if (toggle) {
      toggle.click();
    }
    history.push("/logout");
  };
  const auth = useSelector((state) => state.auth);
  const [userProfile, setUserProfile] = useState({
    avatar_url: toAbsoluteUrl("/media/logos/flow-logo.svg"),
  });

  React.useEffect(() => {
    // Update the document title using the browser API
    getUserProfile(auth)
      .then((res) => {
        setUserProfile(res.data.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div
      id="kt_quick_user"
      className="offcanvas offcanvas-right offcanvas p-10"
    >
      <div className="offcanvas-header d-flex align-items-center justify-content-between pb-5">
        <h3 className="font-weight-bold m-0">User Profile</h3>
        <a
          className="btn btn-xs btn-icon btn-light btn-hover-primary"
          id="kt_quick_user_close"
        >
          <i className="ki ki-close icon-xs text-muted" />
        </a>
      </div>

      <div className="offcanvas-content pr-5 mr-n5">
        <div className="d-flex align-items-center mt-5">
          <div className="symbol symbol-100 mr-5">
            <BadgeAvatars src={userProfile.avatar_url} readOnly={true} />
            {/* <div
              className="symbol-label"
              style={{ backgroundImage: userProfile.avatar_url }}
            />
            <i className="symbol-badge bg-success" /> */}
          </div>
          <div className="d-flex flex-column">
            <a className="font-weight-bold font-size-h5 text-dark-75 text-hover-primary">
              {userProfile.name} {userProfile.surname}
            </a>
            <div className="navi mt-2">
              <a href="#" className="navi-item">
                {userProfile.email && (
                  <span className="navi-link p-0 pb-2">
                    <span className="navi-icon mr-1">
                      <span className="svg-icon-lg svg-icon-primary">
                        <SVG
                          src={toAbsoluteUrl(
                            "/media/svg/icons/Communication/Mail-notification.svg"
                          )}
                        ></SVG>
                      </span>
                    </span>
                    <span className="navi-text text-muted text-hover-primary">
                      {userProfile.email}
                    </span>
                  </span>
                )}
              </a>
            </div>
            {/* <Link to="/logout" className="btn btn-light-primary btn-bold">
                Sign Out
              </Link> */}
            <button
              className="btn btn-light-primary btn-bold"
              onClick={logoutClick}
            >
              Log out
            </button>
          </div>
        </div>

        <div className="separator separator-dashed mt-8 mb-2" />

        <div className="navi navi-spacer-x-0 p-0">
          <NavLink
            className={`menu-item navi-item ${getMenuItemActive("/settings")}`}
            to="/settings"
          >
            <div className="navi-link">
              <div className="symbol symbol-40 bg-light mr-3">
                <div className="symbol-label">
                  <span className="svg-icon svg-icon-md svg-icon-success">
                    <SVG
                      src={toAbsoluteUrl("/media/svg/icons/Tools/Tools.svg")}
                    ></SVG>
                  </span>
                </div>
              </div>

              <div className="navi-text">
                <div className="font-weight-bold">Settings</div>
                <div className="text-muted">Account settings and more</div>
              </div>
            </div>
          </NavLink>
          <div className="separator separator-dashed my-2"></div>
        </div>
      </div>
    </div>
  );
}
