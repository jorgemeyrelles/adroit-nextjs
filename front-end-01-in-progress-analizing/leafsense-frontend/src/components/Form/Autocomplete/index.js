import { Autocomplete as MaterialUIAutocomplete } from '@material-ui/lab'

import {
  Box,
  Button,
  ButtonGroup,
  TextField,
  CircularProgress,
  Popper,
  Badge
} from '@material-ui/core'

import { useStyles } from './styles'

export function Autocomplete({
  label,
  width,
  options,
  onClose,
  loading,
  disabled,
  setSelectedOptions,
  selectedOptions
}) {
  const styles = useStyles()

  return (
    <MaterialUIAutocomplete
      multiple
      disableClearable
      disabled={disabled}
      onClose={onClose}
      options={options}
      onChange={(e, value) => {
        setSelectedOptions([
          ...new Map(value.map((item) => [item.id, item])).values()
        ])
      }}
      disableCloseOnSelect
      getOptionLabel={(option) => option.name}
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
      renderOption={(option) => option.name}
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
  )
}
