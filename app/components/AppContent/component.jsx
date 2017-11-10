import React from 'react'
import {
  Paper,
  Tab,
  Tabs,
} from 'material-ui'
import InfoDialog from '../InfoDialog'
import {
  TabsLayout,
  SideToSideLayout,
} from './layouts'
import style from './style.scss'

export const AppContent = props => {
  //const { activeTab } = this.state
  const { layout, activeTab } = props

  return (<Paper className={style.root}>
    { 'tabs' === layout.contentLayout &&
      <TabsLayout {...props} />
    }

    { 'side-to-side' === layout.contentLayout &&
      <SideToSideLayout {...props} />
    }

    <InfoDialog />
  </Paper>)
}
