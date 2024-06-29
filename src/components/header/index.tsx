import { Button, Container, useMediaQuery } from '@mui/material'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import style from './style.module.css'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const IS_MB = useMediaQuery('(max-width:1023px)')
  function handleActiveHambuger() {
    document.body.classList.toggle(style.body_active)
  }
  function handleRemoveHambuger() {
    document.body.classList.remove(style.body_active)
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 66) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className={`${style.header} ${style.container_fluid} ${isScrolled ? style.scrolled : ''}`}>
      <div className={style.header_left}>
        <div onClick={() => handleActiveHambuger()} className={style.hamburger} id={style.hamburger}>
          <span className={style.line}></span>
          <span className={style.line}></span>
          <span className={style.line}></span>
        </div>
        <Link href='/' className={style.header_logo}>
          Sell Tickets
        </Link>
      </div>
      <HeaderNav handleRemoveHambuger={handleRemoveHambuger} />
      <Button size={IS_MB ? 'small' : 'large'} variant='contained' color='secondary'>
        Buy Now
      </Button>
    </div>
  )
}

interface IProps {
  handleRemoveHambuger: () => void
}
const HeaderNav = (props: IProps) => {
  const { handleRemoveHambuger } = props
  return (
    <nav className={style.nav}>
      <ul className={style.nav_ul}>
        <li onClick={() => handleRemoveHambuger()} className={style.nav_li}>
          <Link href={'#show'}>Show</Link>
        </li>
        <li onClick={() => handleRemoveHambuger()} className={style.nav_li}>
          <Link href='#artist'>Artist</Link>
        </li>
        <li onClick={() => handleRemoveHambuger()} className={style.nav_li}>
          <Link href='#buy'>Buy ticket</Link>
        </li>
        <li onClick={() => handleRemoveHambuger()} className={style.nav_li}>
          <Link href='#location'>Location</Link>
        </li>
        <li onClick={() => handleRemoveHambuger()} className={style.nav_li}>
          <Link href='#timeline'>Timeline</Link>
        </li>
      </ul>
    </nav>
  )
}
