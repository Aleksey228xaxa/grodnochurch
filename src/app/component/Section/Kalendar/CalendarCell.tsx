'use client';

import React, { useState, useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { EventClickArg } from '@fullcalendar/core';
import {
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  GlobalStyles,
} from '@mui/material';

interface CalendarEvent {
  title: string;
  date: string;
  format: boolean;
  language: boolean;
}

interface ExtendedProps {
  format: boolean;
  language: boolean;
}

interface Props {
  events: CalendarEvent[];
}

const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

// Стили для выпадающего меню Select
const menuProps = {
  PaperProps: {
    sx: {
      bgcolor: '#F8F1E9',
      border: '1px solid #BF9460',
      '& .MuiMenuItem-root': {
        color: '#000',
        '&:hover': {
          bgcolor: '#E5D7B8',
        },
      },
      '& .Mui-selected': {
        bgcolor: '#BF9460',
        color: '#FFF',
        '&:hover': {
          bgcolor: '#9C7C42',
        },
      },
    },
  },
};

export default function CalendarClient({ events }: Props) {
  const [selectedFormat, setSelectedFormat] = useState<'all' | boolean>('all');
  const [selectedLanguage, setSelectedLanguage] = useState<'all' | boolean>('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const calendarRef = useRef<FullCalendar>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<MutationObserver | null>(null);

  const filteredEvents = events.filter((event) => {
    const formatMatch = selectedFormat === 'all' || event.format === selectedFormat;
    const languageMatch = selectedLanguage === 'all' || event.language === selectedLanguage;
    return formatMatch && languageMatch;
  });

  const handleEventClick = (clickInfo: EventClickArg) => {
    const { title, startStr, extendedProps } = clickInfo.event;
    const { format, language } = extendedProps as ExtendedProps;

    setSelectedEvent({
      title,
      date: startStr,
      format,
      language,
    });

    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    setSelectedEvent(null);
  };

  useEffect(() => {
    const calendarEl = wrapperRef.current;
  
    if (!calendarEl) return;

    const fixButtons = () => {
      const todayBtn = calendarEl.querySelector('.fc-today-button') as HTMLElement | null;
      if (todayBtn) {
        if (todayBtn.textContent !== 'сегодня') {
          todayBtn.textContent = 'сегодня';
        }
        todayBtn.style.backgroundColor = '#BF9460';
        todayBtn.style.color = '#fff';
        todayBtn.style.border = 'none';
        todayBtn.style.borderRadius = '4px';
        todayBtn.style.padding = '4px 10px';
        todayBtn.style.cursor = 'pointer';
        todayBtn.onmouseover = () => {
          todayBtn.style.backgroundColor = '#9C7C42';
        };
        todayBtn.onmouseout = () => {
          todayBtn.style.backgroundColor = '#BF9460';
        };

        if (!observerRef.current) {
          observerRef.current = new MutationObserver(() => {
            if (todayBtn.textContent !== 'сегодня') {
              todayBtn.textContent = 'сегодня';
            }
          });
          observerRef.current.observe(todayBtn, {
            characterData: true,
            childList: true,
            subtree: true,
          });
        }
      }

      const navButtons = calendarEl.querySelectorAll('.fc-prev-button, .fc-next-button');
      navButtons.forEach((btn) => {
        const button = btn as HTMLElement;
        button.style.backgroundColor = '#BF9460';
        button.style.color = '#fff';
        button.style.border = 'none';
        button.style.borderRadius = '4px';
        button.style.padding = '4px 10px';
        button.style.cursor = 'pointer';
        button.onmouseover = () => {
          button.style.backgroundColor = '#9C7C42';
        };
        button.onmouseout = () => {
          button.style.backgroundColor = '#BF9460';
        };
      });
    };

    fixButtons();

    const intervalId = setInterval(() => {
      fixButtons();
    }, 1000);

    return () => {
      clearInterval(intervalId);
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, []);

  return (
    <Box sx={{ maxWidth: '1400px' }}>
      <GlobalStyles
        styles={{
          '.fc': {
            '--fc-border-color': '#BF9460',
            '--fc-now-indicator-color': '#000',
            '--fc-daygrid-event-dot-width': '0px',
          },
          '.fc .fc-scrollgrid, .fc .fc-scrollgrid td, .fc .fc-scrollgrid th': {
            borderColor: '#BF9460',
          },
          '.fc-theme-standard td, .fc-theme-standard th': {
            borderColor: '#BF9460',
          },
          '.fc-col-header-cell-cushion': {
            color: '#BF9460',
            fontWeight: 'bold',
          },
          '.fc-daygrid-day-frame': {
            maxHeight: '100px',
            overflowY: 'auto',
          },
          '.fc-daygrid-event': {
            whiteSpace: 'nowrap',
          },
        }}
      />

      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <FormControl>
          <InputLabel
            shrink
            sx={{
              color: '#000',
              fontWeight: 'bold',
              '&.Mui-focused': {
                color: '#BF9460',
              },
            }}
          >
            Формат
          </InputLabel>
          <Select
            value={selectedFormat}
            label="Формат"
            onChange={(e) =>
              setSelectedFormat(e.target.value === 'all' ? 'all' : e.target.value === 'true')
            }
            MenuProps={menuProps}
            sx={{
              minWidth: 120,
              backgroundColor: '#F8F1E9',
              border: '1px solid #BF9460',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#BF9460',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#BF9460',
              },
            }}
          >
            <MenuItem value="all">Все</MenuItem>
            <MenuItem value="true">Онлайн</MenuItem>
            <MenuItem value="false">Офлайн</MenuItem>
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel
            shrink
            sx={{
              color: '#000',
              fontWeight: 'bold',
              '&.Mui-focused': {
                color: '#BF9460',
              },
            }}
          >
            Язык
          </InputLabel>
          <Select
            value={selectedLanguage}
            label="Язык"
            onChange={(e) =>
              setSelectedLanguage(e.target.value === 'all' ? 'all' : e.target.value === 'true')
            }
            MenuProps={menuProps}
            sx={{
              minWidth: 120,
              backgroundColor: '#F8F1E9',
              border: '1px solid #BF9460',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#BF9460',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#BF9460',
              },
            }}
          >
            <MenuItem value="all">Все</MenuItem>
            <MenuItem value="true">Русский</MenuItem>
            <MenuItem value="false">English</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <div ref={wrapperRef}>
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin]}
          initialView="dayGridMonth"
          events={filteredEvents}
          height="auto"
          firstDay={1}
          fixedWeekCount={false}
          eventTimeFormat={{
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          }}
          eventContent={(eventInfo) => (
            <Box
              sx={{
                display: 'inline-block',
                maxWidth: '90%',
                padding: '2px 6px',
                backgroundColor: '#F8F1E9',
                border: '1px solid #BF9460',
                borderRadius: 1,
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                marginLeft: '4px',
                fontWeight: 'bold',
                fontSize: 12,
                color: '#000',
                cursor: 'pointer',
              }}
              title={`${eventInfo.event.title} ${formatTime(eventInfo.event.startStr)}`}
            >
              {eventInfo.event.title}
            </Box>
          )}
          eventClick={handleEventClick}
        />
      </div>
      <Dialog open={modalOpen} onClose={handleClose}>
        <DialogTitle sx={{ color: '#BF9460' }}>Информация о событии</DialogTitle>
        <DialogContent>
          {selectedEvent && (
            <>
              <Typography>
                <strong style={{ color: '#BF9460' }}>Название:</strong> {selectedEvent.title}
              </Typography>
              <Typography>
                <strong style={{ color: '#BF9460' }}>Дата:</strong> {formatTime(selectedEvent.date)}
              </Typography>
              <Typography>
                <strong style={{ color: '#BF9460' }}>Формат:</strong>{' '}
                {selectedEvent.format ? 'Онлайн' : 'Офлайн'}
              </Typography>
              <Typography>
                <strong style={{ color: '#BF9460' }}>Язык:</strong>{' '}
                {selectedEvent.language ? 'Русский' : 'English'}
              </Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ color: '#BF9460' }}>
            Закрыть
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
