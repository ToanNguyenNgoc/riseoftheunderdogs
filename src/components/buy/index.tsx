import { TextFieldCustom } from '@/components'
import { Title } from '@/components/title'
import { QR_KEY } from '@/constants'
import { IRQOrderTikets, ITicket } from '@/interfaces'
import { tiketApi } from '@/services'
import { formatMoney } from '@/utils'
import { Box, Button, Checkbox, Container, Dialog, Grid, useMediaQuery } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react'
import { GoogleReCaptcha, GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import { Controller, useForm } from 'react-hook-form'
import { CgClose } from 'react-icons/cg'
import { toast } from 'react-toastify'
import style from './style.module.css'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { LoadingButton } from '@mui/lab'

export function Buy() {
  const [selectedTickets, setSelectedTickets] = useState<{ id: number; quantity: number }[]>([])
  const [refreshReCaptcha, setRefreshReCaptcha] = useState<boolean>(false)
  const [captcha, setCaptcha] = useState('')
  const [open, setOpen] = useState<boolean>(false)
  const verifyRecaptchaCallback = useCallback((token: string) => {
    setCaptcha(token)
  }, [])

  const { data } = useQuery({
    queryKey: [QR_KEY.TIKETS],
    queryFn: () => tiketApi.getTikets(),
    staleTime: 5000
  })

  const tikets = data?.context?.data || []
  const filterTicket = tikets.filter(item => item.status == 1);


  useEffect(() => {
    if (filterTicket.length === 1) {
      setSelectedTickets([{ id: filterTicket[0].id, quantity: 1 }])
    }
  }, [filterTicket])

  const handleTicketChange = (ticketId: number, quantity: number) => {
    if (quantity > 0) {
      
      setSelectedTickets((prevSelectedTickets) => {
        const filteredTickets = prevSelectedTickets.filter((ticket) => ticket.id !== ticketId)
        if (quantity > 0) {
          return [...filteredTickets, { id: ticketId, quantity }]
        }
        return filteredTickets
      })
    }
  }

  return (
    <section id="buy" className='left'>
      <GoogleReCaptchaProvider
        reCaptchaKey={process.env.NEXT_PUBLIC_KEY_CAPTCHA || ''}
        scriptProps={{
          async: true,
          defer: true,
          appendTo: 'head',
          nonce: undefined
        }}
        container={{
          element: 'recaptcha__element',
          parameters: {
            badge: 'bottomright',
            theme: 'dark'
          }
        }}
      >
        <Container maxWidth='lg'>
          <Title title='Tickets' position='center' description='Choose your tickets and enter the quantity.' />
          <div className={style.tiket}>
            <div className={style.tiket__list}>
              {filterTicket.map((ticket: ITicket) => (
                <div className={style.tiket__item} key={ticket.id}>
                  <div className={style.tiket__item__text}>
                    <p className={style.tiket__item__tilte}>{ticket.title}</p>
                    <p className={style.tiket__item__price}>{formatMoney(ticket.price)} VND</p>
                  </div>
                  {selectedTickets.find((t) => t.id === ticket.id) && (
                    <TextFieldCustom
                      fullWidth
                      required
                      type='number'
                      label='Quantity'
                      color='secondary'
                      value={selectedTickets.find((t) => t.id === ticket.id)?.quantity || 1}
                      onChange={(e: any) => handleTicketChange(ticket.id, parseInt(e.target.value, 10))}
                    />
                  )}
                  <Checkbox
                    color='secondary'
                    style={filterTicket.length === 1 ? { display: 'none' } : { marginTop: 'auto' }}
                    onChange={(e) => handleTicketChange(ticket.id, e.target.checked ? 1 : 0)}
                  />
                </div>
              ))}
            </div>
            <Button size='large' variant='contained' color='secondary' onClick={() => setOpen(true)}>
              Buy
            </Button>

            {tikets && (
              <OrderForm
                open={open}
                setOpen={setOpen}
                captcha={captcha}
                setRefreshReCaptcha={setRefreshReCaptcha}
                selectedTickets={selectedTickets}
              />
            )}
          </div>
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
  coupon_code: ''
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
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm<FormData>({ defaultValues: { ...defaultValues} })
  const IS_MB = useMediaQuery('(max-width:767px)')
  const onSubmit = async (data: FormData) => {
    if (captcha === '') {
      setRefreshReCaptcha((r) => !r)
    } else {
      const newData = {
        ...data,
        tickets: selectedTickets,
        recaptcha: captcha
      }
      mutate(newData)
      // console.log(newData)
    }
  }

  const { mutate, status } = useMutation({
    mutationFn: (body: IRQOrderTikets) => tiketApi.postOrderTikets(body),
    onSuccess: async (data) => {
      if (data) {
        window.location.href = data?.context?.payment_gateway?.extra_data?.payUrl
      }
      reset()
      toast.success('ok')
    },
    onError: (error) => {
      const err = error as AxiosError<any>
      toast.error(err?.message)
    }
  })

  return (
    <Dialog className={style.tiket__dialog} onClose={() => setOpen(false)} open={open}>
      <Container>
        <div className={style.tiket__dialog__header}>
          <p className={style.tiket__dialog__title}>Infomation</p>
          <CgClose
            className={style.close__dialog}
            onClick={() => setOpen(false)}
            size={28}
            color='var(--secondary-cl)'
          />
        </div>
        <Box component='form' onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={IS_MB ? 12 : 6}>
              <Controller
                name='fullname'
                control={control}
                rules={{ required: 'Full Name is required' }}
                render={({ field }) => (
                  <TextFieldCustom
                    {...field}
                    label='Full Name'
                    color='secondary'
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
                name='phone'
                control={control}
                rules={{
                  required: 'Phone is required',
                  minLength: {
                    value: 10,
                    message: 'Phone number must be at least 10 digits'
                  },
                  maxLength: {
                    value: 10,
                    message: 'Phone number must be less than 10 digits'
                  }
                }}
                render={({ field }) => (
                  <TextFieldCustom
                    {...field}
                    label='Phone'
                    fullWidth
                    color='secondary'
                    required
                    error={!!errors.phone}
                    helperText={errors.phone ? errors.phone.message : ''}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name='email'
                control={control}
                rules={{
                  required: 'Email is required',
                  pattern: {
                    value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
                    message: 'Invalid email address'
                  }
                }}
                render={({ field }) => (
                  <TextFieldCustom
                    color='secondary'
                    {...field}
                    label='Email'
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
                name='coupon_code'
                control={control}
                render={({ field }) => (
                  <TextFieldCustom color='secondary' {...field} label='Voucher (if any)' fullWidth />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name='description'
                control={control}
                // rules={{ required: 'Description is required' }}
                render={({ field }) => (
                  <TextFieldCustom
                    color='secondary'
                    {...field}
                    label='Description'
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
              loadingPosition='end'
              variant='contained'
              color='secondary'
              fullWidth
              size='large'
              type='submit'
            >
              {status === 'pending' ? 'Loading' : 'Submit'}
            </LoadingButton>
          </Box>
        </Box>
      </Container>
    </Dialog>
  )
}
