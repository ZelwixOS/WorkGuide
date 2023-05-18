import { makeStyles } from '../../theme'
import Achievement from '../../Types/Achievement'
import { Grid, Typography } from '@mui/material'

const useStyles = makeStyles()((theme) => ({
  title: {
    textAlign: 'left',
    backgroundColor: '#DCDCDC',
    borderRadius: '5px',
    padding: '5px',
  },
  body: {
    borderBottom: '1px solid #5227CC',
    marginBottom: '3px',
    ':hover': {
      borderRadius: '5px',
      border: '1px solid #5227CC',
      backgroundColor: '#EEE',
    },
  },
  image: {
    borderRadius: '25px',
    maxWidth: '50px',
    maxHeight: '50px',
    margin: '5px',
  },
  filter: {
    filter: ' blur(3px) grayscale(1)',
  },
  description: {
    color: '#68717A',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '16px',
    margin: '5px',
  },
  date: {
    justifyContent: 'flex-end',
    color: '#68717A',
    fontWeight: '300',
    fontSize: '12px',
    textAlign: 'end',
  },
}))

interface IAchievementTemplate {
  achievement: Achievement
  showCourse?: boolean
}

const AchievementTemplate = (props: IAchievementTemplate) => {
  const { classes, cx } = useStyles()
  const iconFolder = '/achIcons/'

  const convertDate = (date: string) => {
    const dt = new Date(date)
    var options = { year: 'numeric', month: 'long', day: 'numeric' }
    return dt.toLocaleDateString('ru-RU', options as Intl.DateTimeFormatOptions)
  }

  return (
    <div className={classes.body}>
      <h5 className={classes.title}>
        {props.achievement.name}{' '}
        {props.showCourse && props.achievement.courseName?.length > 0 && (
          <a href={`/courses/${props.achievement.courseUrl}`}>
            ({props.achievement.courseName})
          </a>
        )}
      </h5>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
      >
        <Grid item>
          <img
            className={`${classes.image} ${
              !props.achievement.isCompleted && classes.filter
            }`}
            src={`${iconFolder}${props.achievement.iconUrl}`}
          />
        </Grid>
        <Grid item className={classes.description}>
          {props.achievement.description}
        </Grid>
      </Grid>
      {props.achievement.isCompleted && (
        <Typography className={classes.date}>
          Получено: {convertDate(props.achievement.recievingDate)}
        </Typography>
      )}
    </div>
  )
}

export default AchievementTemplate
