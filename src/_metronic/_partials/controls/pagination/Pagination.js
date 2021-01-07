import React from "react"
import PaginationLinks from "./PaginationLinks"
import PaginationToolbar from "./PaginationToolbar"

function Pagination(props) {
  const { children, isLoading, paginationProps } = props
  return (
    <>
      {children}
      <div className="d-flex justify-content-between align-items-center flex-wrap">
        <PaginationLinks paginationProps={paginationProps} />
        <PaginationToolbar
          isLoading={isLoading}
          paginationProps={paginationProps}
        />
      </div>
    </>
  )
}

export default Pagination
