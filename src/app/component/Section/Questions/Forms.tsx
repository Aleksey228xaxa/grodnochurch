'use client'

import {
  TextField,
  Button,
  Box,
  Snackbar,
  Alert,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { useState, useEffect } from 'react'
import { AgreementCheckbox } from '../../Agreement/Agreement'
import { sendMessage } from '@/app/actions/sendMessages'

type Props = {
  textContent?: React.ReactNode
}

export function QuestionsFormClient({ textContent }: Props) {
  const [message, setMessage] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [showError, setShowError] = useState(false)
  const [successOpen, setSuccessOpen] = useState(false)
  const [errorOpen, setErrorOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [cooldown, setCooldown] = useState(0)
  const [attempts, setAttempts] = useState(0)
  const [emptyFieldError, setEmptyFieldError] = useState(false)

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const isMedium = useMediaQuery('(max-width:1120px)')

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (cooldown > 0) {
      timer = setInterval(() => {
        setCooldown((prev) => prev - 1)
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [cooldown])

  async function action(formData: FormData) {
    const message = formData.get('message') as string
    if (!agreed) {
      setShowError(true)
      return
    }
    if (cooldown > 0) {
      setErrorOpen(true)
      return
    }
    if (!message.trim()) {
      setEmptyFieldError(true)
      setShowError(true)
      return
    }
    setIsSubmitting(true)
    const res = await sendMessage(message.trim())
    if (res.error) {
      setErrorOpen(true)
    } else {
      setSuccessOpen(true)
      setMessage('')
      setAgreed(false)
      setShowError(false)
      setAttempts((prev) => prev + 1)
      setCooldown(10 * (attempts + 1))
    }
    setIsSubmitting(false)
  }

  return (
    <Box
      sx={{
        px: { xs: 2, sm: 4, md: 8 },
        py: 4,
        borderRadius: 4,
        backgroundColor: '#FAF6F0',
        boxShadow: '0 4px 24px rgba(0,0,0,0.05)',
        maxWidth: 1040,
        mx: 'auto',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: isMedium ? 4 : 8,
        alignItems: 'flex-start',
      }}
    >
      {textContent && (
        <Box flex={1} sx={{ width: '100%' }}>
          {textContent}
        </Box>
      )}

      <Box
        flex={1}
        component="form"
        display="flex"
        flexDirection="column"
        gap={2}
        width="100%"
        onSubmit={(e) => {
          e.preventDefault()
          action(new FormData(e.currentTarget))
        }}
      >
        <TextField
          label="Вопрос"
          variant="outlined"
          fullWidth
          multiline
          rows={1}
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          sx={inputStyle}
          disabled={isSubmitting}
        />
        <AgreementCheckbox
          value={agreed}
          onChange={(val) => setAgreed(val)}
          showError={showError && !agreed}
          disabled={isSubmitting}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth={isMobile}
          disabled={isSubmitting || cooldown > 0}
          sx={{
            backgroundColor: '#BF9460',
            color: '#FFF',
            borderRadius: 2,
            py: 1.5,
            textTransform: 'none',
            fontSize: '16px',
            fontWeight: 500,
            fontFamily: 'Inter, sans-serif',
            '&:hover': {
              backgroundColor: '#A5793B',
            },
            '&:disabled': {
              backgroundColor: '#E0E0E0',
              color: '#9E9E9E',
            },
          }}
        >
          {cooldown > 0 
            ? `Подождите ${cooldown} сек.` 
            : isSubmitting 
              ? 'Отправка...' 
              : 'Отправить'}
        </Button>
      </Box>

      <Snackbar
        open={successOpen}
        autoHideDuration={6000}
        onClose={() => setSuccessOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setSuccessOpen(false)} 
          severity="success" 
          sx={{ 
            width: '100%',
            backgroundColor: '#E8F5E9',
            color: '#2E7D32',
            '& .MuiAlert-icon': {
              color: '#2E7D32',
            },
            '& .MuiAlert-message': {
              fontSize: '16px',
              fontFamily: 'Inter, sans-serif',
            },
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            borderRadius: '12px',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            <Box sx={{ fontWeight: 600 }}>Спасибо за ваш вопрос!</Box>
            <Box>Мы получили ваше сообщение и скоро ответим на него.</Box>
          </Box>
        </Alert>
      </Snackbar>

      <Snackbar
        open={errorOpen}
        autoHideDuration={6000}
        onClose={() => setErrorOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setErrorOpen(false)} 
          severity="error" 
          sx={{ 
            width: '100%',
            backgroundColor: '#FDEDED',
            color: '#D32F2F',
            '& .MuiAlert-icon': {
              color: '#D32F2F',
            },
            '& .MuiAlert-message': {
              fontSize: '16px',
              fontFamily: 'Inter, sans-serif',
            },
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            borderRadius: '12px',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            <Box sx={{ fontWeight: 600 }}>
              {cooldown > 0 
                ? 'Пожалуйста, подождите' 
                : 'Произошла ошибка'}
            </Box>
            <Box>
              {cooldown > 0 
                ? `Следующую отправку можно будет сделать через ${cooldown} сек.` 
                : 'Пожалуйста, попробуйте отправить форму еще раз.'}
            </Box>
          </Box>
        </Alert>
      </Snackbar>

      <Snackbar
        open={emptyFieldError}
        autoHideDuration={6000}
        onClose={() => setEmptyFieldError(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setEmptyFieldError(false)} 
          severity="error" 
          sx={{ 
            width: '100%',
            backgroundColor: '#FDEDED',
            color: '#D32F2F',
            '& .MuiAlert-icon': {
              color: '#D32F2F',
            },
            '& .MuiAlert-message': {
              fontSize: '16px',
              fontFamily: 'Inter, sans-serif',
            },
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            borderRadius: '12px',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            <Box sx={{ fontWeight: 600 }}>
              Поле не должно быть пустым
            </Box>
            <Box>
              Пожалуйста, введите ваш вопрос перед отправкой.
            </Box>
          </Box>
        </Alert>
      </Snackbar>
    </Box>
  )
}

const inputStyle = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    backgroundColor: '#f5f5f5',
    '& fieldset': {
      borderColor: '#DBA04B',
      borderWidth: '2px',
    },
    '&:hover fieldset': {
      borderColor: '#BF9460',
      borderWidth: '2px',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#BF9460',
      borderWidth: '2px',
    },
  },
  '& .MuiInputLabel-root': {
    color: '#BF9460',
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#DBA04B',
  },
}
