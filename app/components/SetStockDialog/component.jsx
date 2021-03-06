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
  const { items, open, onClose, setStock } = props

  if ( items.length === 1 ) {
    const item = items[0] || {}
    let quantity = item.qty

    return (<Dialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle>
        Target stock quantity
        { items.length > 1 &&
        ( <Typography type="caption"> Editing {items.length} items </Typography> )
        }
      </DialogTitle>
      <DialogContent>
        <TextField
          placeholder={''+item.qty}
          label={item.qty+'x ' + item.name}
          onChange={event => quantity = event.target.value}
          onKeyPress={() => {
            if ( 'Enter' !== event.key ) return
            setStock({ items, qty: quantity })
            onClose()
          }}
          autoFocus
          />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}> cancel </Button>
        <Button
          onClick={event => {
            setStock({ qty: quantity, items })
            onClose()
          }}
          color="primary"
        >
          save
        </Button>
      </DialogActions>
    </Dialog>)
  }

  if ( items.length > 1 ) {
    return <Dialog>setting stock for multiple items currently not supported</Dialog>
  }

  return <div />
}
