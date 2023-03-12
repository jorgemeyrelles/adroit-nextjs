import { gql } from '@apollo/client'

export const GET_REPORT_SUMMARY = gql`
  query GetReportSummary($reportId: ID!, $startDate: String, $endDate: String) {
    summary: getReportCountFruits(
      report_id: $reportId
      start_date: $startDate
      end_date: $endDate
    ) {
      class {
        name
      }
      total
    }
  }
`

export const GET_REPORTS = gql`
  query {
    getReports {
      id
      name
      ages {
        name
      }
      farms {
        id
        name
      }
      blocks {
        id
        name
      }
      varieties {
        id
        name
      }
      spacings {
        name
      }
      graftVarieties {
        name
      }
    }
  }
`
