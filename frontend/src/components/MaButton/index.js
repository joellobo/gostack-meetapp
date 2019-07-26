import React from 'react'
import PropTypes from 'prop-types'

import { StyledButton } from './styles'

export default function MaButton({ title, ...props }) {
  return <StyledButton {...props}>{title}</StyledButton>
}

MaButton.propTypes = {
  title: PropTypes.string.isRequired,
}
