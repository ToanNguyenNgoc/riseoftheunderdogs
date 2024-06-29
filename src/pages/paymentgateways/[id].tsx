import { GetServerSideProps } from 'next'
import axios from 'axios'
import { baseURL } from '@/configs'

interface PaymentProps {
  initialStatus: string
  paymentId: string
}

const PaymentStatus = ({ initialStatus, paymentId }: PaymentProps) => {
  console.log(initialStatus)
  return (
    <div>
      <h1>Payment ID: {paymentId}</h1>
      {initialStatus === 'PAID' ? (
        <h2>Thanh toán thành công</h2>
      ) : initialStatus === 'PENDING' ? (
        <h2>Đang chờ thanh toán</h2>
      ) : (
        <h2>Hủy thanh toán</h2>
      )}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string }
  // console.log(id)
  if (!id) {
    return {
      notFound: true
    }
  }

  let initialStatus = 'PENDING'

  try {
    const response = await axios.get(`${baseURL}/api/paymentgateways/AadFqC`)
    if (response.data && response.data.status) {
      initialStatus = response.data.context.status
    }
    // console.log(response)
  } catch (error) {
    console.error('Error fetching payment status:', error)
  }

  return {
    props: {
      initialStatus,
      paymentId: id
    }
  }
}

export default PaymentStatus
