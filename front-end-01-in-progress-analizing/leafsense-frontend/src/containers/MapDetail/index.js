/* eslint-disable no-unused-vars */
import { useCallback, useState, useMemo, useContext, memo } from 'react'
import {
  GoogleMap,
  Polygon,
  HeatmapLayer,
  useLoadScript
} from '@react-google-maps/api'
import { CircularProgress } from '@material-ui/core'

import { MapContext } from '../../contexts/MapContext'

import { gradientsColors } from '../../utils/colors'

import { useStyles } from './styles'
import {
  calculateCentralGeoCoordinate,
  convertDataToGoogleMVCArray,
  calculateQuatile
} from '../../utils/format'

function MapComponent() {
  const styles = useStyles()

  const { isLoaded } = useLoadScript({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyAZDqBOFHsh1xyeXNH8EYtJDjdUs7tijYw',
    libraries: ['visualization']
  })

  const [map, setMap] = useState(null)

  const { loading, coordinates, countFruitsHeatmaps, heatmaps } =
    useContext(MapContext)

  const onLoad = useCallback((map) => {
    const bounds = new window.google.maps.LatLngBounds()
    map.fitBounds(bounds)

    setMap(map)
  }, [])

  const onUnmount = useCallback(() => {
    setMap(null)
  }, [])

  const center = useMemo(() => {
    if (coordinates.length === 0) {
      return {
        lng: -48.67460159319444,
        lat: -22.91949395764639
      }
    }

    const newCoordinates = coordinates
      .map((coordinate) =>
        coordinate.coords.map((coord) => ({
          latitude: coord.lat,
          longitude: coord.lng
        }))
      )
      .flat()

    return calculateCentralGeoCoordinate(newCoordinates)
  }, [coordinates])

  const polygons = useMemo(() => coordinates, [coordinates])

  const heatmap = useMemo(
    () =>
      heatmaps
        .concat(countFruitsHeatmaps)
        .filter((item) => item.data.length > 0)
        .filter((item) => item.selected)
        .map((item, index) => {
          const key = `${item.name}-${index}`
          const data = convertDataToGoogleMVCArray(item.data)
          const maxIntensity = calculateQuatile(
            item.data.map((item) => item.weight)
          )

          const filtersBlueRed = ['Replantio', 'Volumes', 'Anomalias Frutos']
          const filtersViridisLighter = ['Contagem', 'Cipó', 'Frutos no chão']

          let selectedGradient = null

          if (filtersBlueRed.includes(key)) {
            selectedGradient = gradientsColors.blueRed
          } else if (filtersViridisLighter.includes(key)) {
            selectedGradient = gradientsColors.viridisLighter
          }

          return {
            key,
            data,
            gradient: selectedGradient,
            maxIntensity
          }
        }),
    [heatmaps, countFruitsHeatmaps]
  )

  return (
    <div className={styles.container}>
      {(!isLoaded || loading) && (
        <div className={styles.loadingContainer}>
          <div className={styles.loadingContent}>
            <CircularProgress style={{ position: 'absolute' }} />
          </div>
        </div>
      )}

      {isLoaded && !loading && (
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%' }}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={{
            zoom: 16,
            center,
            mapTypeId: 'satellite',
            zoomControl: false,
            mapTypeControl: false,
            streetViewControl: false
          }}
        >
          {heatmap.map((layer) => (
            <HeatmapLayer
              key={layer.key}
              data={layer.data}
              options={{
                opacity: 0.95,
                radius: 0.00002,
                dissipating: false,
                gradient: layer.gradient,
                maxIntensity: layer.maxIntensity,
                maxIntensityMult: 2.0
              }}
            />
          ))}

          {polygons.map((paths) => (
            <Polygon
              key={paths.id}
              paths={paths.coords}
              options={{
                fillColor: '#fefefe',
                fillOpacity: 0.02,
                strokeColor: '#074096',
                strokeWeight: 3
              }}
            />
          ))}
        </GoogleMap>
      )}
    </div>
  )
}

export const MapDetail = memo(MapComponent)
