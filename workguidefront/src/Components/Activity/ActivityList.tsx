import { useEffect, useState } from 'react'
import { Card, Container } from 'react-bootstrap'
import { makeStyles } from '../../theme'
import Activity from '../../Types/Activity'
import Loading from '../Common/Loading'
import ActivityCard from './ActivityCard'
import { getActivities } from '../../Request/GetRequests'

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
  },
  noActivities: {
    height: '350px',
    border: '1px solid #5227CC',
  },
  noActivitiesText: {
    color: '#BABABA',
    fontWeight: 'bolder'
  }
}))

const ActivityList = () => {
  const { classes, cx } = useStyles()

  const [activities, setActivities] = useState<Activity[]>([])
  const [isLoading, setLoading] = useState<boolean>(true)

  let isMounted = true

  const getActivitysForPage = async (isMounted: boolean) => {
    setLoading(true)
    const cardCount = 3;
    const res: Activity[] = await getActivities(cardCount);
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
        activities.length > 0 ?
        activities.map((activity, index) =>
          <ActivityCard
            key={activity.id}
            activity={activity}
            first={index === 0}
            last={index === activities.length - 1}
          />) : 
          <Card className={`${classes.noActivities} d-flex align-items-center justify-content-center`}>
            <h6 className={classes.noActivitiesText}>Активностей нет 😴</h6>
          </Card>
      }
    </Container>
  )
}

export default ActivityList;
