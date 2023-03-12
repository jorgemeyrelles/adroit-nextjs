import { format, subMonths, differenceInYears } from 'date-fns';

export function formatDate(date = new Date()) {
  return format(date, 'dd/MM/yyyy')
}

export function formatDifference(startDate = new Date(), endDate = new Date()) {
  return differenceInYears(endDate, startDate)
}

export function subtractMonths(date = new Date(), amount = 1) {
  return subMonths(date, amount)
}

export function removeDuplicateObjects(array) {
  return [...new Set(array.map((s) => JSON.stringify(s)))].map((s) =>
    JSON.parse(s)
  )
}

export function removeNullableObjects(array, key) {
  return array.filter((item) => item[key] !== null)
}

export function convertDataToGoogleMVCArray(coordinatesWithWeight = []) {
  return coordinatesWithWeight.map((coord) => {
    return {
      location: new window.google.maps.LatLng(coord.latitude, coord.longitude),
      weight: coord.weight
    }
  })
}

export function calculateCentralGeoCoordinate(
  coordinates = [],
  defaultCoordinates = [-46.683097, -23.581786]
) {
  if (coordinates.length === 0) {
    const [lng, lat] = defaultCoordinates
    return {
      lng,
      lat
    }
  }

  const rad2degr = (rad) => (rad * 180) / Math.PI
  const degr2rad = (degr) => (degr * Math.PI) / 180

  const newCoordinates = coordinates.filter(
    (coord) => coord.latitude !== 0 || coord.longitude !== 0
  )

  let sumX = 0
  let sumY = 0
  let sumZ = 0

  for (const newCoordinate of newCoordinates) {
    const latitude = degr2rad(newCoordinate.latitude)
    const longitude = degr2rad(newCoordinate.longitude)

    sumX += Math.cos(latitude) * Math.cos(longitude)
    sumY += Math.cos(latitude) * Math.sin(longitude)
    sumZ += Math.sin(latitude)
  }

  const avgX = sumX / newCoordinates.length
  const avgY = sumY / newCoordinates.length
  const avgZ = sumZ / newCoordinates.length

  const lng = Math.atan2(avgY, avgX)
  const hyp = Math.sqrt(avgX * avgX + avgY * avgY)
  const lat = Math.atan2(avgZ, hyp)

  return {
    lat: rad2degr(lat),
    lng: rad2degr(lng)
  }
}

export function calculateQuatile(data = [], percentile = 0.95) {
  const sortedData = data.sort((itemA, itemB) => itemA - itemB)
  const selectedIndex = percentile * (sortedData.length - 1)

  if (sortedData[Math.floor(selectedIndex) + 1] !== undefined) {
    return (
      sortedData[Math.floor(selectedIndex)] +
      (selectedIndex - Math.floor(selectedIndex)) *
        (sortedData[Math.floor(selectedIndex) + 1] -
          sortedData[Math.floor(selectedIndex)])
    )
  }

  return sortedData[selectedIndex]
}
