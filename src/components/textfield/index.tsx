import { TextField } from '@mui/material'
import React from 'react'
export function TextFieldCustom({ ...props }) {
  const { label } = props;
  return (
    <TextField
      label={label}
      {...props}
      sx={{
        '& .MuiOutlinedInput-root': {
          color: 'var(--secondary-cl)',
          fontFamily: 'Poppins',
          fontWeight: 'bold',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'var(--secondary-cl)',
            borderWidth: '2px'
          },
          '&.Mui-focused': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'ff9800',
              borderWidth: '3px'
            }
          },
          '&:hover:not(.Mui-focused)': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'var(--secondary-cl)'
            }
          }
        },
        '& .MuiInputLabel-outlined': {
          color: 'var(--secondary-cl)',
          fontWeight: 'bold',
          '&.Mui-focused': {
            color: 'var(--secondary-cl)',
            fontWeight: 'bold'
          }
        }
      }}
    />
  )
}
