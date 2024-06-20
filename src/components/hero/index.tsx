import React from 'react'
import style from './style.module.css'
import { Button, Container } from '@mui/material'

export function Hero() {
  return (
    <div className={style.hero}>
      <div className={style.hero__bg}></div>
      <Container style={{ zIndex: '2' }} maxWidth={'lg'}>
        <div className={style.hero__content}>
          <div className={style.hero__left}>
            <h1 className={style.hero__txt}>Underdog Show Sell Stickets</h1>
            <p className={style.hero__desc}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, impedit.
            </p>
            <Button size='large' variant='outlined' color='secondary'>
              Buy Now
            </Button>
          </div>
          <div className='hero__img'>
            <img src='' alt='' />
          </div>
        </div>
      </Container>
    </div>
  )
}
