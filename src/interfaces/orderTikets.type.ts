interface Item {
  id: number
  order_id: number
  base_price: number
  quantity: number
  productable_type: string
  productable_id: number
  created_at: string
  updated_at: string
  uuid: string
  is_checkin: number
  discount: any
}

interface PaymentMethod {
  id: number
  name_key: string
  is_changeable: boolean
  created_at: string
  updated_at: string
}

interface PaymentGateway {
  id: number
  status: string
  amount: number
  description: string
  transaction_uuid: string
  extra_data: {
    payUrl: string
  }
  payment_method_id: number
  paymentable_type: string
  paymentable_id: number
  created_at: string
  updated_at: string
  deleted_at: any
}

export interface IOrderTikets {
  id: number
  status: string
  amount: number
  description: string
  fullname: string
  email: string
  phone: string
  payment_method_id: number
  created_at: string
  updated_at: string
  deleted_at: any
  discount_value: number
  items: Item[]
  payment_method: PaymentMethod
  payment_gateway: PaymentGateway
}
