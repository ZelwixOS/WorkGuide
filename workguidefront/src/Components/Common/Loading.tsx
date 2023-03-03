import { Spinner } from "react-bootstrap";

const Loading = () =>
  <div className='w-100 d-flex justify-content-center pt-1'>
    <Spinner animation="grow" variant="primary" />
    <Spinner className="mx-2" animation="grow" variant="primary" />
    <Spinner animation="grow" variant="primary" />
  </div>

export default Loading;