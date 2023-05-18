import { Accordion, Container, Table } from 'react-bootstrap'
import { makeStyles } from '../../theme'
import UserInfo from '../../Types/UserInfo'
import { useEffect, useState } from 'react'
import { getRecruits } from '../../Request/GetRequests'
import UserSearchCard from '../User/UserSearchCard'
import Loading from '../Common/Loading'
import RecruitResult from '../../Types/RecruitResult'
import { Grid } from '@mui/material'

const useStyles = makeStyles()((theme) => ({
  container: {
    borderRadius: '0.375rem',
    border: '1px solid #5227CC',
  },
  img: {
    maxWidth: 150,
    maxHeight: 150,
    aspectRatio: '1 / 1',
    borderRadius: '30px',
    border: '2px solid #5227CC',
  },
  course: {
    borderBottom: '1px solid #5227CC',
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

interface IRecruitResults {
  res: RecruitResult
  eventKey: number
}

const RecruitResults = (props: IRecruitResults) => {
  const { classes, cx } = useStyles()

  return (
    <Accordion.Item eventKey={props.eventKey.toString()}>
      <Accordion.Header>
        <Grid container direction="row" alignItems="center">
          <Grid item xs={2}>
            <img
              src={`avatars/${props.res.userInfo.avatar}`}
              className={classes.img}
            />
          </Grid>
          <Grid item xs={10}>
            <h3>{`${props.res.userInfo.firstName} ${props.res.userInfo.secondName} (${props.res.userInfo.userName})`}</h3>
          </Grid>
        </Grid>
      </Accordion.Header>
      <Accordion.Body>
        {props.res.recruitCourse.length > 0 ? (
          props.res.recruitCourse.map((cr, k) => (
            <Grid
              className={classes.course}
              key={k}
              container
              justifyItems="flex-start"
              alignItems="center"
            >
              <h5>
                <a
                  href={`courses/${cr.course.url}`}
                >{`${cr.course.name} (${cr.completeLesson}/${cr.total}):`}</a>
              </h5>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    {cr.resultLesson.map((rl, k) => (
                      <th key={k}>{rl.lesson.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {cr.resultLesson.map((rl, k) => (
                      <th key={k}>{`${rl.score.rightAnswer}/${rl.score.testsCount}`}</th>
                    ))}
                  </tr>
                  <tr>
                    {cr.resultLesson.map((rl, k) => (
                      <th key={k}>{`${Math.round(100 * rl.score.rightAnswer / rl.score.testsCount)}%`}</th>
                    ))}
                  </tr>
                </tbody>
              </Table>
            </Grid>
          ))
        ) : (
          <h5>Нет информации о пройденных тестах</h5>
        )}
      </Accordion.Body>
    </Accordion.Item>
  )
}

export default RecruitResults
