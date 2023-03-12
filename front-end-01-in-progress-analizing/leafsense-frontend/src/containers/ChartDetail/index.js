import { useContext, useMemo } from 'react'
import { parseISO } from 'date-fns'

import { Box, Typography } from '@material-ui/core'

import { formatDate } from '../../utils/format'

import { AppContext } from '../../contexts/AppContext'

import { useStyles } from './styles'

export function ChartDetail({ chartName, blockName, children, ...rest }) {
  const styles = useStyles()

  const { period } = useContext(AppContext)

  const { formatedStartDate, formatedEndDate } = useMemo(
    () => ({
      formatedStartDate: formatDate(
        parseISO(new Date(period.startDate).toISOString())
      ),
      formatedEndDate: formatDate(
        parseISO(new Date(period.endDate).toISOString())
      )
    }),
    [period]
  )

  return (
    <article className={styles.container} {...rest}>
      <header className={styles.header}>
        <Typography style={{ marginRight: 50 }} variant="h5">
          {chartName} <br /> Quadra: {blockName}
        </Typography>

        <Box>
          <Typography>De {formatedStartDate}</Typography>
          <Typography>Até {formatedEndDate}</Typography>
        </Box>
      </header>

      <footer>{children}</footer>
    </article>
  )
}
