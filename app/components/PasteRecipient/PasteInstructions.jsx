import React from 'react'
import Typography from 'material-ui/Typography'
import Stepper, { Step, StepLabel } from 'material-ui/Stepper';

import style from './style.scss'

export const PasteInstructions = ({step}) => {
  return (
    <div id={style.label} style={{
      background: step > 0 ? 'rgba(245,0,87,0.05)' : 'none'
    }}>
      <Stepper activeStep={step-1} style={{
        width: '66%',
        maxWidth: 320,
        margin: '0 auto',
        background: 'none',
        padding: 28,//3 === step ? 12 : 28,
        transition: '.3s ease-out',
      }}>
        { ['Click', 'Paste'].map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        )) }
      </Stepper>
    </div>
  )
}
