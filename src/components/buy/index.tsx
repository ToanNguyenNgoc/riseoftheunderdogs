import React from 'react'
import style from "./style.module.css"
import { Container } from '@mui/material'
import { Title } from '@/components/title'

export function Buy() {
  return (
    <section className='left'>
      <Container>
        <Title
          title='Buy Tikets'
          position='center'
          description='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi, minima.'
        />
        
      </Container>
    </section>
  )
}
