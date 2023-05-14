import { Container } from 'react-bootstrap'
import { makeStyles } from '../../theme'
import { useEffect, useState } from 'react'
import {
  getUserAchievements,
  getUserMainAchievements,
} from '../../Request/GetRequests'
import Achievement from '../../Types/Achievement'
import AchievementTemplate from './AchievementTemplate'

const useStyles = makeStyles()((theme) => ({
  container: {
    borderRadius: '0.375rem',
    border: '1px solid #5227CC',
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
    color: '#BABABA',
  },
  linkContainer: {
    textAlign: 'right',
    marginBottom: '5px',
  },
  link: {
    color: '#5227CC',
    textDecoration: 'none',
    transition: 'color 0.5s',
    '&:hover': {
      color: '#000',
    },
    textAlign: 'right',
  },
}))

interface IAchievementsList {
  courseId?: string
  elementCount?: number
  className?: string
}

const AchievementsList = (props: IAchievementsList) => {
  const { classes, cx } = useStyles()

  const getData = async (isMounted: boolean) => {
    let res = []
    if (props.courseId) {
      res = await getUserAchievements(props.courseId, props.elementCount ?? 3)
    } else {
      res = await getUserMainAchievements(props.elementCount ?? 3)
    }
    if (isMounted) {
      setAchievements(res)
    }
  }

  useEffect(() => {
    refreshData()
  }, [])

  const refreshData = () => {
    let isMounted = true
    getData(isMounted)

    return () => {
      isMounted = false
    }
  }

  const [achievements, setAchievements] = useState<Achievement[]>([])

  return (
    <Container className={`${classes.container} ${props.className}`}>
      <h3 className={classes.title}>Достижения</h3>
      {achievements.length > 0 ? (
        achievements.map((a) => <AchievementTemplate key={a.id} showCourse={!props?.courseId} achievement={a} />)
      ) : (
        <h6 className={classes.noData}>Достижений пока нет 😴</h6>
      )}
      <div className={classes.linkContainer}>
        <a className={classes.link} href={props.courseId ? `/achievements/${props.courseId}` : "/achievements"}>
          Все достижения
        </a>
      </div>
    </Container>
  )
}

export default AchievementsList
