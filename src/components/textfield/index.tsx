import { TextField } from '@mui/material'
import React from 'react'
export function TextFieldCustom({ ...props }) {
  const { label } = props;
  return (
    <TextField
      label={label}
      // variant='outlined'
      // fullWidth
      // required
      {...props}
      sx={{
        '& .MuiOutlinedInput-root': {
          color: '#ff9800',
          fontFamily: 'Arial',
          fontWeight: 'bold',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#ff9800',
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
              borderColor: '#ff9800'
            }
          }
        },
        '& .MuiInputLabel-outlined': {
          color: '#ff9800',
          fontWeight: 'bold',
          '&.Mui-focused': {
            color: '#ff9800',
            fontWeight: 'bold'
          }
        }
      }}
    />
  )
}
