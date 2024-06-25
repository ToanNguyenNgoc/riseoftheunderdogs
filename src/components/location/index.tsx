import { Container } from '@mui/material'
import React, { useEffect, useState } from 'react'
import style from './style.module.css'
import { Title } from '@/components/title'
import dynamic from 'next/dynamic'
import { keyApi } from '@/constants/varible'

// const AnyReactComponent: any = ({ text }: { text: string }) => (
//   <div style={{ color: 'red', fontWeight: 'bold' }}>{text}</div>
// )

// Dynamically import the GoogleMapReact component with no SSR
const GoogleMapReact = dynamic(() => import('google-map-react'), { ssr: false })

export function Location() {
  const defaultProps = {
    center: {
      lat: 40.785091,
      lng: -73.968285
    },
    zoom: 11
  }

  return (
    <section className='right'>
      <Container>
        <Title
          title='Location'
          position='center'
          description='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi, minima.'
        />
        <div className={style.location__map}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: keyApi }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
          >
            {/* <AnyReactComponent lat={40.785091} lng={-73.968285} text='Central Park' /> */}
          </GoogleMapReact>
        </div>
      </Container>
    </section>
  )
}
