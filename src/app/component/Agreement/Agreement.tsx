'use client'
import { Checkbox, FormControlLabel, FormGroup, FormHelperText } from '@mui/material'
import { Typography } from '@mui/material'

interface AgreementCheckboxProps {
  value: boolean
  onChange: (value: boolean) => void
  showError?: boolean
  disabled?: boolean
}

export function AgreementCheckbox({ value, onChange, showError, disabled }: AgreementCheckboxProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked)
  }

  const hasError = showError && !value

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Checkbox
            checked={value}
            onChange={handleChange}
            sx={{
              color: '#BF9460',
              '&.Mui-checked': {
                color: '#BF9460',
              },
            }}
            disabled={disabled}
          />
        }
        label={
          <Typography
            sx={{
              color: showError ? '#D32F2F' : '#BF9460',
              fontSize: '14px',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            Я согласен с обработкой персональных данных
          </Typography>
        }
      />
      {hasError && (
        <FormHelperText error>
          Нужно принять условия
        </FormHelperText>
      )}
    </FormGroup>
  )
}
