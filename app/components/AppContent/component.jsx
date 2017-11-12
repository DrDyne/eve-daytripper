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

export class AppContent extends React.Component {
  componentWillMount () {
    this.props.loadProfile()
  }

  render () {
    const { layout, activeTab } = this.props

    return (<Paper className={style.root}>
      { 'tabs' === layout.contentLayout &&
        <TabsLayout {...this.props} />
      }

      { 'side-to-side' === layout.contentLayout &&
        <SideToSideLayout {...this.props} />
      }

      <InfoDialog />
    </Paper>)
  }
}
