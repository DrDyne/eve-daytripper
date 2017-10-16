import React from 'react'
import StockList from '../../StockList'
import LootList from '../../LootList'

export const TabContainer = props => (<div style={{padding: 20}}>{props.children}</div>)
export const StockListSeparator = props => (<div />)

export const TabsLayout = props => {
  const { activeTab, layout } = props

  return 0 === activeTab
  ? (<TabContainer>
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
  </TabContainer>)

  : 1 === activeTab
  ? (<TabContainer>
    <StockList />
  </TabContainer>)

  : 2 === activeTab
  ? (<TabContainer>
    <LootList />
  </TabContainer>)

  : null
}
