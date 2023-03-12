import React, { useContext } from 'react';

import { Container, FormControl, TextField } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Header } from '../../components/Header';

import { ReportModal } from '../../containers/ReportModal';

import styles from './styles.module.css';
import { StateGlobal } from '../../context/StateGlobal'
import { DateRangePicker, LocalizationProvider } from '@mui/lab';
import { Box } from '@mui/system';
import { NavBar } from '../../components/NavBar';

export function DefaultLayout({ children }) {
  const { period, setStartDate } = useContext(StateGlobal);

  return (
    <main className={styles.container}>
      <Header />

      <ReportModal />

      <Container>
        <header className={styles.container_header}>
          <h3>Você está vendo:</h3>

          <div className={styles.container_period}>
            <FormControl
              style={{ maxWidth: '350px' }}
              variant="outlined"
            >
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateRangePicker
                  calendars={2}
                  startText="De"
                  endText="Até"
                  value={period.startDate}
                  onChange={(newValue) => {
                    setStartDate(newValue);
                  }}
                  renderInput={(startProps, endProps) => (
                    <React.Fragment>
                      <TextField {...startProps} />
                      <Box sx={{ mx: 2 }}> {' '} </Box>
                      <TextField {...endProps} />
                    </React.Fragment>
                  )}
                />
              </LocalizationProvider>
            </FormControl>
          </div>
        </header>

        <NavBar />

        {children}
      </Container>
    </main>
  )
}
