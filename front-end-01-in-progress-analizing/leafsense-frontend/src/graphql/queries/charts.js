import { gql } from '@apollo/client'

export const GET_CHART_FRUITS = gql`
  query getFruits($reportId: ID!, $startDate: String, $endDate: String) {
    chart: getReportFruits(
      report_id: $reportId
      start_date: $startDate
      end_date: $endDate
    ) {
      block
      data {
        name
        total
        percent
      }
    }
  }
`

export const GET_CHART_RIPENINGS = gql`
  query getRipenings($reportId: ID!, $startDate: String, $endDate: String) {
    chart: getReportFruitsRipening(
      report_id: $reportId
      start_date: $startDate
      end_date: $endDate
    ) {
      block
      data {
        labels
        datasets {
          label
          data
        }
      }
    }
  }
`

export const GET_CHART_DIAMETERS = gql`
  query getDiameters($reportId: ID!, $startDate: String, $endDate: String) {
    chart: getReportDiameters(
      report_id: $reportId
      start_date: $startDate
      end_date: $endDate
    ) {
      block
      data {
        labels
        datasets {
          label
          data
        }
      }
    }
  }
`

export const GET_CHART_HEIGHTS = gql`
  query getHeightTrees($reportId: ID!, $startDate: String, $endDate: String) {
    chart: getReportHeightTrees(
      report_id: $reportId
      start_date: $startDate
      end_date: $endDate
    ) {
      block
      data {
        labels
        datasets {
          label
          data
        }
      }
    }
  }
`

export const GET_CHART_ON_GROUND = gql`
  query getOnGround($reportId: ID!, $startDate: String, $endDate: String) {
    chart: getReportFruitsOnGround(
      report_id: $reportId
      start_date: $startDate
      end_date: $endDate
    ) {
      block
      data {
        labels
        datasets {
          label
          data
        }
      }
    }
  }
`

export const GET_CHART_MISSINGS = gql`
  query getMissingTrees($reportId: ID!, $startDate: String, $endDate: String) {
    chart: getReportMissingTrees(
      report_id: $reportId
      start_date: $startDate
      end_date: $endDate
    ) {
      block
      data {
        labels
        datasets {
          label
          data
        }
      }
    }
  }
`

export const GET_CHART_FLOWERS = gql`
  query getFlowers($reportId: ID!, $startDate: String, $endDate: String) {
    chart: getReportFlowers(
      report_id: $reportId
      start_date: $startDate
      end_date: $endDate
    ) {
      block
      data {
        labels
        datasets {
          label
          data
        }
      }
    }
  }
`

export const GET_CHART_REPLANTEDS = gql`
  query getReplanteds($reportId: ID!, $startDate: String, $endDate: String) {
    chart: getReportReplantedTrees(
      report_id: $reportId
      start_date: $startDate
      end_date: $endDate
    ) {
      block
      data {
        labels
        datasets {
          label
          data
        }
      }
    }
  }
`

export const GET_CHART_ANOMALIES = gql`
  query getAnomalies($reportId: ID!, $startDate: String, $endDate: String) {
    chart: getReportAnomalies(
      report_id: $reportId
      start_date: $startDate
      end_date: $endDate
    ) {
      block
      data {
        labels
        datasets {
          label
          data
        }
      }
    }
  }
`

export const GET_CHART_VOLUMETRIES = gql`
  query getVolumetries($reportId: ID!, $startDate: String, $endDate: String) {
    chart: getReportVolumetries(
      report_id: $reportId
      start_date: $startDate
      end_date: $endDate
    ) {
      block
      data {
        labels
        datasets {
          label
          data
        }
      }
    }
  }
`
