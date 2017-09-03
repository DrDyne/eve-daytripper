import React from 'react'
import {
  Paper,
  Tab,
  Tabs,
} from 'material-ui'
import StockList from '../StockList'
import LootList from '../LootList'
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

      { activeTab === 0 && (<TabContainer>
        {(layout.stockListPosition === 'left')
          ? (<div>
            <StockList />
            <StockListSeparator />
            <LootList />
          </div>)
          : (<div>
            <LootList />
            <StockListSeparator />
            <StockList />
          </div>)
        }
      </TabContainer>)}

      {activeTab === 1 && (<TabContainer>
        <StockList />
      </TabContainer>)}

      {activeTab === 2 && (<TabContainer>
        <LootList />
      </TabContainer>)}
    </Paper>)
  }
}

export const TabContainer = props => (<div style={{padding: 20}}>{props.children}</div>)
export const StockListSeparator = props => (<div />)
