import { useState, useMemo, useCallback } from 'react'
import { useRouter } from 'next/router'

import { Button, IconButton } from '@material-ui/core'
import { Edit, ArrowDropUp, ArrowDropDown } from '@material-ui/icons'

import styles from './styles.module.css'

export function ReportDropDown({ data }) {
  const router = useRouter()

  const [isDropdownVisible, setIsVisibleDropdown] = useState(false)

  const handleReportNavigation = useCallback(
    () => router.push(`/report/${data.id}`),
    [router, data.id]
  )

  const handleVisibilityToggle = useCallback((event) => {
    event.stopPropagation()

    setIsVisibleDropdown((prevState) => !prevState)
  }, [])

  const selectedReport = useMemo(
    () => data.id === router.query?.id,
    [router, data]
  )

  return (
    <div>
      <Button
        className={
          selectedReport
            ? styles.report_dropdown_active
            : styles.report_dropdown_inactive
        }
        style={{
          ...(!!isDropdownVisible && {
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0
          })
        }}
        variant="contained"
        onClick={handleReportNavigation}
      >
        {data.name}

        <IconButton
          className={
            selectedReport
              ? styles.report_dropdown_icon_active
              : styles.report_dropdown_icon_inactive
          }
          size="small"
          onClick={() => {}}
        >
          <Edit fontSize="small" />
        </IconButton>

        <IconButton
          className={
            selectedReport
              ? styles.report_dropdown_icon_active
              : styles.report_dropdown_icon_inactive
          }
          size="small"
          onClick={handleVisibilityToggle}
        >
          {isDropdownVisible ? (
            <ArrowDropUp fontSize="small" />
          ) : (
            <ArrowDropDown fontSize="small" />
          )}
        </IconButton>
      </Button>

      {isDropdownVisible && (
        <div
          className={
            selectedReport
              ? styles.report_dropdown_dropdown_active
              : styles.report_dropdown_dropdown_inactive
          }
        >
          <strong>Fazendas: </strong>
          <span>{data.farms}</span>
          <strong>Variedades: </strong>
          <span>{data.varieties}</span>
          <strong>Espaçamentos: </strong>
          <span>{data.spacings}</span>
          <strong>Idades: </strong>
          <span>{data.ages}</span>
          <strong>Enxertos: </strong>
          <span>{data.graftVarieties}</span>
          <strong>Quadras: </strong>
          <span>{data.blocks}</span>
        </div>
      )}
    </div>
  )
}
