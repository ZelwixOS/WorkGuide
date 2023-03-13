import { Container } from 'react-bootstrap'
import { makeStyles } from '../../theme'

const useStyles = makeStyles()((theme) => ({
  container: {
    borderRadius: '0.375rem',
    border: '1px solid #5227CC'
  },
  title: {
    borderBottom: '1px solid #5227CC',
    textAlign: 'left',
    paddingTop: '5px',
    paddingBottom: '5px',
  },
  noData: {
    paddingTop: '50px',
    paddingBottom: '50px',
    borderBottom: '1px solid #5227CC',
    color: '#BABABA'
  },
  linkContainer: {
    textAlign: 'right',
    marginBottom: '5px',
  },
  link: {
    color:'#5227CC',
    textDecoration: 'none',
    transition: 'color 0.5s',
    '&:hover': {
      color: '#000'
    },
    textAlign: 'right'
  },
}))

const AchievmentsList = () => {
  const { classes, cx } = useStyles()

  return (
    <Container className={classes.container}>
      <h3 className={classes.title}>Достижения по обучению</h3>
      <h6 className={classes.noData}>Достижения в разработке ⚒️</h6>
      <div className={classes.linkContainer}><a className={classes.link} href='/achievments'>Все достижения</a></div>
    </Container>
  )
}

export default AchievmentsList;
