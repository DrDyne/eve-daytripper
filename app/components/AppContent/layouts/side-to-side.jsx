import React from 'react'
import {
  Grid
} from 'material-ui'
import StockList from '../../StockList'
import LootListHeader from '../../LootList/Header'
import LootList from '../../LootList'

export const SideToSideLayout = props => {
  const { activeTab } = props
  return 0 === activeTab
  ? (<Grid container>
    <Grid item xs={12} sm={7} md={6}>
      <LootListHeader />
      <LootList />
      {/*<LootListFooter />*/}
    </Grid>

    <Grid item xs={12} sm={5} md={6}>
      <StockList />
    </Grid>
  </Grid>)

  : 1 === activeTab
  ? (<Grid container>
    <Grid item xs={12}>
      <StockList />
    </Grid>
  </Grid>)

  : 2 === activeTab
  ? (<Grid container>
    <Grid item xs={12}>
      <LootListHeader />
      <LootList />
    </Grid>
  </Grid>)

  : null
}
