import { baseURL } from '@/configs'
import { IOrderTikets, IPaymentGateway, IResponseDetail, IResponseList, IRQOrderTikets, ITicket } from '@/interfaces'
import axios from 'axios'

interface IParamsPage {
  limit: string
  page: string
}

export const tiketApi = {
  postOrderTikets: (body: IRQOrderTikets) => {
    return axios.post(`${baseURL}/api/orders/create`, body).then((res) => res.data as IResponseDetail<IOrderTikets>)
  },
  getTikets: () => {
    const params: IParamsPage = {
      limit: '15',
      page: '1'
    }
    return axios.get(`${baseURL}/api/tickets`, { params }).then((res) => res.data as IResponseList<ITicket[]>)
  },
  getTransaction: (id: string) => {
    return axios
      .get(`${baseURL}/api/paymentgateways/${id}`)
      .then((res) => res.data as IResponseDetail<IPaymentGateway[]>)
  }
}
