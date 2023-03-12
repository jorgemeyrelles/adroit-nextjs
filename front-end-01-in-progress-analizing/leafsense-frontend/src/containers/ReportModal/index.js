import { useMemo, useState, useEffect, useContext } from 'react'
import { useQuery, useMutation } from '@apollo/client'

import { parseISO } from 'date-fns'

import {
  Box,
  Chip,
  Select,
  Typography,
  TextField,
  FormControl,
  InputLabel
} from '@material-ui/core'
import { Cancel } from '@material-ui/icons'

import { AppContext } from '../../contexts/AppContext'

import { Autocomplete } from '../../components/Form/Autocomplete'
import { Modal } from '../../components/Modal'

import { removeDuplicateObjects, formatDifference } from '../../utils/format'

import {
  GET_FARMS,
  GET_BLOCKS_FROM_FARMS_IDS
} from '../../graphql/queries/farms'
import { GET_REPORTS } from '../../graphql/queries/reports'
import { CREATE_REPORT } from '../../graphql/mutations/reports'

import { useStyles } from './styles'

export function ReportModal() {
  const styles = useStyles()

  const [name, setName] = useState('')
  const [selectedReport, setSelectedReport] = useState('')

  const [selectedFarms, setSelectedFarms] = useState([])
  const [selectedAgesFarms, setSelectedAgesFarms] = useState([])
  const [selectedBlocksFarms, setSelectedBlocksFarms] = useState([])
  const [selectedSpacingsFarms, setSelectedSpacingsFarms] = useState([])
  const [selectedVarietiesFarms, setSelectedVarietiesFarms] = useState([])
  const [selectedGraftsFarms, setSelectedGraftsFarms] = useState([])

  const { data: farmsData } = useQuery(GET_FARMS)
  const { data: reportsData } = useQuery(GET_REPORTS)
  const { data: blocksFarmsData, loading: blocksFarmsLoading } = useQuery(
    GET_BLOCKS_FROM_FARMS_IDS,
    {
      variables: {
        farmsIds: selectedFarms ? selectedFarms.map((item) => item.id) : [],
        blocksIds: selectedBlocksFarms
          ? selectedBlocksFarms.map((item) => item.id)
          : [],
        graftsIds: selectedGraftsFarms
          ? selectedGraftsFarms.map((item) => item.id)
          : [],
        spacingsIds: selectedSpacingsFarms
          ? selectedSpacingsFarms.map((item) => item.id)
          : [],
        varietiesIds: selectedVarietiesFarms
          ? selectedVarietiesFarms.map((item) => item.id)
          : []
      }
    }
  )

  const [createReport] = useMutation(CREATE_REPORT, {
    refetchQueries: [{ query: GET_REPORTS }]
  })

  const { createReportModalVisibility, setCreateReportModalVisibility } =
    useContext(AppContext)

  const farms = useMemo(() => {
    return farmsData && farmsData.getFarms
      ? farmsData.getFarms.map((farm) => ({
          id: farm.id,
          name: farm.name
        }))
      : []
  }, [farmsData])

  const reports = useMemo(() => {
    return reportsData && reportsData.getReports ? reportsData.getReports : []
  }, [reportsData])

  const varieties = useMemo(() => {
    const getBlocksFromFarmsIds = blocksFarmsData?.getBlocksFromFarmsIds || []

    if (!getBlocksFromFarmsIds) {
      return []
    }

    const varietiesFromFarms = getBlocksFromFarmsIds
      .filter(
        (block) => block.variety.id !== null || block.variety.name !== null
      )
      .map((block) => block.variety)

    return removeDuplicateObjects(varietiesFromFarms)
  }, [blocksFarmsData])

  const spacings = useMemo(() => {
    const getBlocksFromFarmsIds = blocksFarmsData?.getBlocksFromFarmsIds || []

    if (!getBlocksFromFarmsIds) {
      return []
    }

    const spacingsFromVarieties = getBlocksFromFarmsIds
      .filter((block) => block.spacing !== null)
      .map((block) => ({
        id: String(block.spacing),
        name: String(block.spacing) + 'm'
      }))

    return removeDuplicateObjects(spacingsFromVarieties)
  }, [blocksFarmsData])

  const ages = useMemo(() => {
    const getBlocksFromFarmsIds = blocksFarmsData?.getBlocksFromFarmsIds || []

    if (!getBlocksFromFarmsIds) {
      return []
    }

    const agesFromSpacings = getBlocksFromFarmsIds
      .filter((block) => block.plating_date !== null)
      .map((block) => {
        const difference = formatDifference(
          parseISO(block.plating_date),
          parseISO(block.visit_date)
        )

        return {
          id: String(difference),
          name: String(difference) + ' anos'
        }
      })

    return removeDuplicateObjects(agesFromSpacings)
  }, [blocksFarmsData])

  const grafts = useMemo(() => {
    const getBlocksFromFarmsIds = blocksFarmsData?.getBlocksFromFarmsIds || []

    if (!getBlocksFromFarmsIds) {
      return []
    }

    const graftsFromAges = getBlocksFromFarmsIds
      .filter((block) => block.graft !== null)
      .map((block) => block.graft)

    return removeDuplicateObjects(graftsFromAges)
  }, [blocksFarmsData])

  const blocks = useMemo(() => {
    const getBlocksFromFarmsIds = blocksFarmsData?.getBlocksFromFarmsIds || []

    if (!getBlocksFromFarmsIds) {
      return []
    }

    const blocksFromGrafts = getBlocksFromFarmsIds
      .map((block) => ({
        id: String(block.block.id),
        name: String(block.block.name)
      }))
      .sort((blockA, blockB) => Number(blockA.name) - Number(blockB.name))

    return removeDuplicateObjects(blocksFromGrafts)
  }, [blocksFarmsData])

  function handleSubmit() {
    createReport({
      variables: {
        input: {
          name,
          farms: selectedFarms.map((item) => ({
            id: item.id,
            name: item.name
          })),
          ages: selectedAgesFarms.map((item) => ({
            id: item.id,
            name: item.name
          })),
          blocks: selectedBlocksFarms.map((item) => ({
            id: item.id,
            name: item.name
          })),
          spacings: selectedSpacingsFarms.map((item) => ({
            id: item.id,
            name: item.name
          })),
          varieties: selectedVarietiesFarms.map((item) => ({
            id: item.id,
            name: item.name
          })),
          graftVarieties: selectedGraftsFarms.map((item) => ({
            id: item.id,
            name: item.name
          }))
        }
      }
    })

    handleClose()
  }

  function handleClose() {
    handleClearFilters()
    setCreateReportModalVisibility(false)
  }

  function handleClearFilters() {
    setName('')
    setSelectedReport('')
    setSelectedFarms([])
    setSelectedBlocksFarms([])
    setSelectedSpacingsFarms([])
    setSelectedVarietiesFarms([])
    setSelectedGraftsFarms([])
  }

  function handleReportSelect(value) {
    if (value === 'Nenhum') {
      handleClearFilters()

      return
    }

    const findedReport = reports.find((report) => report.name === value)

    if (!findedReport) {
      return
    }

    setSelectedReport(value)
    setSelectedFarms(findedReport.farms)
    setSelectedBlocksFarms(findedReport.blocks)
    setSelectedSpacingsFarms(findedReport.spacings)
  }

  useEffect(() => {
    handleClearFilters()
  }, [])

  return (
    <Modal
      visible={createReportModalVisibility}
      onSubmit={() => handleSubmit()}
      onClose={handleClose}
      disabled={selectedBlocksFarms.length === 0}
    >
      <TextField
        value={name}
        onChange={(e) => setName(e.target.value)}
        label="Apelido do report"
        variant="outlined"
      />

      <Box>
        <Box className={styles.content}>
          <Autocomplete
            label="Fazenda"
            width="100%"
            options={farms}
            selectedOptions={selectedFarms}
            setSelectedOptions={setSelectedFarms}
          />
          <Autocomplete
            label="Variedade"
            width="100%"
            options={varieties}
            loading={blocksFarmsLoading}
            disabled={varieties.length === 0}
            selectedOptions={selectedVarietiesFarms}
            setSelectedOptions={setSelectedVarietiesFarms}
          />
          <Autocomplete
            label="Espaçamento"
            width="100%"
            options={spacings}
            loading={blocksFarmsLoading}
            disabled={spacings.length === 0}
            selectedOptions={selectedSpacingsFarms}
            setSelectedOptions={setSelectedSpacingsFarms}
          />
          <Autocomplete
            label="Idade"
            width="100%"
            options={ages}
            loading={blocksFarmsLoading}
            disabled={ages.length === 0}
            selectedOptions={selectedAgesFarms}
            setSelectedOptions={setSelectedAgesFarms}
          />
          <Autocomplete
            label="Enxerto"
            width="100%"
            options={grafts}
            disabled={grafts.length === 0}
            selectedOptions={selectedGraftsFarms}
            setSelectedOptions={setSelectedGraftsFarms}
          />
          <Autocomplete
            label="Quadra"
            width="100%"
            options={blocks}
            loading={blocksFarmsLoading}
            disabled={blocks.length === 0}
            selectedOptions={selectedBlocksFarms}
            setSelectedOptions={setSelectedBlocksFarms}
          />
        </Box>

        <FormControl
          style={{ maxWidth: 300, marginTop: 12, marginLeft: 'auto' }}
          variant="outlined"
        >
          <InputLabel htmlFor="outlined-age-native-simple">
            Copiar de
          </InputLabel>

          <Select
            native
            value={selectedReport}
            onChange={(e) => handleReportSelect(e.target.value)}
            label="Copiar de"
            inputProps={{
              name: 'copiar de',
              id: 'outlined-age-native-simple'
            }}
          >
            <option value="Nenhum">Nenhum</option>
            {reports.map((report) => (
              <option key={report.id} value={report.name}>
                {report.name}
              </option>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box marginTop="40px">
        <Typography>Filtros adicionados</Typography>

        <Box marginTop="10px">
          {selectedFarms.map((farm) => (
            <Chip
              key={farm.id}
              label={farm.name}
              onDelete={() => {
                setSelectedFarms((prevState) =>
                  prevState.filter(
                    (selectedFarm) => selectedFarm.id !== farm.id
                  )
                )
              }}
              deleteIcon={<Cancel style={{ color: '#FA376C' }} />}
              style={{
                marginRight: 10,
                marginBottom: 10,
                backgroundColor: '#FAE3E9',
                color: '#FA376C'
              }}
            />
          ))}

          {selectedVarietiesFarms.map((variety) => (
            <Chip
              key={variety.id}
              label={variety.name}
              deleteIcon={<Cancel style={{ color: '#FA7C44' }} />}
              onDelete={() => {
                setSelectedVarietiesFarms((prevState) =>
                  prevState.filter(
                    (selectedVariety) => selectedVariety.id !== variety.id
                  )
                )
              }}
              style={{
                marginRight: 10,
                marginBottom: 10,
                backgroundColor: '#FAEBE4',
                color: '#FA7C44'
              }}
            />
          ))}

          {selectedSpacingsFarms.map((spacing) => (
            <Chip
              key={spacing.name}
              label={spacing.name}
              deleteIcon={<Cancel style={{ color: '#307C53' }} />}
              onDelete={() => {
                setSelectedSpacingsFarms((prevState) =>
                  prevState.filter(
                    (selectedSpacing) => selectedSpacing.name !== spacing.name
                  )
                )
              }}
              style={{
                marginRight: 10,
                marginBottom: 10,
                backgroundColor: '#EFF9F3',
                color: '#307C53'
              }}
            />
          ))}

          {selectedGraftsFarms.map((graftVariety) => (
            <Chip
              key={graftVariety.name}
              label={graftVariety.name}
              deleteIcon={<Cancel style={{ color: '#A9A13D' }} />}
              onDelete={() => {
                setSelectedGraftsFarms((prevState) =>
                  prevState.filter(
                    (selectedGraftVariety) =>
                      selectedGraftVariety.name !== graftVariety.name
                  )
                )
              }}
              style={{
                marginRight: 10,
                marginBottom: 10,
                backgroundColor: '#FAFAF7',
                color: '#A9A13D'
              }}
            />
          ))}

          {selectedBlocksFarms.map((block) => (
            <Chip
              key={block.id}
              label={block.name}
              deleteIcon={<Cancel style={{ color: '#2B4976' }} />}
              onDelete={() => {
                setSelectedBlocksFarms((prevState) =>
                  prevState.filter(
                    (selectedBlock) => selectedBlock.name !== block.name
                  )
                )
              }}
              style={{
                marginRight: 10,
                marginBottom: 10,
                backgroundColor: '#E1E5EA',
                color: '#2B4976'
              }}
            />
          ))}

          {selectedAgesFarms.map((age) => (
            <Chip
              key={age.name}
              label={age.name}
              deleteIcon={<Cancel style={{ color: '#3F80BC' }} />}
              onDelete={() => {
                setSelectedAgesFarms((prevState) =>
                  prevState.filter(
                    (selectedAge) => selectedAge.name !== age.name
                  )
                )
              }}
              style={{
                marginRight: 10,
                marginBottom: 10,
                backgroundColor: '#F0F4F8',
                color: '#3F80BC'
              }}
            />
          ))}
        </Box>
      </Box>
    </Modal>
  )
}
