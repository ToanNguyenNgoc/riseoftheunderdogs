import { TextFieldCustom } from '@/components'
import { IRQOrderTikets } from '@/interfaces'
import { tiketApi } from '@/services'
import { LoadingButton } from '@mui/lab'
import { Box, Container, Dialog, Grid, useMediaQuery } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { Dispatch, SetStateAction } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { CgClose } from 'react-icons/cg'
import { toast } from 'react-toastify'
import style from './style.module.css'

interface FormData {
  fullname: string
  phone: string
  email: string
  tickets: { id: number; quantity: number }[]
  payment_method_id: number
  description: string
  recaptcha: string
  coupon_code: string
}

const defaultValues: FormData = {
  fullname: '',
  phone: '',
  email: '',
  tickets: [],
  payment_method_id: 1,
  description: '',
  recaptcha: '',
  coupon_code: '',
}

interface IOrderFormProps {
  captcha: string
  setRefreshReCaptcha: Dispatch<SetStateAction<boolean>>
  selectedTickets: { id: number; quantity: number }[]
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export function OrderForm(props: IOrderFormProps) {
  const { captcha, setRefreshReCaptcha, selectedTickets, open, setOpen } = props
  const IS_MB = useMediaQuery('(max-width:767px)')
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
      const newData = {
        ...data,
        tickets: selectedTickets,
        recaptcha: captcha,
      }
      mutate(newData)
      // console.log(newData)
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

  return (
    <Dialog
      className={style.tiket__dialog}
      onClose={() => setOpen(false)}
      open={open}
    >
      <Container>
        <div className={style.tiket__dialog__header}>
          <p className={style.tiket__dialog__title}>Infomation</p>
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
                    helperText={errors.fullname ? errors.fullname.message : ''}
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
            <Grid item xs={12}>
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
            <Grid item xs={12}>
              <Controller
                name="description"
                control={control}
                // rules={{ required: 'Description is required' }}
                render={({ field }) => (
                  <TextFieldCustom
                    color="secondary"
                    {...field}
                    label="Description"
                    fullWidth
                    // required
                    multiline
                    rows={4}
                    // error={!!errors.description}
                    // helperText={errors.description ? errors.description.message : ''}
                  />
                )}
              />
            </Grid>
          </Grid>
          <Box sx={{ mt: 2, mb: 2 }}>
            <LoadingButton
              loading={status === 'pending'}
              // loadingPosition='end'
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
    </Dialog>
  )
}
