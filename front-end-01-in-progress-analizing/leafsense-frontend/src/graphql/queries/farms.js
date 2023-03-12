import { gql } from '@apollo/client'

export const GET_FARMS = gql`
  query {
    getFarms {
      id
      name
    }
  }
`

export const GET_BLOCKS_FROM_FARMS_IDS = gql`
  query GetBlocksFromFarmsIds(
    $farmsIds: [ID!]
    $varietiesIds: [ID!]
    $spacingsIds: [ID!]
    $graftsIds: [ID!]
    $blocksIds: [ID!]
  ) {
    getBlocksFromFarmsIds(
      farmsIds: $farmsIds
      varietiesIds: $varietiesIds
      spacingsIds: $spacingsIds
      graftsIds: $graftsIds
      blocksIds: $blocksIds
    ) {
      id
      block {
        id
        name
      }
      variety {
        id
        name
      }
      graft {
        id
        name
      }
      spacing
      visit_date
      plating_date
    }
  }
`
