import { Container } from '@mui/material'
import React, { useState, useEffect } from 'react'
import style from './style.module.css'
import classNames from 'classnames'
import { COUNT_DOWN } from '@/constants/varible'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function Timeline() {
  const targetDate = new Date(COUNT_DOWN)

  const formatDate = (date: Date): string => {
    const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, '0')}-${date.getFullYear().toString().padStart(2, '0')}`
    return formattedDate
  }

  const formatTime = (date: Date): string => {
    const formattedTime = `${date.getHours().toString().padStart(2, '0')}:${date
      .getMinutes()
      .toString()
      .padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`
    return formattedTime
  }

  const calculateTimeLeft = (): TimeLeft => {
    const now = new Date()
    const difference = targetDate.getTime() - now.getTime()

    let timeLeft: TimeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    }

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
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
    <section id="timeline" className={classNames('none', style.timeline)}>
      <Container>
        <h2 className={style.timeline__title}>Time Line</h2>
        <p
          className={style.timeline__desc}
        >{`Starts on ${formatDate(targetDate)} at ${formatTime(targetDate)}`}</p>
        <div className={style.timeline__list}>
          <div className={style.timeline__item}>
            <p className={classNames(style.timeline__time)}>
              {timeLeft.days.toString().padStart(2, '0')}
            </p>
            <p className={classNames(style.timeline__time__text)}>Ngày</p>
          </div>
          <div className={style.timeline__item}>
            <p className={classNames(style.timeline__time)}>
              {timeLeft.hours.toString().padStart(2, '0')}
            </p>
            <p className={classNames(style.timeline__time__text)}>Giờ</p>
          </div>
          <div className={style.timeline__item}>
            <p className={classNames(style.timeline__time)}>
              {timeLeft.minutes.toString().padStart(2, '0')}
            </p>
            <p className={classNames(style.timeline__time__text)}>Phút</p>
          </div>
          <div className={style.timeline__item}>
            <p className={classNames(style.timeline__time)}>
              {timeLeft.seconds.toString().padStart(2, '0')}
            </p>
            <p className={classNames(style.timeline__time__text)}>Giây</p>
          </div>
        </div>
      </Container>
    </section>
  )
}
