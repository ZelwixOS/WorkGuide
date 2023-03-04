import Theory from "../../Types/Theory";
import parse from 'html-react-parser';

interface ITheoryPage {
  theory: Theory;
}

const TheoryPage = (props: ITheoryPage) => {
  return <div>{parse(props.theory.content)}</div>;
}

export default TheoryPage;