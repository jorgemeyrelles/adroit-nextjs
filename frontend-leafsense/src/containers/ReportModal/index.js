import { useMemo, useState, useEffect, useContext, useCallback } from 'react';
// import { useQuery, useMutation } from '@apollo/client'

import { format } from 'date-fns';

import {
  Box,
  Chip,
  Select,
  Typography,
  TextField,
  FormControl,
  InputLabel
} from '@mui/material';
import { Cancel } from '@mui/icons-material';

// import { AppContext } from '../../contexts/AppContext';

import { Autocomplete } from '../../components/Form/Autocomplete';
import { Modal } from '../../components/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { removeDuplicateObjects, formatDifference } from '../../utils/format';

import { useStyles } from './styles';
import { StateGlobal } from '../../context/StateGlobal';
import { clients, farmById } from '../../service/api';

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

  const {
    createReportModalVisibility,
    setCreateReportModalVisibility,
    period,
  } =
    useContext(StateGlobal);
  const dispatch = useDispatch();
  const mapStateToProps = useSelector((state) => ({
    token: state.user.token,
  }));

  // console.log(mapStateToProps);
  const [farms, setFarms] = useState([{ name: '', id: '' }]);
  useMemo(() => {
    if (!mapStateToProps.token || mapStateToProps.token === '') {
      return [{ name: '', id: '' }];
    }

    const getClients = async () => {
      const data = await clients(mapStateToProps.token);
      const arr = data.map((e) => ({
        id: e.property_id,
        name: e.name,
      }));
      return setFarms(arr);
    };
    return getClients();

  }, [createReportModalVisibility])

  const reports = useMemo(() => {
    return [{ name: '', id: '', farms: '', block: '', spacing: '', variety: '', age: '' }];
  }, [])

  const [varieties, setVarieties] = useState([{ name: '', id: '' }])
  useMemo(() => {
    const getBlocksFromFarmsIds = [{ name: '', id: '' }];

    if (!selectedFarms || selectedFarms.length === 0) {
      return [{ name: '', id: '' }];
    }
    
    const getVariety = async () => {
      const data = await farmById(mapStateToProps.token, selectedFarms[0].id);
      const test = data.filter(
        (block) => block.variedade_id !== null || block.variety_name !== null
      ).map((block) => ({ name: block.variety_name, id: block.variedade_id }));
      // console.log(removeDuplicateObjects(test));
      return setVarieties(removeDuplicateObjects(test));
    }

    getVariety();
  }, [selectedFarms]);

  const [spacings, setSpacing] = useState([{ name: '', id: '' }]);
  useMemo(() => {
    const getBlocksFromFarmsIds = [{ name: '', id: '' }]

    if (!selectedFarms || selectedFarms.length === 0) {
      return [{ name: '', id: '' }];
    }
    const getSpacing = async () => {
      const data = await farmById(mapStateToProps.token, selectedFarms[0].id);
      const test = data.filter((block) => block.spacing !== null)
        .map((block) => ({
          id: String(block.spacing),
          name: `${String(block.spacing)} m`,
        }));
      // console.log(test);
      return setSpacing(removeDuplicateObjects(test));
    }

    getSpacing();
  }, [selectedFarms])

  const [ages, setAges] = useState([{ name: '', id: '' }]);
  useMemo(() => {
    const getBlocksFromFarmsIds = [{ name: '', id: '' }];

    if (!selectedFarms || selectedFarms.length === 0) {
      return [{ name: '', id: '' }];
    }

    const getAges = async () => {
      const data = await farmById(mapStateToProps.token, selectedFarms[0].id);
      // const today = new Date();
      const test = data.filter((block) => block.plating_date !== null)
      .map((block) => {
        const difference = formatDifference(
          new Date(block.planting_date),
          new Date()
        )

        return {
          id: String(difference),
          name: `${String(difference)} anos`,
        };
      });

      return setAges(removeDuplicateObjects(test));
    }

    getAges();
  }, [selectedFarms])

  const [grafts, setGrafts] = useState([{ name: '', id: '' }]);
  useMemo(() => {
    const getBlocksFromFarmsIds = [{ name: '', id: '' }];

    if (!selectedFarms || selectedFarms.length === 0) {
      return [{ name: '', id: '' }];
    }

    const getGrafts = async () => {
      const data = await farmById(mapStateToProps.token, selectedFarms[0].id);
      const test = data.filter((block) => block.enxerto_name !== null || block.enxerto_id !== null)
        .map((block) => ({ id: block.enxerto_id, name: block.enxerto_name }));
      console.log('grafts', test);
      return setGrafts(removeDuplicateObjects(test));
    }

    getGrafts();

  }, [selectedFarms]);

  const [blocks, setBlocks] = useState([{ name: '', id: '' }]);
  useMemo(() => {
    const getBlocksFromFarmsIds = [{ name: '', id: '' }];

    if (!selectedFarms || selectedFarms.length === 0) {
      return [{ name: '', id: '' }];
    }

    const getBlocks = async () => {
      const data = await farmById(mapStateToProps.token, selectedFarms[0].id);
      const test = data.map((block) => ({
        id: String(block.block_id),
        name: String(block.cod_block)
      }))
        .sort((blockA, blockB) => Number(blockA.name) - Number(blockB.name));

      return setBlocks(removeDuplicateObjects(test));
    }
    getBlocks();

  }, [selectedFarms])

  function handleSubmit() {
    const resp = {
      name: name,
      farm: selectedFarms,
      varieties: selectedVarietiesFarms,
      grafts: selectedGraftsFarms,
      ages: selectedAgesFarms,
      spacing: selectedSpacingsFarms,
      blocks: selectedBlocksFarms,
      period: [format(period.startDate[0], 'yyyy-MM-dd'), format(period.startDate[1], 'yyyy-MM-dd')],
    };

    dispatch({ type: 'REPORT', payload: resp });

    handleClose();
  }

  function handleClose() {
    handleClearFilters();
    setCreateReportModalVisibility(false);
  };

  function handleClearFilters() {
    setName('');
    setSelectedReport('');
    setSelectedFarms([]);
    setSelectedBlocksFarms([]);
    setSelectedSpacingsFarms([]);
    setSelectedVarietiesFarms([]);
    setSelectedGraftsFarms([]);
    setSelectedAgesFarms([]);
  };

  function handleReportSelect(value) {
    if (value === 'Nenhum') {
      handleClearFilters()

      return false;
    };

    const findedReport = reports.find((report) => report.name === value)

    if (!findedReport) {
      return false;
    };

    setSelectedReport(value)
    setSelectedFarms(findedReport.farms)
    setSelectedBlocksFarms(findedReport.blocks)
    setSelectedSpacingsFarms(findedReport.spacings)
  }

  useEffect(() => {
    handleClearFilters()
  }, []);

  return (
    <Modal
      visible={createReportModalVisibility}
      onSubmit={() => handleSubmit()}
      onClose={() => handleClose()}
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
            label="Quadra"
            width="100%"
            options={blocks}
            loading={!blocks}
            disabled={blocks.length === 0}
            selectedOptions={selectedBlocksFarms}
            setSelectedOptions={setSelectedBlocksFarms}
          />
          <Autocomplete
            label="Variedade"
            width="100%"
            options={varieties}
            loading={!varieties}
            disabled={varieties.length === 0}
            selectedOptions={selectedVarietiesFarms}
            setSelectedOptions={setSelectedVarietiesFarms}
          />
          <Autocomplete
            label="Espaçamento"
            width="100%"
            options={spacings}
            loading={!spacings}
            disabled={spacings.length === 0}
            selectedOptions={selectedSpacingsFarms}
            setSelectedOptions={setSelectedSpacingsFarms}
          />
          <Autocomplete
            label="Idade"
            width="100%"
            options={ages}
            // loading={blocksFarmsLoading}
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
                    (selected) => selected.id !== farm.id
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
