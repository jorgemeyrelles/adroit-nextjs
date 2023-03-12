import { useState, useContext } from 'react';

import { Button, Divider } from '@mui/material';
import { Add } from '@mui/icons-material';

// import { AppContext } from '../../contexts/AppContext'
// import { ReportDropDown } from './ReportDropDown';

import styles from './styles.module.css';
import { StateGlobal } from '../../context/StateGlobal';

export function NavBar() {
  // const [limitReports, setLimitReports] = useState(3)

  const { setCreateReportModalVisibility } = useContext(StateGlobal);
  
  // const reports = useMemo(
  //   () =>
  //     data && data.getReports
  //       ? data.getReports.map((report) => ({
  //           id: report.id,
  //           name: report.name,
  //           ages: report.ages
  //             ? report.ages.map((item) => item.name).join(',')
  //             : 'Nenhuma',
  //           farms: report.farms
  //             ? report.farms.map((item) => item.name).join(',')
  //             : 'Nenhuma',
  //           blocks: report.blocks
  //             ? report.blocks.map((item) => item.name).join(',')
  //             : 'Nenhum',
  //           spacings: report.spacings
  //             ? report.spacings.map((item) => item.name).join(',')
  //             : 'Nenhum',
  //           varieties: report.varieties
  //             ? report.varieties.map((item) => item.name).join(',')
  //             : 'Nenhuma',
  //           graftVarieties: report.graftVarieties
  //             ? report.graftVarieties.map((item) => item.name).join(',')
  //             : 'Nenhum'
  //         }))
  //       : [],
  //   [data]
  // )

  // function handleShowAllReports() {
  //   setLimitReports(1000)
  // }

  return (
    <>
      <div className={styles.navbar}>
        {/* {!loading && (
          <div
            className={
              reports.length > 3
                ? styles.navbar_content
                : styles.navbar_nocontent
            }
          >
            {reports.slice(0, limitReports).map((report) => (
              <ReportDropDown
                key={`report-dropdown-${report.id}`}
                data={report}
              />
            ))}

            {reports.length > 3 && limitReports === 3 && (
              <Button
                className={styles.navbar_show_reports}
                variant="contained"
                onClick={handleShowAllReports}
              >
                Ver mais
              </Button>
            )}
          </div>
        )} */}
        <Button
          color="primary"
          variant="contained"
          className={styles.navbar_create_report}
          endIcon={<Add fontSize="large" />}
          onClick={() => setCreateReportModalVisibility(true)}
        >
          Criar novo
        </Button>
      </div>

      <Divider className={styles.navbar_divider} />
    </>
  )
}
