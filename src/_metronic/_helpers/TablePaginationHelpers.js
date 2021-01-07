/* Pagination Helprs */
import React from "react"

export const getPagesCount = (totalSize, sizePerPage) =>
  Math.ceil(totalSize / sizePerPage)

export const getPages = (page, pagesCount, paginationSize) => {
  const result = []
  if (!page) {
    return result
  }

  if (pagesCount === 1) {
    result.push(1)
    return result
  }

  if (pagesCount < page) {
    return result
  }

  if (pagesCount < paginationSize + 1) {
    for (let i = 1; i < pagesCount + 1; i += 1) {
      result.push(i)
    }
    return result
  }

  if (page === 1) {
    for (let i = 1; i < paginationSize + 1; i += 1) {
      if (i < pagesCount) {
        result.push(i)
      }
    }
    return result
  }

  if (page === pagesCount) {
    for (let i = pagesCount - paginationSize + 1; i <= pagesCount; i += 1) {
      if (i <= pagesCount) {
        result.push(i)
      }
    }
    return result
  }

  const shiftCount = Math.floor(paginationSize / 2)
  if (shiftCount < 1) {
    result.push(page)
    return result
  }

  //
  if (page < shiftCount + 2) {
    for (let i = 1; i < paginationSize + 1; i += 1) {
      result.push(i)
    }
    return result
  }

  if (pagesCount - page < shiftCount + 2) {
    for (let i = pagesCount - paginationSize; i < pagesCount + 1; i += 1) {
      result.push(i)
    }
    return result
  }

  for (let i = page - shiftCount; i < page; i += 1) {
    if (i > 0) {
      result.push(i)
    }
  }
  result.push(page)
  for (let i = page + 1; i < page + shiftCount + 1; i += 1) {
    if (i <= pagesCount) {
      result.push(i)
    }
  }

  return result
}

export function getHandlerTableChange(setQueryParams) {
  return (type, { page, sizePerPage, sortField, sortOrder }) => {
    const pageNumber = page || 1
    setQueryParams((prev) => {
      switch (type) {
        case "sort":
          return { ...prev, sortOrder, sortField }
        case "pagination":
          return { ...prev, pageNumber, pageSize: sizePerPage }
        default:
          return prev
      }
    })
  }
}

export function PleaseWaitMessage({ entities }) {
  return <>{entities === null && <div>Please wait...</div>}</>
}

export function NoRecordsFoundMessage({ entities }) {
  const customersList = entities === null ? [] : entities
  return (
    <>
      {customersList.length === 0 && entities !== null && (
        <div>No records found</div>
      )}
    </>
  )
}
