import '@/styles/stylesheet.css'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { queryClient } from '@/configs'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { ToastContainer } from 'react-toastify'
import { QueryClientProvider } from '@tanstack/react-query'
const theme = createTheme({
  typography: {
    fontFamily: [
      'Poppins',
      '"Segoe UI"',
      'Roboto',
      'Arial',
      'sans-serif',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  palette: {
    primary: {
      main: '#0f171e',
      contrastText: '#fff',
    },
    secondary: {
      main: '#ff9800',
      contrastText: '#fff',
    },
    action: {
      disabledBackground: 'var(--primary-cl)',
      disabled: '#fff',
    },
  },
})
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ToastContainer autoClose={1500} />
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </QueryClientProvider>
    </>
  )
}
