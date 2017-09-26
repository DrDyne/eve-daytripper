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
  state = {
    activeTab: 0,
  }

  changeTab = (event, tabIndex) => {
    this.setState({activeTab: tabIndex})
  }

  render () {
    const { activeTab } = this.state
    const { layout } = this.props

    return (<Paper className={style.root}>
      <Tabs value={activeTab} onChange={this.changeTab}>
        <Tab label="Total" />
        <Tab label="Stock" />
        <Tab label="Loot" />
      </Tabs>

      { 'tabs' === layout.contentLayout &&
        <TabsLayout {...this.props} {...this.state}/>
      }

      { 'side-to-side' === layout.contentLayout &&
        <SideToSideLayout {...this.props} {...this.state} />
      }

      <InfoDialog />
    </Paper>)
  }
}
