import React from 'react'
import {
  IconButton,
  Toolbar,
  Typography
} from 'material-ui'
import {
  FileDownload as FileDownloadIcon,
  FileUpload as FileUploadIcon,
  RemoveShoppingCart,
  ShoppingCart,
} from 'material-ui-icons'

export const Header = props => {
  return null
  const { inventory, importStockSetup, exportStockSetup } = props

  return (<div>
    <Toolbar>
      <Typography type="caption">
        stock list, {inventory.stock.length} items
      </Typography>

      <div style={{
          display: 'flex',
          flexGrow: 1
      }} />

    <IconButton onClick={exportStockSetup}>
        <FileDownloadIcon />
      </IconButton>

      <IconButton onClick={importStockSetup}>
        <FileUploadIcon />
      </IconButton>
    </Toolbar>
  </div>)
}
