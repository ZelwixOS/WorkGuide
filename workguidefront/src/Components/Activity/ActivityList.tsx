import { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { makeStyles } from '../../theme'
import Activity from '../../Types/Activity'
import Loading from '../Common/Loading'
import ActivityCard from './ActivityCard'

const useStyles = makeStyles()((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
  },
  moreActivitys: {
    textAlign: 'right'
  },
  link: {
    color: '#5227CC',
    textDecoration: 'none',
    transition: 'color 0.5s',
    '&:hover': {
      color: '#000'
    }
  }
}))

const ActivityList = () => {
  const { classes, cx } = useStyles()

  const [activities, setActivities] = useState<Activity[]>([])
  const [isLoading, setLoading] = useState<boolean>(true)

  let isMounted = true

  const getActivitysForPage = async (isMounted: boolean) => {
    setLoading(true)
    const res: Activity[] = [
      { id: '123', title: 'Разработка', content: 'Активность в разработке ⚒️', date: '1 день назад', action: 'Продолжено' } as Activity,
      { id: '1233', title: 'Разработка', content: 'Активность в разработке ⚒️', date: '2 дня назад', action: 'Продолжено' } as Activity,
      { id: '12333', title: 'Разработка', content: 'Активность в разработке ⚒️', date: '3 дня назад', action: 'Продолжено' } as Activity,
    ];
    setActivities(res)
    setLoading(false)

    if (isMounted) {
      setActivities(res)
      setLoading(false)
    }
  }

  useEffect(() => {
    getActivitysForPage(isMounted)

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <Container className={classes.container + ' mt-3'}>
      <h5>Активность</h5>
      {isLoading ? (
        <Loading />
      ) :
        activities.map((activity, index) =>
          <ActivityCard
            key={activity.id}
            activity={activity}
            first={activities.length > 1 && index === 0}
            last={activities.length > 1 && index === activities.length - 1}
          />)
      }
    </Container>
  )
}

export default ActivityList;
