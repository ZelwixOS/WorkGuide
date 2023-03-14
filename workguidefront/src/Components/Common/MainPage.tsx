import { makeStyles } from "../../theme";
import NavigationBar from "./NavigationBar";

const useStyles = makeStyles()((theme) => ({
  backButtons: {
    marginTop: 'auto'
  },
}))

const MainPage = () => {
  const { classes, cx } = useStyles();

  return (
    <NavigationBar />
  );
}

export default MainPage;