import { Container } from '@mui/material'
import React, { useState, useEffect } from 'react'
import style from './style.module.css'
import classNames from 'classnames'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function Timeline() {
  const calculateTimeLeft = (): TimeLeft => {
    const targetDate = new Date('2024-10-17T23:59:59')
    const now = new Date()
    const difference = targetDate.getTime() - now.getTime()

    let timeLeft: TimeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    }

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      }
    }

    return timeLeft
  }

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft())

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearTimeout(timer)
  }, [timeLeft])

  return (
    <section className={classNames('center', style.timeline)}>
      <Container>
        <h2 className={style.timeline__title}>Time Line</h2>
        <p className={style.timeline__desc}>Starts on 10/17/24 at 11:59:59PM</p>
        <div className={style.timeline__list}>
          <div className={style.timeline__item}>
            <p className={classNames(style.timeline__time)}>{timeLeft.days}</p>
            <p className={classNames(style.timeline__time__text)}>Ngày</p>
          </div>
          <div className={style.timeline__item}>
            <p className={classNames(style.timeline__time)}>{timeLeft.hours}</p>
            <p className={classNames(style.timeline__time__text)}>Giờ</p>
          </div>
          <div className={style.timeline__item}>
            <p className={classNames(style.timeline__time)}>{timeLeft.minutes}</p>
            <p className={classNames(style.timeline__time__text)}>Phút</p>
          </div>
          <div className={style.timeline__item}>
            <p className={classNames(style.timeline__time)}>{timeLeft.seconds}</p>
            <p className={classNames(style.timeline__time__text)}>Giây</p>
          </div>
        </div>
      </Container>
    </section>
  )
}
