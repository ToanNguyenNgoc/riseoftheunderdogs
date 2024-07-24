import {
  Artist,
  Buy,
  Footer,
  Header,
  Hero,
  Location,
  Seo,
  Show,
  Timeline,
} from '@/components'
import ScrollToTop from '@/components/UI/scrollToTop'
import { GetServerSideProps } from 'next'
import { tiketApi } from '@/services'
import { ITicket } from '@/interfaces'

interface HomeProps {
  tickets: ITicket[]
}

export default function Home({ tickets }: HomeProps) {
  return (
    <>
      <Seo title="Trang chủ" description="Trang chủ Sell Tickets" url="" />
      <main>
        <Header />
        <Hero />
        <Show />
        <Artist />
        <Buy tickets={tickets} />
        <Location />
        <Timeline />
        <Footer />
        <ScrollToTop />
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response = await tiketApi.getTikets()
    const tickets = response.context.data || []

    return {
      props: {
        tickets,
      },
    }
  } catch (error) {
    console.error('Error fetching tickets:', error)
    return {
      props: {
        tickets: [],
      },
    }
  }
}
