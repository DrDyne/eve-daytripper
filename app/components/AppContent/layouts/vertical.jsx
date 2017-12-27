import React from 'react'
import {
  Card,
  CardContent,
  Typography
} from 'material-ui'

import StockList from '../../StockList'
import StockListHeader from '../../StockList/Header'

import LootList from '../../LootList'
import LootListHeader from '../../LootList/Header'
import LootListFooter from '../../LootList/Footer'

export const VerticalLayout = props => {
  const { activeTab } = props
  return 0 === activeTab
  ? (<div style={{
      display: 'flex',
      flexDirection: 'column',
    }}>
    <Card raised={false}>
      <CardContent>
        <Typography type="headline">
          LOOT
        </Typography>
        <LootListHeader />
        <LootList />
        <LootListFooter />
      </CardContent>
    </Card>

    <Card raised={false}>
      <CardContent>
        <Typography type="headline">
          STOCK
        </Typography>
        <StockListHeader />
        <StockList />
      </CardContent>
    </Card>
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
