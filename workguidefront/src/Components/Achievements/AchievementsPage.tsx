import { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { makeStyles } from '../../theme'
import Achievement from '../../Types/Achievement'
import NavigationBar from '../Common/NavigationBar'
import { getUserAchievements, getUserMainAchievements } from '../../Request/GetRequests'
import AchievementTemplate from './AchievementTemplate'

const useStyles = makeStyles()((theme) => ({
  header: {
    padding: '5px',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
}))

const AchievementsPage = () => {
  const { classes, cx } = useStyles()
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [isLoading, setLoading] = useState<boolean>(true)
  const params = useParams()
  let isMounted = true

  const getAchievements = async (isMounted: boolean) => {
    const id = params?.id
    let res = []
    if (id) {
      res = await getUserAchievements(params?.id, 0)
    } else {
      res = await getUserMainAchievements(0)
    }

    if (isMounted) {
      setAchievements(res)
      setLoading(false)
    }
  }

  useEffect(() => {
    getAchievements(isMounted)

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <>
      <NavigationBar />
      <Container className={classes.container}>
        <h3 className={classes.header}>Достижения</h3>
        {isLoading || !achievements
          ? null
          : achievements.map((a) => (
              <AchievementTemplate showCourse={!params?.id} key={a.id} achievement={a} />
            ))}
      </Container>
    </>
  )
}

export default AchievementsPage
