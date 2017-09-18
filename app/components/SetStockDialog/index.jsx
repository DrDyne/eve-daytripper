import React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography
} from 'material-ui'

export const SetStockDialog = (props) => {
  const { items, open, onRequestClose, onSave } = props
  
  if ( items.length === 1 ) {
    const item = items[0] || {}
    console.log(item)

    return (<Dialog
      open={open}
      onRequestClose={onRequestClose}
    >
      <DialogTitle>
        Set target stock quantity
        { items.length > 1 &&
        ( <Typography type="caption"> Editing {items.length} items </Typography> )
        }
      </DialogTitle>
      <DialogContent>
        <TextField
          placeholder={''+item.qty}
          label={item.qty+'x ' + item.name}
          />
      </DialogContent>
      <DialogActions>
        <Button onClick={onRequestClose}> cancel </Button>
        <Button onClick={onSave} color="primary"> save </Button>
      </DialogActions>
    </Dialog>)
  }

  if ( items.length > 1 ) {
    return <Dialog>setting stock for multiple items currently not supported</Dialog>
  }

  return <div />
}
