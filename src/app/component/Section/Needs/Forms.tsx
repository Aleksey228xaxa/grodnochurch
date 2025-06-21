'use client'

import {
  TextField,
  Button,
  Box,
  Snackbar,
  Alert,
} from '@mui/material'
import { useState, useEffect } from 'react'
import { AgreementCheckbox } from '../../Agreement/Agreement'
import { sendNeed } from '@/app/actions/SendNeed'

type Props = {
  textContent?: React.ReactNode
}

export function QuestionsFormClient({ textContent }: Props) {
  const [name, setName] = useState('')
  const [need, setNeed] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [showError, setShowError] = useState(false)
  const [successOpen, setSuccessOpen] = useState(false)
  const [errorOpen, setErrorOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [cooldown, setCooldown] = useState(0)
  const [attempts, setAttempts] = useState(0)
  const [emptyFieldsError, setEmptyFieldsError] = useState(false)

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (cooldown > 0) {
      timer = setInterval(() => {
        setCooldown((prev) => prev - 1)
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [cooldown])

  const handleSubmit = async () => {
    if (!agreed) {
      setShowError(true)
      return
    }

    if (cooldown > 0) {
      setErrorOpen(true)
      return
    }

    if (!name.trim() || !need.trim()) {
      setEmptyFieldsError(true)
      setShowError(true)
      return
    }

    setIsSubmitting(true)
    try {
      const res = await sendNeed(name, need)
      if (!res.success) {
        throw new Error(res.error || 'Ошибка при отправке')
      }
      setName('')
      setNeed('')
      setAgreed(false)
      setShowError(false)
      setSuccessOpen(true)
      setAttempts((prev) => prev + 1)
      setCooldown(10 * (attempts + 1))
    } catch (error) {
      console.error('Ошибка:', error)
      setErrorOpen(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Box
      sx={{
        px: { xs: 0.5, sm: 2, md: 8 },
        py: { xs: 1.5, sm: 3, md: 4 },
        borderRadius: 4,
        backgroundColor: '#FAF6F0',
        boxShadow: '0 4px 24px rgba(0,0,0,0.05)',
        maxWidth: { xs: '100vw', sm: 600, md: 1040 },
        width: { xs: '100vw', sm: '100%', md: '100%' },
        mx: 'auto',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: { xs: 1.5, sm: 3, md: 4 },
        alignItems: 'flex-start',
        boxSizing: 'border-box',
        overflowX: 'hidden',
        wordBreak: 'break-word',
        overflowWrap: 'break-word',
      }}
    >
      {textContent && (
        <Box
          flex={1}
          sx={{
            width: '100%',
            maxWidth: '100%',
            mb: { xs: 2, md: 0 },
            wordBreak: 'break-word',
            overflowWrap: 'break-word',
            boxSizing: 'border-box',
          }}
        >
          {textContent}
        </Box>
      )}

      <Box
        flex={1}
        component="form"
        display="flex"
        flexDirection="column"
        gap={{ xs: 1.5, sm: 2 }}
        width="100%"
        sx={{
          maxWidth: '100%',
          wordBreak: 'break-word',
          overflowWrap: 'break-word',
          boxSizing: 'border-box',
        }}
      >
        <TextField
          label="Имя"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ ...inputStyle, fontSize: { xs: '15px', sm: '16px' }, maxWidth: '100%', wordBreak: 'break-word', overflowWrap: 'break-word', boxSizing: 'border-box' }}
          InputProps={{
            sx: {
              fontSize: { xs: '15px', sm: '16px' },
              height: { xs: 44, sm: 48 },
            },
          }}
          InputLabelProps={{
            sx: {
              fontSize: { xs: '14px', sm: '16px' },
            },
          }}
          disabled={isSubmitting}
        />
        <TextField
          label="Нужда"
          variant="outlined"
          fullWidth
          value={need}
          onChange={(e) => setNeed(e.target.value)}
          sx={{ ...inputStyle, fontSize: { xs: '15px', sm: '16px' }, maxWidth: '100%', wordBreak: 'break-word', overflowWrap: 'break-word', boxSizing: 'border-box' }}
          InputProps={{
            sx: {
              fontSize: { xs: '15px', sm: '16px' },
              height: { xs: 44, sm: 48 },
            },
          }}
          InputLabelProps={{
            sx: {
              fontSize: { xs: '14px', sm: '16px' },
            },
          }}
          disabled={isSubmitting}
        />
        <AgreementCheckbox
          value={agreed}
          onChange={(val) => setAgreed(val)}
          showError={showError && !agreed}
          disabled={isSubmitting}
        />
        <Button
          variant="contained"
          onClick={handleSubmit}
          fullWidth
          disabled={isSubmitting || cooldown > 0}
          sx={{
            backgroundColor: '#BF9460',
            color: '#FFF',
            borderRadius: 2,
            py: { xs: 1, sm: 1.5 },
            textTransform: 'none',
            fontSize: { xs: '15px', sm: '16px' },
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
        sx={{ mb: { xs: 8, sm: 0 }, maxWidth: '100vw', boxSizing: 'border-box' }}
      >
        <Alert 
          onClose={() => setSuccessOpen(false)} 
          severity="success" 
          sx={{ 
            width: '100%',
            maxWidth: '100vw',
            backgroundColor: '#E8F5E9',
            color: '#2E7D32',
            '& .MuiAlert-icon': {
              color: '#2E7D32',
            },
            '& .MuiAlert-message': {
              fontSize: '16px',
              fontFamily: 'Inter, sans-serif',
              wordBreak: 'break-word',
              overflowWrap: 'break-word',
              maxWidth: '100%',
            },
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            borderRadius: '12px',
            wordBreak: 'break-word',
            overflowWrap: 'break-word',
            boxSizing: 'border-box',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, wordBreak: 'break-word', overflowWrap: 'break-word', maxWidth: '100%', boxSizing: 'border-box' }}>
            <Box sx={{ fontWeight: 600, wordBreak: 'break-word', overflowWrap: 'break-word', maxWidth: '100%' }}>Спасибо за ваше обращение!</Box>
            <Box sx={{ wordBreak: 'break-word', overflowWrap: 'break-word', maxWidth: '100%' }}>Мы получили ваше сообщение.</Box>
          </Box>
        </Alert>
      </Snackbar>

      <Snackbar
        open={errorOpen}
        autoHideDuration={6000}
        onClose={() => setErrorOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        sx={{ mb: { xs: 8, sm: 0 }, maxWidth: '100vw', boxSizing: 'border-box' }}
      >
        <Alert 
          onClose={() => setErrorOpen(false)} 
          severity="error" 
          sx={{ 
            width: '100%',
            maxWidth: '100vw',
            backgroundColor: '#FDEDED',
            color: '#D32F2F',
            '& .MuiAlert-icon': {
              color: '#D32F2F',
            },
            '& .MuiAlert-message': {
              fontSize: '16px',
              fontFamily: 'Inter, sans-serif',
              wordBreak: 'break-word',
              overflowWrap: 'break-word',
              maxWidth: '100%',
            },
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            borderRadius: '12px',
            wordBreak: 'break-word',
            overflowWrap: 'break-word',
            boxSizing: 'border-box',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, wordBreak: 'break-word', overflowWrap: 'break-word', maxWidth: '100%', boxSizing: 'border-box' }}>
            <Box sx={{ fontWeight: 600, wordBreak: 'break-word', overflowWrap: 'break-word', maxWidth: '100%' }}>
              {cooldown > 0 
                ? 'Пожалуйста, подождите' 
                : 'Произошла ошибка'}
            </Box>
            <Box sx={{ wordBreak: 'break-word', overflowWrap: 'break-word', maxWidth: '100%' }}>
              {cooldown > 0 
                ? `Следующую отправку можно будет сделать через ${cooldown} сек.` 
                : 'Пожалуйста, попробуйте отправить форму еще раз.'}
            </Box>
          </Box>
        </Alert>
      </Snackbar>

      <Snackbar
        open={emptyFieldsError}
        autoHideDuration={6000}
        onClose={() => setEmptyFieldsError(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        sx={{ mb: { xs: 8, sm: 0 }, maxWidth: '100vw', boxSizing: 'border-box' }}
      >
        <Alert 
          onClose={() => setEmptyFieldsError(false)} 
          severity="error" 
          sx={{ 
            width: '100%',
            maxWidth: '100vw',
            backgroundColor: '#FDEDED',
            color: '#D32F2F',
            '& .MuiAlert-icon': {
              color: '#D32F2F',
            },
            '& .MuiAlert-message': {
              fontSize: '16px',
              fontFamily: 'Inter, sans-serif',
              wordBreak: 'break-word',
              overflowWrap: 'break-word',
              maxWidth: '100%',
            },
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            borderRadius: '12px',
            wordBreak: 'break-word',
            overflowWrap: 'break-word',
            boxSizing: 'border-box',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, wordBreak: 'break-word', overflowWrap: 'break-word', maxWidth: '100%', boxSizing: 'border-box' }}>
            <Box sx={{ fontWeight: 600, wordBreak: 'break-word', overflowWrap: 'break-word', maxWidth: '100%' }}>
              Поля не должны быть пустыми
            </Box>
            <Box sx={{ wordBreak: 'break-word', overflowWrap: 'break-word', maxWidth: '100%' }}>
              Пожалуйста, заполните все поля перед отправкой.
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
