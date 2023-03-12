/* eslint-disable @next/next/no-img-element */
import { useContext, useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'

import { useLazyQuery } from '@apollo/client'

import { Card, CardContent, Box, Typography } from '@material-ui/core'
import { ReportSummaryShimmer } from './ReportSummaryShimmer'

import { AppContext } from '../../contexts/AppContext'

import { GET_REPORT_SUMMARY } from '../../graphql/queries/reports'

import { useStyles } from './styles'

export function ReportSummary() {
  const router = useRouter()
  const styles = useStyles()

  const id = router.query?.id

  const { period } = useContext(AppContext)

  const { startDate, endDate } = useMemo(() => {
    return {
      startDate: new Date(period.startDate).toISOString(),
      endDate: new Date(period.endDate).toISOString()
    }
  }, [period])

  const [getSummaryRequest, getSummaryResponse] = useLazyQuery(
    GET_REPORT_SUMMARY,
    {
      variables: {
        reportId: String(id),
        startDate: startDate,
        endDate: endDate
      }
    }
  )

  useEffect(() => {
    if (id) {
      getSummaryRequest()
    }
  }, [id, getSummaryRequest])

  const { loading, data } = useMemo(() => {
    const { loading, data } = getSummaryResponse

    const cards = [
      'Fruta Madura',
      'Fruta Verde',
      'Madura Anomalia',
      'Verde Anomalia',
      'Fruta Semi Madura'
    ]

    if (!data || !data?.summary) {
      return {
        loading: false,
        data: cards.map((card) => ({ name: card, total: 0 }))
      }
    }

    return {
      loading,
      data: data?.summary.map((card) => ({
        name: card.class.name,
        total: new Intl.NumberFormat('pt-BR').format(card.total)
      }))
    }
  }, [getSummaryResponse])

  return (
    <section
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: 16,

        width: '100%'
      }}
    >
      {loading ? (
        <ReportSummaryShimmer />
      ) : (
        <>
          {data.map((card) => (
            <Card key={card.name}>
              <CardContent className={styles.cardContainer}>
                <img src="/assets/leaf_blue.png" alt="leaf blue" />

                <Box marginLeft="14px">
                  <Typography variant="h5">{card.total}</Typography>
                  <Typography>{card.name}</Typography>
                </Box>
              </CardContent>
            </Card>
          ))}
        </>
      )}
    </section>
  )
}
