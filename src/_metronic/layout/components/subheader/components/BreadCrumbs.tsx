/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react"
import { Link } from "react-router-dom"
// [REV] adding type any to items
function BreadCrumbs({ items }: any) {
  if (!items || !items.length) {
    return ""
  }

  return (
    <ul className="breadcrumb breadcrumb-transparent breadcrumb-dot font-weight-bold p-0 my-2">
      <li className="breadcrumb-item">
        <Link to="/dashboard">
          <i className="flaticon2-shelter text-muted icon-1x" />
        </Link>
      </li>
      {items.map((item: { pathname: any; title: React.ReactNode }) => (
        <li key={`bc${item.pathname}`} className="breadcrumb-item">
          <Link className="text-muted" to={{ pathname: item.pathname }}>
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default BreadCrumbs
