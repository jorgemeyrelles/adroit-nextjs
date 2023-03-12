import { createContext, useState } from 'react'
import { subDays } from 'date-fns'

import { AuthProvider } from './AuthContext'
import { ChartProvider } from './ChartContext'
import { MapProvider } from './MapContext'

export const AppContext = createContext({})

export function AppProvider({ children }) {
  const [createReportModalVisibility, setCreateReportModalVisibility] =
    useState(false)

  const [startDate, setStartDate] = useState(subDays(new Date(), 30))
  const [endDate, setEndDate] = useState(new Date())

  return (
    <AppContext.Provider
      value={{
        period: {
          endDate,
          startDate
        },
        setEndDate,
        setStartDate,
        createReportModalVisibility,
        setCreateReportModalVisibility
      }}
    >
      <AuthProvider>
        <ChartProvider>
          <MapProvider>{children}</MapProvider>
        </ChartProvider>
      </AuthProvider>
    </AppContext.Provider>
  )
}
