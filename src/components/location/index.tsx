import { Container } from '@mui/material'
import React, { useEffect, useState } from 'react'
import style from './style.module.css'
import { Title } from '@/components/title'
import GoogleMapReact from 'google-map-react'
import { keyApi } from '@/constants/varible'

// const AnyReactComponent: any = ({ text }: { text: string }) => (
//   <div style={{ color: 'red', fontWeight: 'bold' }}>{text}</div>
// )

export function Location() {
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    // This will run only once on the client side
    setIsClient(true)
  }, [])

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
          {isClient && (
            <GoogleMapReact
              bootstrapURLKeys={{ key: keyApi }}
              defaultCenter={defaultProps.center}
              defaultZoom={defaultProps.zoom}
            >
              {/* <AnyReactComponent lat={40.785091} lng={-73.968285} text='Central Park' /> */}
            </GoogleMapReact>
          )}
        </div>
      </Container>
    </section>
  )
}
