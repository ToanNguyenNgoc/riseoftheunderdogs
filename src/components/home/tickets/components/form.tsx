import { TextFieldCustom } from '@/components'
import { IRQOrderTikets } from '@/interfaces'
import { tiketApi } from '@/services'
import { LoadingButton } from '@mui/lab'
import {
  Box,
  Container,
  Dialog,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  useMediaQuery,
} from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { Dispatch, SetStateAction, useCallback, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { CgClose } from 'react-icons/cg'
import { toast } from 'react-toastify'
import style from './style.module.css'
import {
  GoogleReCaptcha,
  GoogleReCaptchaProvider,
} from 'react-google-recaptcha-v3'
import { imgs } from '@/assets/imgs'
import Image from 'next/image'

interface FormData {
  fullname: string
  phone: string
  email: string
  payment_method_id: number
  description: string
  recaptcha: string
  coupon_code: string
  quantity: number
}

const defaultValues: FormData = {
  fullname: '',
  phone: '',
  email: '',
  payment_method_id: 2, // default value
  description: '',
  recaptcha: '',
  coupon_code: '',
  quantity: 1,
}

interface IOrderFormProps {
  selectedTickets: number[]
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export function OrderForm(props: IOrderFormProps) {
  const { selectedTickets, open, setOpen } = props
  const IS_MB = useMediaQuery('(max-width:767px)')
  const [refreshReCaptcha, setRefreshReCaptcha] = useState<boolean>(false)
  const [captcha, setCaptcha] = useState('')
  const verifyRecaptchaCallback = useCallback((token: string) => {
    // console.log('ReCaptcha Token:', token)
    setCaptcha(token)
  }, [])

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>({ defaultValues: { ...defaultValues } })

  const onSubmit = async (data: FormData) => {
    if (captcha === '') {
      setRefreshReCaptcha((r) => !r)
    } else {
      const tickets = selectedTickets.map((id) => ({
        id,
        quantity: data.quantity,
      }))
      const { quantity, ...restData } = data
      const newData = {
        ...restData,
        payment_method_id: Number(data.payment_method_id),
        tickets,
        recaptcha: captcha,
      }
      mutate(newData)
    }
  }

  const { mutate, status } = useMutation({
    mutationFn: (body: IRQOrderTikets) => tiketApi.postOrderTikets(body),
    onSuccess: async (data) => {
      if (data) {
        window.location.href =
          data?.context?.payment_gateway?.extra_data?.payUrl
      }
      reset()
    },
    onError: (error) => {
      const err = error as AxiosError<any>
      toast.error(err?.message)
    },
  })

  // console.log('Google ReCaptcha Key:', process.env.NEXT_PUBLIC_KEY_CAPTCHA)

  return (
    <Dialog
      className={style.tiket__dialog}
      onClose={() => setOpen(false)}
      open={open}
    >
      <GoogleReCaptchaProvider
        reCaptchaKey={process.env.NEXT_PUBLIC_KEY_CAPTCHA || ''}
        scriptProps={{
          async: true,
          defer: true,
          appendTo: 'head',
          nonce: undefined,
        }}
        container={{
          element: 'recaptcha__element',
          parameters: {
            badge: 'bottomleft',
            theme: 'light',
          },
        }}
      >
        <Container>
          <div className={style.tiket__dialog__header}>
            <p className={style.tiket__dialog__title}>Information</p>
            <CgClose
              className={style.close__dialog}
              onClick={() => setOpen(false)}
              size={28}
              color="var(--secondary-cl)"
            />
          </div>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={IS_MB ? 12 : 6}>
                <Controller
                  name="fullname"
                  control={control}
                  rules={{
                    required: 'Full Name is required',
                    minLength: {
                      value: 2,
                      message: 'Name must be at least 2 digits',
                    },
                    maxLength: {
                      value: 32,
                      message: 'Name must be less than 32 digits',
                    },
                  }}
                  render={({ field }) => (
                    <TextFieldCustom
                      {...field}
                      label="Full Name"
                      color="secondary"
                      fullWidth
                      required
                      error={!!errors.fullname}
                      helperText={
                        errors.fullname ? errors.fullname.message : ''
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={IS_MB ? 12 : 6}>
                <Controller
                  name="phone"
                  control={control}
                  rules={{
                    required: 'Phone is required',
                    minLength: {
                      value: 10,
                      message: 'Phone number must be at least 10 digits',
                    },
                    maxLength: {
                      value: 10,
                      message: 'Phone number must be less than 10 digits',
                    },
                    pattern: {
                      value: /^(0[1-9]{1}[0-9]{8}|84[1-9]{1}[0-9]{8})$/,
                      message: 'Invalid Vietnamese phone number format',
                    },
                  }}
                  render={({ field }) => (
                    <TextFieldCustom
                      {...field}
                      label="Phone"
                      fullWidth
                      color="secondary"
                      required
                      error={!!errors.phone}
                      helperText={errors.phone ? errors.phone.message : ''}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: 'Email is required',
                    pattern: {
                      value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
                      message: 'Invalid email address',
                    },
                  }}
                  render={({ field }) => (
                    <TextFieldCustom
                      color="secondary"
                      {...field}
                      label="Email"
                      fullWidth
                      required
                      error={!!errors.email}
                      helperText={errors.email ? errors.email.message : ''}
                    />
                  )}
                />
              </Grid>
              {/* quantity */}
              <Grid item xs={IS_MB ? 12 : 6}>
                <Controller
                  name="quantity"
                  control={control}
                  rules={{
                    required: 'Quantity is required',
                    min: {
                      value: 1,
                      message: 'Quantity must be at least 1',
                    },
                    pattern: {
                      value: /^[0-9]+$/,
                      message: 'Quantity must be a number',
                    },
                  }}
                  render={({ field }) => (
                    <TextFieldCustom
                      color="secondary"
                      {...field}
                      label="Quantity"
                      fullWidth
                      required
                      error={!!errors.quantity}
                      helperText={
                        errors.quantity ? errors.quantity.message : ''
                      }
                      inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    />
                  )}
                />
              </Grid>
              {/* close quantity */}
              {/* voucher */}
              <Grid item xs={IS_MB ? 12 : 6}>
                <Controller
                  name="coupon_code"
                  control={control}
                  render={({ field }) => (
                    <TextFieldCustom
                      color="secondary"
                      {...field}
                      label="Voucher (if any)"
                      fullWidth
                    />
                  )}
                />
              </Grid>
              {/* close voucher */}

              <Grid item xs={12}>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <TextFieldCustom
                      color="secondary"
                      {...field}
                      label="Description"
                      fullWidth
                      multiline
                      rows={3}
                    />
                  )}
                />
              </Grid>

              {/* payment method */}
              <Grid item xs={12}>
                <Controller
                  name="payment_method_id"
                  control={control}
                  rules={{ required: 'Payment method is required' }}
                  render={({ field }) => (
                    <FormControl component="fieldset">
                      <RadioGroup row {...field}>
                        <FormControlLabel
                          value={2}
                          control={<Radio color="success" />}
                          label={
                            <Image
                              src={imgs.momo}
                              alt="Momo"
                              style={{ width: 50, height: 50 }}
                            />
                          }
                          sx={{
                            border:
                              field.value == 2
                                ? '2px solid var(--valid-color)'
                                : '2px solid #ccc',
                            borderRadius: '4px',
                            padding: '5px',
                            margin: '5px',
                          }}
                        />
                        <FormControlLabel
                          value={1}
                          control={<Radio color="success" />}
                          label={
                            <Image
                              src={imgs.vnpay}
                              alt="Vnpay"
                              style={{ width: 50, height: 50 }}
                            />
                          }
                          sx={{
                            border:
                              field.value == 1
                                ? '2px solid var(--valid-color)'
                                : '2px solid #ccc',
                            borderRadius: '4px',
                            padding: '5px',
                            margin: '5px',
                          }}
                        />
                      </RadioGroup>
                    </FormControl>
                  )}
                />
              </Grid>
              {/* close payment method */}
            </Grid>
            <Box sx={{ mt: 2, mb: 2 }}>
              <LoadingButton
                loading={status === 'pending'}
                variant="contained"
                color="secondary"
                fullWidth
                size="large"
                type="submit"
              >
                {status === 'pending' ? 'Loading' : 'Submit'}
              </LoadingButton>
            </Box>
          </Box>
        </Container>
        <GoogleReCaptcha
          refreshReCaptcha={refreshReCaptcha}
          onVerify={verifyRecaptchaCallback}
        />
      </GoogleReCaptchaProvider>
    </Dialog>
  )
}
