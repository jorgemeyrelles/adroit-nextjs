/* eslint-disable @next/next/no-img-element */
import { Card, CardContent, Box, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'

import { useStyles } from './styles'

function generateCardsArray(length = 5) {
  return [...new Array(length)].map((_, index) => index)
}

export function ReportSummaryShimmer({ length = 5 }) {
  const styles = useStyles()

  const items = generateCardsArray(length)

  return (
    <>
      {items.map((item) => (
        <Card key={item}>
          <CardContent className={styles.cardContainer}>
            <img src="/assets/leaf_blue.png" alt="leaf blue" />

            <Box marginLeft="14px">
              <Skeleton width={100}>
                <Typography variant="h5">0</Typography>
              </Skeleton>

              <Skeleton width={60}>
                <Typography>Verde Anomalia</Typography>
              </Skeleton>
            </Box>
          </CardContent>
        </Card>
      ))}
    </>
  )
}
