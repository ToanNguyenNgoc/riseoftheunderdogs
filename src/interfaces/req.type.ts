interface Ticket {
  id: number
  quantity: number
}

export interface IRQOrderTikets {
  fullname: string
  phone: string
  email: string
  tickets: Ticket[]
  payment_method_id: number
  description: string
  recaptcha: string
}
