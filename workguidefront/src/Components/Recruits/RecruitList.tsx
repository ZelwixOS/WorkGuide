import { Container } from 'react-bootstrap'
import { makeStyles } from '../../theme'
import UserInfo from '../../Types/UserInfo'
import { useEffect, useState } from 'react'
import { getRecruits } from '../../Request/GetRequests'
import UserSearchCard from '../User/UserSearchCard'
import Loading from '../Common/Loading'
import { Grid } from '@mui/material'

const useStyles = makeStyles()((theme) => ({
  container: {
    borderRadius: '0.375rem',
    border: '1px solid #5227CC',
    padding: '3px'
  },
  title: {
    borderBottom: '1px solid #5227CC',
    textAlign: 'left',
    paddingTop: '5px',
    paddingBottom: '5px',
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

const RecruitList = () => {
  const { classes, cx } = useStyles()

  const [recruits, setRecruits] = useState<UserInfo[]>([])
  const [isLoading, setLoading] = useState<boolean>(true)

  let isMounted = true

  const getData = async (isMounted: boolean) => {
    setLoading(true)
    const res = await getRecruits()

    if (isMounted) {
      setRecruits(res)
      setLoading(false)
    }
  }

  useEffect(() => {
    getData(isMounted)

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <>
      {recruits && recruits.length > 0 && (
        <Container className={classes.container}>
          <h3 className={classes.title}>Рекруты</h3>
          <Grid container justifyContent="center">
          {isLoading ? (
            <Loading />
          ) : (
            recruits.map((r) => <UserSearchCard key={r.id} user={r} />)
          )}
          </Grid>
          <div className={classes.linkContainer}>
            <a className={classes.link} href="/recruits">
              Подробнее...
            </a>
          </div>
        </Container>
      )}
    </>
  )
}

export default RecruitList
