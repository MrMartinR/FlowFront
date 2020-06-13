import React, { useEffect } from "react";
import { Pagination } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

const CustomPagination = ({ pages, page }) => {
  console.log('page', page)
  console.log('pages', pages)

  const handlePage = () => {
    
  }

  let items = pages
  return (
    <Pagination className="d-flex justify-content-center">
      <Pagination.First onClick={() => console.log("asdeas")} />
      <Pagination.Prev />
      <Pagination.Item>{1}</Pagination.Item>
      <Pagination.Ellipsis />

      <Pagination.Item>{10}</Pagination.Item>
      <Pagination.Item>{11}</Pagination.Item>
      <Pagination.Item active>{page}</Pagination.Item>
      <Pagination.Item>{13}</Pagination.Item>
      <Pagination.Item disabled>{14}</Pagination.Item>

      <Pagination.Ellipsis />
      <Pagination.Item>{pages}</Pagination.Item>
      <Pagination.Next />
      <Pagination.Last />
    </Pagination>);
}

export default CustomPagination;