import React from 'react'
import style from './style.css'
import {
  Dialog,
  DialogTitle,
  Typography
} from 'material-ui'
import GameItemAvatar from '../GameItemAvatar'

export const InfoDialog = props => {
  const { show, item, hideDialog } = props
  if ( !show ) return null

  return (<Dialog
    open={show}
    onClose={hideDialog}
  >
    <div style={{
        padding: 25,
        maxWidth: 360
    }}>
      <GameItemAvatar id={item.id} size={64} style={{float: 'right'}}/>
      <Typography variant="headline">{item.name}</Typography>
      <Description text={item.info.description} />
    </div>
  </Dialog>)
}

export const Description = props => {
  const { text } = props
  const textWithoutTags = text.replace(/=showinfo:[0-9]+/g, '')
  return (<Typography variant="body1">
    <span dangerouslySetInnerHTML={{__html: textWithoutTags}} />
  </Typography>)
}
