import React from 'react'
import {
  Grid
} from 'material-ui'

import StockList from '../../StockList'
import StockListHeader from '../../StockList/Header'

import LootList from '../../LootList'
import LootListHeader from '../../LootList/Header'
import LootListFooter from '../../LootList/Footer'

import style from './side-to-side.css'

export const SideToSideLayout = props => {
  const { activeTab } = props
  return 0 === activeTab
  ? (<div style={{
      display: 'flex',
    }}>
    <div style={{
      flexGrow: 1,
      padding: 15,
      paddingTop: 0,
    }}>
      <LootListHeader />
      <LootList />
      <LootListFooter />
    </div>

    <div style={{
      flexGrow: 1,
      padding: 15,
      paddingTop: 0,
    }}>
      <StockListHeader />
      <StockList />
    </div>
  </div>)

  : 1 === activeTab
  ? (<div style={{display: 'flex'}}>
    <div style={{
      flexGrow: 1,
      padding: 15
    }}>
      <StockListHeader />
      <StockList />
    </div>
  </div>)

  : 2 === activeTab
  ? (<div style={{display: 'flex'}}>
    <div style={{
      flexGrow: 1,
      padding: 15
    }}>
      <LootListHeader />
      <LootList />
    </div>
  </div>)

  : null
}
