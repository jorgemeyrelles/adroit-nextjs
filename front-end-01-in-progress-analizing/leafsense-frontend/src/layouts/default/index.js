import { useContext } from 'react'

import { Container, FormControl } from '@material-ui/core'
import { DatePicker } from '@material-ui/pickers'

import { AppContext } from '../../contexts/AppContext'

import { Header } from '../../components/Header'
import { NavBar } from '../../components/NavBar'

import { ReportModal } from '../../containers/ReportModal'

import styles from './styles.module.css'

export function DefaultLayout({ children }) {
  const { period, setStartDate, setEndDate } = useContext(AppContext)

  return (
    <main className={styles.container}>
      <Header />

      <ReportModal />

      <Container>
        <header className={styles.container_header}>
          <h3>Você está vendo:</h3>

          <div className={styles.container_period}>
            <FormControl style={{ maxWidth: 250 }} variant="outlined">
              <DatePicker
                disableFuture
                disableToolbar
                format="dd/MM/yyyy"
                inputVariant="outlined"
                label="Data inicial"
                maxDate={period.endDate}
                value={period.startDate}
                onChange={setStartDate}
              />
            </FormControl>

            <FormControl
              style={{ maxWidth: 250, marginLeft: 16 }}
              variant="outlined"
            >
              <DatePicker
                disableFuture
                disableToolbar
                format="dd/MM/yyyy"
                inputVariant="outlined"
                label="Data final"
                minDate={period.startDate}
                value={period.endDate}
                onChange={setEndDate}
              />
            </FormControl>
          </div>
        </header>

        <NavBar />

        {children}
      </Container>
    </main>
  )
}
