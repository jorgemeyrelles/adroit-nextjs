import { createContext, useMemo, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'

import { useLazyQuery } from '@apollo/client'

import { AppContext } from './AppContext'

import {
  GET_CHART_ANOMALIES,
  GET_CHART_DIAMETERS,
  GET_CHART_FLOWERS,
  GET_CHART_FRUITS,
  GET_CHART_HEIGHTS,
  GET_CHART_MISSINGS,
  GET_CHART_ON_GROUND,
  GET_CHART_REPLANTEDS,
  GET_CHART_RIPENINGS,
  GET_CHART_VOLUMETRIES
} from '../graphql/queries/charts'

export const ChartContext = createContext({})

export function ChartProvider({ children }) {
  const router = useRouter()

  const id = router.query?.id
  const { period } = useContext(AppContext)

  const { startDate, endDate } = useMemo(
    () => ({
      startDate: new Date(period.startDate).toISOString(),
      endDate: new Date(period.endDate).toISOString()
    }),
    [period]
  )

  const [getChartFruitsRequest, getChartFruitsResponse] = useLazyQuery(
    GET_CHART_FRUITS,
    {
      variables: {
        reportId: String(id),
        startDate: startDate,
        endDate: endDate
      }
    }
  )

  const [getChartRipeningsRequest, getChartRipeningsResponse] = useLazyQuery(
    GET_CHART_RIPENINGS,
    {
      variables: {
        reportId: String(id),
        startDate: startDate,
        endDate: endDate
      }
    }
  )

  const [getChartDiametersRequest, getChartDiametersResponse] = useLazyQuery(
    GET_CHART_DIAMETERS,
    {
      variables: {
        reportId: String(id),
        startDate: startDate,
        endDate: endDate
      }
    }
  )

  const [getChartHeightsRequest, getChartHeightsResponse] = useLazyQuery(
    GET_CHART_HEIGHTS,
    {
      variables: {
        reportId: String(id),
        startDate: startDate,
        endDate: endDate
      }
    }
  )

  const [getChartOnGroundRequest, getChartOnGroundResponse] = useLazyQuery(
    GET_CHART_ON_GROUND,
    {
      variables: {
        reportId: String(id),
        startDate: startDate,
        endDate: endDate
      }
    }
  )

  const [getChartMissingsRequest, getChartMissingsResponse] = useLazyQuery(
    GET_CHART_MISSINGS,
    {
      variables: {
        reportId: String(id),
        startDate: startDate,
        endDate: endDate
      }
    }
  )

  const [getChartFlowersRequest, getChartFlowersResponse] = useLazyQuery(
    GET_CHART_FLOWERS,
    {
      variables: {
        reportId: String(id),
        startDate: startDate,
        endDate: endDate
      }
    }
  )

  const [getChartReplantedsRequest, getChartReplantedsResponse] = useLazyQuery(
    GET_CHART_REPLANTEDS,
    {
      variables: {
        reportId: String(id),
        startDate: startDate,
        endDate: endDate
      }
    }
  )

  const [getChartAnomaliesRequest, getChartAnomaliesResponse] = useLazyQuery(
    GET_CHART_ANOMALIES,
    {
      variables: {
        reportId: String(id),
        startDate: startDate,
        endDate: endDate
      }
    }
  )

  const [getChartVolumetriesRequest, getChartVolumetriesResponse] =
    useLazyQuery(GET_CHART_VOLUMETRIES, {
      variables: {
        reportId: String(id),
        startDate: startDate,
        endDate: endDate
      }
    })

  useEffect(() => {
    if (id) {
      getChartFruitsRequest()
      getChartRipeningsRequest()
      getChartDiametersRequest()
      getChartHeightsRequest()
      getChartOnGroundRequest()
      getChartMissingsRequest()
      getChartFlowersRequest()
      getChartReplantedsRequest()
      getChartAnomaliesRequest()
      getChartVolumetriesRequest()
    }
  }, [
    id,
    getChartFruitsRequest,
    getChartRipeningsRequest,
    getChartDiametersRequest,
    getChartHeightsRequest,
    getChartOnGroundRequest,
    getChartMissingsRequest,
    getChartFlowersRequest,
    getChartReplantedsRequest,
    getChartAnomaliesRequest,
    getChartVolumetriesRequest
  ])

  const data = useMemo(() => {
    const responses = {
      2: {
        loading: getChartFruitsResponse.loading,
        data: getChartFruitsResponse.data?.chart || []
      },
      3: {
        loading: getChartRipeningsResponse.loading,
        data: getChartRipeningsResponse.data?.chart || []
      },
      4: {
        loading: getChartDiametersResponse.loading,
        data: getChartDiametersResponse.data?.chart || []
      },
      5: {
        loading: getChartHeightsResponse.loading,
        data: getChartHeightsResponse.data?.chart || []
      },
      6: {
        loading: getChartOnGroundResponse.loading,
        data: getChartOnGroundResponse.data?.chart || []
      },
      7: {
        loading: getChartMissingsResponse.loading,
        data: getChartMissingsResponse.data?.chart || []
      },
      8: {
        loading: getChartFlowersResponse.loading,
        data: getChartFlowersResponse.data?.chart || []
      },
      9: {
        loading: getChartReplantedsResponse.loading,
        data: getChartReplantedsResponse.data?.chart || []
      },
      10: {
        loading: getChartAnomaliesResponse.loading,
        data: getChartAnomaliesResponse.data?.chart || []
      },
      11: {
        loading: getChartVolumetriesResponse.loading,
        data: getChartVolumetriesResponse.data?.chart || []
      }
    }

    return responses
  }, [
    getChartFruitsResponse,
    getChartRipeningsResponse,
    getChartDiametersResponse,
    getChartHeightsResponse,
    getChartOnGroundResponse,
    getChartMissingsResponse,
    getChartFlowersResponse,
    getChartReplantedsResponse,
    getChartAnomaliesResponse,
    getChartVolumetriesResponse
  ])

  return (
    <ChartContext.Provider value={{ data }}>{children}</ChartContext.Provider>
  )
}
