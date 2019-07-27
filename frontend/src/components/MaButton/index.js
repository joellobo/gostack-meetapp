import React from 'react'
import PropTypes from 'prop-types'

import { StyledButton } from './styles'
import Loader from '../Loader'

export default function MaButton({ title, isLoading, ...props }) {
  return (
    <StyledButton {...props}>{isLoading ? <Loader /> : title}</StyledButton>
  )
}

MaButton.propTypes = {
  title: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
  color: PropTypes.string,
}

MaButton.defaultProps = {
  isLoading: false,
  color: '#e5556e',
}
