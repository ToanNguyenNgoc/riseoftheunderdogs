import React, { useCallback, useState } from 'react'
import style from './style.module.css'
import { Container } from '@mui/material'
import { Title } from '@/components/title'
import { GoogleReCaptcha, GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
export function Buy() {
  const [refreshReCaptcha, setRefreshReCaptcha] = useState(false)
  const [captcha, setCaptcha] = useState('')
  const verifyRecaptchaCallback = useCallback((token: string) => {
    setCaptcha(token)
  }, [])
  console.log('captcha :>> ', captcha);
  return (
    <section className='left'>
      <GoogleReCaptchaProvider
        reCaptchaKey={process.env.NEXT_PUBLIC_KEY_CAPTCHA || ''}
        scriptProps={{
          async: true,
          defer: true,
          appendTo: 'head',
          nonce: undefined
        }}
      >
        <Container>
          <Title
            title='Buy Tikets'
            position='center'
            description='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi, minima.'
          />
        </Container>
        <GoogleReCaptcha refreshReCaptcha={refreshReCaptcha} onVerify={verifyRecaptchaCallback} />
      </GoogleReCaptchaProvider>
    </section>
  )
}
