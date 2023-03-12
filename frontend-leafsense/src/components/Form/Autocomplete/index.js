import { Autocomplete as MaterialUIAutocomplete } from '@mui/material';

import {
  Box,
  Button,
  ButtonGroup,
  TextField,
  CircularProgress,
  Popper,
  Badge
} from '@mui/material';

import { useStyles } from './styles';

export function Autocomplete(props) {
  const {
    label,
    width,
    options,
    onClose,
    loading,
    disabled,
    setSelectedOptions,
    selectedOptions
  } = props;
  const styles = useStyles();

  return (
    <>
      {/* {console.log(label, selectedOptions)} */}
      <MaterialUIAutocomplete
        multiple
        disableClearable
        disabled={(label === "Fazenda" && selectedOptions.length > 0)}
        onClose={onClose}
        options={options}
        onChange={(e, value) => {
          setSelectedOptions([
            ...new Map(value.map((item) => [item.id, item])).values()
          ]);
        }}
        disableCloseOnSelect
        getOptionLabel={(option) => {
          if(!option.hasOwnProperty('name')) return false;
          if (label === 'Fazenda') {
          return <h6 style={{ margin: '1px 0' }}>{option.name}</h6>
          } else {
            return <h4 style={{ margin: '1px 0' }}>{option.name}</h4>
          }
        }}
        PopperComponent={({ children, ...poppeProps }) => (
          <Popper {...poppeProps}>
            <ButtonGroup className={styles.buttonsGroup} color="primary">
              <Button
                className={styles.butttonPrimary}
                color="primary"
                variant="contained"
                onMouseDown={() => setSelectedOptions(options)}
              >
                Selecionar todos
              </Button>

              <Button
                className={styles.buttonSecondary}
                color="primary"
                variant="contained"
                onMouseDown={() => setSelectedOptions([])}
              >
                Limpar campos
              </Button>
            </ButtonGroup>
            {children}
          </Popper>
        )}
        noOptionsText={() => (
          <Box className={styles.progressContainer}>
            <CircularProgress />
          </Box>
        )}
        renderTags={() => {}}
        // renderOption={(props, option) => {
        //   // console.log(props.key)
        //   return <h5>{option.name}</h5>;
        // }
        // }
        style={{ width, margin: 0 }}
        renderInput={(params) => (
          <TextField
            {...params}
            value={selectedOptions}
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : (
                    <>
                      {!!selectedOptions && selectedOptions.length ? (
                        <Badge
                          badgeContent={selectedOptions.length}
                          color="primary"
                        />
                      ) : null}
                    </>
                  )}
                  {params.InputProps.endAdornment}
                </>
              )
            }}
            placeholder={label}
            margin="normal"
            fullWidth
          />
        )}
      />
    </>
  )
}
