import { Title } from '@/components/UI/title'
import { QR_KEY } from '@/constants'
import { ITicket } from '@/interfaces'
import { tiketApi } from '@/services'
import { Container } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import style from './style.module.css'
import Ticket from '@/components/home/tickets/components/ticket'

export function Buy() {
  const { data } = useQuery({
    queryKey: [QR_KEY.TIKETS],
    queryFn: () => tiketApi.getTikets(),
    staleTime: 5000,
  })

  const tikets = data?.context?.data || []
  const filterTicket = tikets.filter((item) => item.status == 1)

  return (
    <section id="buy" className="left">
      <Container maxWidth="lg">
        <Title
          title="Tickets"
          position="center"
          description="Choose your tickets and enter the quantity."
        />
        <div
          style={filterTicket.length === 1 ? { display: 'flex' } : {}}
          className={style.tiket__list}
        >
          {filterTicket.map((ticket: ITicket) => (
            <Ticket ticket={ticket} key={ticket.id} />
          ))}
        </div>
      </Container>
    </section>
  )
}
