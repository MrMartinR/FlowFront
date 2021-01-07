/* Pagination Helprs */
import React from "react"
import SVG from "react-inlinesvg"
import { toAbsoluteUrl } from "./AssetsHelpers"

export const sortCaret = (order) => {
  if (!order)
    return (
      <span className="svg-icon svg-icon-sm svg-icon-primary ml-1 svg-icon-sort">
        <SVG src={toAbsoluteUrl("/media/svg/icons/Shopping/Sort1.svg")} />
      </span>
    )
  if (order === "asc")
    return (
      <span className="svg-icon svg-icon-sm svg-icon-primary ml-1">
        <SVG src={toAbsoluteUrl("/media/svg/icons/Navigation/Up-2.svg")} />
      </span>
    )
  if (order === "desc")
    return (
      <span className="svg-icon svg-icon-sm svg-icon-primary ml-1">
        <SVG src={toAbsoluteUrl("/media/svg/icons/Navigation/Down-2.svg")} />
      </span>
    )
  return null
}

export const headerSortingClasses = (column, sortOrder) =>
  sortOrder === "asc" || sortOrder === "desc" ? "sortable-active" : ""
