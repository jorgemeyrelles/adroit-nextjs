import { useEffect, useRef } from 'react'
import { useField } from '@unform/core'

import { TextField } from '@material-ui/core'

export function Input({ name, ...rest }) {
  const inputRef = useRef(null)

  const { fieldName, registerField, defaultValue, error } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value'
    })
  }, [fieldName, registerField])

  return (
    <TextField
      fullWidth
      inputRef={inputRef}
      name={fieldName}
      error={!!error}
      helperText={error || ''}
      variant="outlined"
      defaultValue={defaultValue}
      {...rest}
    />
  )
}
