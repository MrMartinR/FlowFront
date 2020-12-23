/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,no-undef */
import React, {useState} from "react";
import SVG from "react-inlinesvg";
import {Tab, Nav} from "react-bootstrap";
import {toAbsoluteUrl} from "../../../../_helpers";

export function QuickPanel() {
  const [selectedTab, setSelectedTab] = useState("AuditLogs");

  const setTab = _tabName => {
    setSelectedTab(_tabName);
  };

  return (
      <div id="kt_quick_panel" className="offcanvas offcanvas-right pt-5 pb-10">
        <Tab.Container
            defaultActiveKey={selectedTab}
        >
          {/*begin::Header*/}
          <div
              className="offcanvas-header offcanvas-header-navs d-flex align-items-center justify-content-between mb-5">
            <Nav
                onSelect={setTab}
                as="ul"
                role="tablist"
                className="nav nav-bold nav-tabs nav-tabs-line nav-tabs-line-3x nav-tabs-primary flex-grow-1 px-10"
            >
              <Nav.Item as="li">
                <Nav.Link
                    eventKey="AuditLogs"
                    className={`nav-link ${
                        selectedTab === "AuditLogs" ? "active" : ""
                    }`}
                >
                  Audit Logs
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="nav-item" as="li">
                <Nav.Link
                    eventKey="Notifications"
                    className={`nav-link ${
                        selectedTab === "Notifications" ? "active" : ""
                    }`}
                >
                  Notifications
                </Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Nav.Link
                    eventKey="Settings"
                    className={`nav-link ${
                        selectedTab === "Settings" ? "active" : ""
                    }`}
                >
                  Settings
                </Nav.Link>
              </Nav.Item>
            </Nav>

            <div className="offcanvas-close mt-n1 pr-5" style={{position: "absolute", top: "15px", right: "10px"}}>
              <a
                  href="#"
                  className="btn btn-xs btn-icon btn-light btn-hover-primary"
                  id="kt_quick_panel_close"
              >
                <i className="ki ki-close icon-xs text-muted"></i>
              </a>
            </div>
          </div>
          {/*end::Header*/}

          {/*begin::Content*/}
          [Martin] Deleted Content
          {/*end::Content*/}
        </Tab.Container>
      </div>
  );
}
