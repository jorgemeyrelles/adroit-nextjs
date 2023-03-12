import { createContext, useState, useMemo, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'

import { useLazyQuery } from '@apollo/client'

import { AppContext } from './AppContext'

import {
  GET_MAP_VINES,
  GET_MAP_DRIES,
  GET_MAP_BLOCKS,
  GET_MAP_MISSINGS,
  GET_MAP_ANOMALIES,
  GET_MAP_REPLANTEDS,
  GET_MAP_ON_GROUNDS,
  GET_MAP_VOLUMETRIES,
  GET_MAP_LEAF_DENSITY,
  GET_MAP_FRUITS_COUNT
} from '../graphql/queries/maps'

export const MapContext = createContext({})

export function MapProvider({ children }) {
  const router = useRouter()

  const id = router.query?.id
  const { period } = useContext(AppContext)

  const [selectedFilters, setSelectedFilters] = useState([])

  const { startDate, endDate } = useMemo(() => {
    return {
      startDate: new Date(period.startDate).toISOString(),
      endDate: new Date(period.endDate).toISOString()
    }
  }, [period])

  const [getBlocksRequest, getBlocksResponse] = useLazyQuery(GET_MAP_BLOCKS, {
    variables: {
      reportId: String(id)
    }
  })

  const [getDryTreesRequest, getDryTreesResponse] = useLazyQuery(
    GET_MAP_DRIES,
    {
      variables: {
        reportId: String(id),
        startDate: startDate,
        endDate: endDate
      }
    }
  )

  const [getAnomaliesRequest, getAnomaliesResponse] = useLazyQuery(
    GET_MAP_ANOMALIES,
    {
      variables: {
        reportId: String(id),
        startDate: startDate,
        endDate: endDate
      }
    }
  )

  const [getVinesTreesRequest, getVinesTreesResponse] = useLazyQuery(
    GET_MAP_VINES,
    {
      variables: {
        reportId: String(id),
        startDate: startDate,
        endDate: endDate
      }
    }
  )

  const [getVolumetriesRequest, getVolumetriesResponse] = useLazyQuery(
    GET_MAP_VOLUMETRIES,
    {
      variables: {
        reportId: String(id),
        startDate: startDate,
        endDate: endDate
      }
    }
  )

  const [getFruitsCountRequest, getFruitsCountResponse] = useLazyQuery(
    GET_MAP_FRUITS_COUNT,
    {
      variables: {
        reportId: String(id),
        startDate: startDate,
        endDate: endDate
      }
    }
  )

  const [getLeafDensityRequest, getLeafDensityResponse] = useLazyQuery(
    GET_MAP_LEAF_DENSITY,
    {
      variables: {
        reportId: String(id),
        startDate: startDate,
        endDate: endDate
      }
    }
  )

  const [getMissingTreesRequest, getMissingTreesResponse] = useLazyQuery(
    GET_MAP_MISSINGS,
    {
      variables: {
        reportId: String(id),
        startDate: startDate,
        endDate: endDate
      }
    }
  )

  const [getReplantedTreesRequest, getReplantedTreesResponse] = useLazyQuery(
    GET_MAP_REPLANTEDS,
    {
      variables: {
        reportId: String(id),
        startDate: startDate,
        endDate: endDate
      }
    }
  )

  const [getFruitsOnTheGroundRequest, getFruitsOnTheGroundResponse] =
    useLazyQuery(GET_MAP_ON_GROUNDS, {
      variables: {
        reportId: String(id),
        startDate: startDate,
        endDate: endDate
      }
    })

  function selectHeatmap(name) {
    setSelectedFilters((filters) => {
      const filterExists = filters.find((item) => item.name === name)

      return filterExists
        ? filters.filter((item) => item.name !== name)
        : [...filters, { name, selected: true }]
    })
  }

  function clearHeatmaps() {
    setSelectedFilters([])
  }

  useEffect(() => {
    if (id) {
      getBlocksRequest()
      getDryTreesRequest()
      getAnomaliesRequest()
      getVinesTreesRequest()
      getVolumetriesRequest()
      getFruitsCountRequest()
      getLeafDensityRequest()
      getMissingTreesRequest()
      getReplantedTreesRequest()
      getFruitsOnTheGroundRequest()
    }
  }, [
    id,
    getBlocksRequest,
    getDryTreesRequest,
    getAnomaliesRequest,
    getVinesTreesRequest,
    getVolumetriesRequest,
    getFruitsCountRequest,
    getLeafDensityRequest,
    getMissingTreesRequest,
    getReplantedTreesRequest,
    getFruitsOnTheGroundRequest
  ])

  const data = useMemo(() => {
    const countFruits = (getFruitsCountResponse.data?.coords || [])
      .map((item) => ({ ...item, class: Number(item.class) }))
      .reduce((obj, item) => {
        if (item['class'] === undefined) return obj

        return Object.assign(obj, {
          [item['class']]: (obj[item['class']] || []).concat(item)
        })
      }, {})

    const countFruitsKeysData = [
      {
        id: 1,
        name: 'Fruta Madura'
      },
      {
        id: 2,
        name: 'Fruta Verde'
      },
      {
        id: 33,
        name: 'Madura Anomalia'
      },
      {
        id: 34,
        name: 'Verde Anomalia'
      },
      {
        id: 58,
        name: 'Fruta Semi Madura'
      }
    ].map((item) => ({
      ...item,
      loading: getFruitsCountResponse.loading,
      disabled: (countFruits[item.id] || []).every(
        (subItem) => subItem.latitude === 0 || subItem.longitude === 0
      ),
      data: countFruits[item.id] || []
    }))

    const filtersKeysWithData = [
      {
        name: 'Volumes',
        loading: getVolumetriesResponse.loading,
        data: getVolumetriesResponse.data?.coords || []
      },
      {
        name: 'Frutos no chão',
        loading: getFruitsOnTheGroundResponse.loading,
        data: getFruitsOnTheGroundResponse.data?.coords || []
      },
      {
        name: 'Árvores ausentes',
        loading: getMissingTreesResponse.loading,
        data: getMissingTreesResponse.data?.coords || []
      },
      {
        name: 'Replantio',
        loading: getReplantedTreesResponse.loading,
        data: getReplantedTreesResponse.data?.coords || []
      },
      {
        name: 'Cipó',
        loading: getVinesTreesResponse.loading,
        data: getVinesTreesResponse.data?.coords || []
      },
      {
        name: 'Anomalias Frutos',
        loading: getAnomaliesResponse.loading,
        data: getAnomaliesResponse.data?.coords || []
      },
      {
        name: 'Densidade foliar',
        loading: getLeafDensityResponse.loading,
        data: getLeafDensityResponse.data?.coords || []
      },
      {
        name: 'def. nutricional',
        loading: getDryTreesResponse.loading,
        data: getDryTreesResponse.data?.coords || []
      }
    ].map((item) => ({
      ...item,
      disabled: item.data.every(
        (subItem) => subItem.latitude === 0 || subItem.longitude === 0
      )
    }))

    const checkItemByProperty = (itemName, property) =>
      !!selectedFilters.find(
        (selectedItem) =>
          selectedItem.name === itemName && selectedItem[property]
      )

    const coordinates = (getBlocksResponse.data?.coords || []).map((item) => ({
      ...item,
      coords: item.coords.map((block) => {
        const [latitude, longitude] = block.split(',')

        return {
          lat: Number(latitude),
          lng: Number(longitude)
        }
      })
    }))

    return {
      loading: getBlocksResponse.loading,
      coordinates: coordinates,
      countFruitsHeatmaps: countFruitsKeysData.map((item) => ({
        name: item.name,
        loading: item.loading,
        selected: checkItemByProperty(item.name, 'selected'),
        disabled: item.disabled,
        data: item.data || []
      })),
      heatmaps: filtersKeysWithData.map((item) => ({
        name: item.name,
        loading: item.loading,
        selected: checkItemByProperty(item.name, 'selected'),
        disabled: item.disabled,
        data: item.data || []
      }))
    }
  }, [
    selectedFilters,
    getBlocksResponse,
    getDryTreesResponse,
    getAnomaliesResponse,
    getVinesTreesResponse,
    getVolumetriesResponse,
    getFruitsCountResponse,
    getLeafDensityResponse,
    getMissingTreesResponse,
    getReplantedTreesResponse,
    getFruitsOnTheGroundResponse
  ])

  return (
    <MapContext.Provider value={{ selectHeatmap, clearHeatmaps, ...data }}>
      {children}
    </MapContext.Provider>
  )
}
