import { gql } from '@apollo/client'

export const GET_MAP_BLOCKS = gql`
  query getBlocks($reportId: ID!) {
    coords: getBlocksCoordinates(report_id: $reportId) {
      id
      coords
    }
  }
`

export const GET_MAP_ANOMALIES = gql`
  query getAnomalies($reportId: ID!, $startDate: String, $endDate: String) {
    coords: getAnomaliesCoordinates(
      report_id: $reportId
      start_date: $startDate
      end_date: $endDate
    ) {
      weight
      latitude
      longitude
    }
  }
`

export const GET_MAP_LEAF_DENSITY = gql`
  query getLeafDensity($reportId: ID!, $startDate: String, $endDate: String) {
    coords: getAnomaliesCoordinates(
      report_id: $reportId
      start_date: $startDate
      end_date: $endDate
    ) {
      weight
      latitude
      longitude
    }
  }
`

export const GET_MAP_VOLUMETRIES = gql`
  query getVolumetries($reportId: ID!, $startDate: String, $endDate: String) {
    coords: getVolumetriesCoordinates(
      report_id: $reportId
      start_date: $startDate
      end_date: $endDate
    ) {
      weight
      latitude
      longitude
    }
  }
`

export const GET_MAP_FRUITS_COUNT = gql`
  query getFruitsCount($reportId: ID!, $startDate: String, $endDate: String) {
    coords: getFruitsCountCoordinates(
      report_id: $reportId
      start_date: $startDate
      end_date: $endDate
    ) {
      class
      weight
      latitude
      longitude
    }
  }
`

export const GET_MAP_REPLANTEDS = gql`
  query getReplanteds($reportId: ID!, $startDate: String, $endDate: String) {
    coords: getReplantedTreesCoordinates(
      report_id: $reportId
      start_date: $startDate
      end_date: $endDate
    ) {
      weight
      latitude
      longitude
    }
  }
`

export const GET_MAP_ON_GROUNDS = gql`
  query getOnGrounds($reportId: ID!, $startDate: String, $endDate: String) {
    coords: getFruitsOnTheGroundCoordinates(
      report_id: $reportId
      start_date: $startDate
      end_date: $endDate
    ) {
      weight
      latitude
      longitude
    }
  }
`

export const GET_MAP_MISSINGS = gql`
  query getMissings($reportId: ID!, $startDate: String, $endDate: String) {
    getMissingTreesCoordinates(
      report_id: $reportId
      start_date: $startDate
      end_date: $endDate
    ) {
      weight
      latitude
      longitude
    }
  }
`

export const GET_MAP_VINES = gql`
  query getVines($reportId: ID!, $startDate: String, $endDate: String) {
    getVinesTreesCoordinates(
      report_id: $reportId
      start_date: $startDate
      end_date: $endDate
    ) {
      weight
      latitude
      longitude
    }
  }
`

export const GET_MAP_DRIES = gql`
  query getDries($reportId: ID!, $startDate: String, $endDate: String) {
    getDryTreesCoordinates(
      report_id: $reportId
      start_date: $startDate
      end_date: $endDate
    ) {
      weight
      latitude
      longitude
    }
  }
`
