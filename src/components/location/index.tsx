import { Container } from '@mui/material'
import React, { useEffect, useState } from 'react'
import style from './style.module.css'
import { Title } from '@/components/title'
import dynamic from 'next/dynamic'
import { keyMap } from '@/constants/varible'

// Dynamically import the GoogleMapReact component with no SSR
const GoogleMapReact = dynamic(() => import('google-map-react'), { ssr: false })

interface MarkerProps {
  lat: number
  lng: number
  text: string
}

const Marker: React.FC<MarkerProps> = ({ text }) => (
  <div style={{ position: 'relative', color: 'red', fontWeight: 'bold' }}>
    <img
      src='https://maps.google.com/mapfiles/ms/icons/red-dot.png'
      alt={text}
      style={{ position: 'absolute', transform: 'translate(-50%, -50%)' }}
    />
    <div
      style={{
        position: 'absolute',
        top: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100px',
        textAlign: 'center',
        color: 'black',
        fontSize: '12px',
        zIndex: '100',
        fontWeight: 'bold',
      }}
    >
      {text}
    </div>
  </div>
)

export function Location() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const defaultProps = {
    center: {
      lat: 10.7739888,
      lng: 106.7010858
    },
    zoom: 15
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
          {isClient && (
            <GoogleMapReact
              bootstrapURLKeys={{ key: keyMap }}
              defaultCenter={defaultProps.center}
              defaultZoom={defaultProps.zoom}
            >
              <Marker lat={defaultProps.center.lat} lng={defaultProps.center.lng} text='Show in here' />
            </GoogleMapReact>
          )}
        </div>
      </Container>
    </section>
  )
}
