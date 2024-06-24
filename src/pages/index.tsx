import { Artist, Buy, Footer, Header, Hero, Location, Seo, Show, Timeline } from '@/components'

export default function Home() {
  return (
    <>
      <Seo title='Trang chủ' description='Trang chủ Sell Tickets' url='' />
      <main>
        <Header />
        <Hero />
        <Show />
        <Artist />
        <Buy />
        <Location/>
        <Timeline/>
        <Footer/>
      </main>
    </>
  )
}
