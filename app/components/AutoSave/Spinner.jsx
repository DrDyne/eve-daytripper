import React from 'react'
import CheckIcon from 'muii/Check'
import SaveIcon from 'muii/Save'
import Button from 'mui/Button'
import { CircularProgress } from 'mui/Progress'

export const Spinner = ({loading}) => (
  !!loading
  ? <CircularProgress size={68} style={{ position: 'relative' }} />
  : null
)

export default Spinner
