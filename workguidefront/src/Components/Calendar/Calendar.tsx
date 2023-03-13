import { Container } from 'react-bootstrap'
import { makeStyles } from '../../theme'

const useStyles = makeStyles()((theme) => ({
  container: {
    borderRadius: '0.375rem',
    border: '1px solid #5227CC',
    height: '100%'
  },
  noData: {
    paddingTop: '92px',
    paddingBottom: '92px',
    color: '#BABABA'
  },
}))

const Calendar = () => {
  const { classes, cx } = useStyles()

  return (
    <Container className={classes.container}>
      <h6 className={classes.noData}>Календарь в разработке ⚒️</h6>
    </Container>
  )
}

export default Calendar;
