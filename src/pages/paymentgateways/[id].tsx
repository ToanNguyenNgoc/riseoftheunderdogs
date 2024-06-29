import { GetServerSideProps } from 'next'
import axios from 'axios'
import { useEffect, useState } from 'react'

interface PaymentProps {
  initialStatus: string
  paymentId: string
}

const PaymentStatus = ({ initialStatus, paymentId }: PaymentProps) => {
  const [status, setStatus] = useState(initialStatus)

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await axios.get(`https://riseoftheunderdogs.com/api/paymentgateways/${paymentId}`)
        if (response.data && response.data.status) {
          setStatus(response.data.status)
        }
      } catch (error) {
        console.error('Error fetching payment status:', error)
      }
    }

    fetchStatus()
  }, [paymentId])

  return (
    <div>
      <h1>Payment ID: {paymentId}</h1>
      {status === 'PAID' ? (
        <h2>Thanh toán thành công</h2>
      ) : status === 'PENDING' ? (
        <h2>Đang chờ thanh toán</h2>
      ) : (
        <h2>Sai</h2>
      )}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string }

  if (!id) {
    return {
      notFound: true
    }
  }

  let initialStatus = 'PENDING'

  try {
    const response = await axios.get(`https://riseoftheunderdogs.com/api/paymentgateways/${id}`)
    if (response.data && response.data.status) {
      initialStatus = response.data.status
    }
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
