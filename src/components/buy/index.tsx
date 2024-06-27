import React, { useCallback, useState } from 'react'
import style from './style.module.css'
import { Title } from '@/components/title'
import { GoogleReCaptcha, GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import { useForm, Controller } from 'react-hook-form'
import axios from 'axios'
import { Container, Button, Typography, Box, Grid } from '@mui/material'
import { TextFieldCustom } from '@/components'

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
          <OrderForm captcha={captcha} />
        </Container>
        <GoogleReCaptcha refreshReCaptcha={refreshReCaptcha} onVerify={verifyRecaptchaCallback} />
      </GoogleReCaptchaProvider>
    </section>
  )
}


interface FormData {
  fullname: string
  phone: string
  email: string
  tickets: { id: number; quantity: number }[]
  payment_method_id: number
  description: string
}

const defaultValues: FormData = {
  fullname: '',
  phone: '',
  email: '',
  tickets: [{ id: 1, quantity: 3 }],
  payment_method_id: 1,
  description: ''
}
interface IOrderFormProps {
  captcha: string
} 
export function OrderForm(props: IOrderFormProps) {
  const { captcha } = props
  const { handleSubmit, control } = useForm<FormData>({ defaultValues })

  const onSubmit = async (data: FormData) => {
    const newData = {
      ...data,
      payment_method_id: 1,
      recaptcha: captcha
    }
    console.log(newData)

    try {
      const response = await axios.post('https://api.riseoftheunderdogs.com/api/orders/create', newData, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      console.log('Response:', response.data)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <Container>
      <Box component='form' onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 3 }}>
        {/* <Typography variant='h4' gutterBottom>
          Create Order
        </Typography> */}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Controller
              name='fullname'
              control={control}
              render={({ field }) => (
                <TextFieldCustom {...field} label='Full Name' color='secondary' fullWidth required />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name='phone'
              control={control}
              render={({ field }) => <TextFieldCustom {...field} label='Phone' fullWidth color='secondary' required />}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name='email'
              control={control}
              render={({ field }) => <TextFieldCustom color='secondary' {...field} label='Email' fullWidth required />}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name='description'
              control={control}
              render={({ field }) => (
                <TextFieldCustom
                  color='secondary'
                  {...field}
                  label='Description'
                  fullWidth
                  required
                  multiline
                  rows={4}
                />
              )}
            />
          </Grid>
        </Grid>
        <Box sx={{ mt: 2 }}>
          <Button type='submit' variant='contained' color='secondary'>
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  )
}