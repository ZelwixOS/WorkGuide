import { Accordion, Button, Col, Container, Row } from 'react-bootstrap'
import { makeStyles } from '../../theme'
import { useEffect, useState } from 'react'
import { getRecruitResult } from '../../Request/GetRequests'
import Loading from '../Common/Loading'
import RecruitResult from '../../Types/RecruitResult'
import React from 'react'
import NavigationBar from '../Common/NavigationBar'
import RecruitResults from './RecruitResults'

const useStyles = makeStyles()((theme) => ({
  backButtons: {
    marginTop: 'auto',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  linkButton: {
    width: '100%',
    marginTop: '2rem',
    color: 'purple',
    border: 'none',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: 'purple',
      color: 'white',
    },
  },
}))

const RecruitsPage = () => {
  const { classes, cx } = useStyles()

  const [recruitStats, setRecruitsStats] = useState<RecruitResult[]>([])
  const [isLoading, setLoading] = useState<boolean>(true)

  let isMounted = true

  const getData = async (isMounted: boolean) => {
    setLoading(true)
    const res = await getRecruitResult()

    if (isMounted) {
      setRecruitsStats(res)
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
    <React.Fragment>
      <NavigationBar />
      <Container className={classes.container}>
        {isLoading || !recruitStats ? (
          <Loading />
        ) : (
          <Accordion>
            {recruitStats.map((rs, k) => (
              <RecruitResults key={k} eventKey={k} res={rs} />
            ))}
          </Accordion>
        )}
        <Row className={classes.backButtons}>
          <Col>
            <Button
              className={classes.linkButton}
              variant="outline-primary"
              href="/"
            >
              На главную
            </Button>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  )
}

export default RecruitsPage
