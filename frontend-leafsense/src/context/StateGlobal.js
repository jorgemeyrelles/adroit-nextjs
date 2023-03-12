import React, { createContext, useState } from 'react';
import { CookiesProvider } from 'react-cookie';
import { subDays } from 'date-fns';
import PropTypes from 'prop-types';
import { AuthProvider } from './AuthContext';
// import { ChartProvider } from './ChartContext'
// import { MapProvider } from './MapContext'

export const StateGlobal = createContext();

export function StateProvider({ children }) {
  const [createReportModalVisibility, setCreateReportModalVisibility] = useState(false);

  const [startDate, setStartDate] = useState([subDays(new Date(), 30), null]);
  const [endDate, setEndDate] = useState(new Date());


  const value = {
    period: {
      endDate,
      startDate
    },
    setEndDate,
    setStartDate,
    createReportModalVisibility,
    setCreateReportModalVisibility,
  };

  return (
    <StateGlobal.Provider value={ value }>
      <CookiesProvider>
        <AuthProvider>
          { children }
        </AuthProvider>
      </CookiesProvider>
    </StateGlobal.Provider>
  );
}

StateProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;
