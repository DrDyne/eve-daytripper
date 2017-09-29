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
  ? (<Grid container className={style.root}>
    <Grid item xs={12} sm={7} md={6}>
      <LootListHeader />
      <LootList />
      <LootListFooter />
    </Grid>

    <Grid item xs={12} sm={5} md={6}>
      <StockListHeader />
      <StockList />
    </Grid>
  </Grid>)

  : 1 === activeTab
  ? (<Grid container className={style.root}>
    <Grid item xs={12}>
      <StockListHeader />
      <StockList />
    </Grid>
  </Grid>)

  : 2 === activeTab
  ? (<Grid container className={style.root}>
    <Grid item xs={12}>
      <LootListHeader />
      <LootList />
    </Grid>
  </Grid>)

  : null
}
