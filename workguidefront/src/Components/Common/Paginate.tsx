import ReactPaginate from "react-paginate";

interface IPaginate {
  initialPage: number;
  maxPage: number;
  loading: boolean;
  onPageChange: (e: number) => void;
}

const Paginate = (props: IPaginate) => {
  return (props.loading || props.maxPage <= 1 ? null :<ReactPaginate
    initialPage={props.initialPage - 1}
    nextLabel=">"
    onPageChange={(e) => (e.selected === props.initialPage - 1 ? null : props.onPageChange(e.selected + 1))}
    pageRangeDisplayed={3}
    marginPagesDisplayed={1}
    pageCount={props.maxPage}
    previousLabel="<"
    pageClassName="page-item"
    pageLinkClassName="page-link"
    previousClassName="page-item"
    previousLinkClassName="page-link"
    nextClassName="page-item"
    nextLinkClassName="page-link"
    breakLabel="..."
    breakClassName="page-item"
    breakLinkClassName="page-link"
    containerClassName="pagination d-flex justify-content-center"
    activeClassName="active"
    renderOnZeroPageCount={() => null}
  />);
}


export default Paginate;