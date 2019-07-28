import React, { useRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { useField } from '@rocketseat/unform'

import { StyledDatePicker } from './styles'

export default function MaDatePicker({ name }) {
  const ref = useRef(null)
  const { fieldName, registerField, defaultValue } = useField(name)
  const [selected, setSelected] = useState(defaultValue)

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: fieldName,
        ref: ref.current,
        path: 'props.selected',
        clearValue: pickerRef => {
          pickerRef.clear()
        },
      })
    }
  }, [fieldName, registerField])

  return (
    <StyledDatePicker
      name={fieldName}
      selected={selected}
      onChange={date => setSelected(date)}
      ref={ref}
      placeholderText='Dia e hora de inicio do evento'
      showTimeSelect
      dateFormat='Pp'
    />
  )
}

MaDatePicker.propTypes = {
  name: PropTypes.string.isRequired,
}
