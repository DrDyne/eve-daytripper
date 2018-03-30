import React from 'react'
import {
  Avatar,
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Typography
} from 'material-ui'
import { Collapse } from 'material-ui/transitions'

import ShoppingCartIcon from 'material-ui-icons/ShoppingCart'
import MoreVertIcon from 'material-ui-icons/MoreVert'
import ExpandLessIcon from 'material-ui-icons/ExpandLess'
import ExpandMoreIcon from 'material-ui-icons/ExpandMore'

import StockList from '../../StockList'
import StockListHeader from '../../StockList/Header'

import LootList from '../../LootList'
import LootListHeader from '../../LootList/Header'
import LootListFooter from '../../LootList/Footer'

export class VerticalLayout extends React.Component {
  state = {
    visibleLoot: true,
    visibleStock: true,
  }

  toggle = id => this.setState({ ['visible' + id]: !this.state['visible' +id] })
  toggleIcon = id => (
    <IconButton onClick={() => this.toggle(id)}>
      { this.state.visibleLoot
        ? <ExpandLessIcon />
        : <ExpandMoreIcon />
      }
    </IconButton>
  )


  render () {
    const { activeTab } = this.props

    return 0 === activeTab
    ? (<div style={{
        display: 'flex',
        flexDirection: 'column',
      }}>

      <Card id="edt-inventory-loot" raised={false}>
        <CardHeader
          avatar={<Avatar>$</Avatar>}
          action={this.toggleIcon('Loot')}
          title="LOOT"
          style={{
            paddingBottom: 0
          }}
        />

        <CardContent>
          <LootListHeader />
          <LootList collapsed={!this.state.visibleLoot} />
          <LootListFooter />
        </CardContent>
      </Card>

      <Card id="edt-inventory-stock" raised={false}>
        <CardHeader
          avatar={<Avatar> <ShoppingCartIcon /> </Avatar>}
          action={this.toggleIcon('Stock')}
          title="STOCK"
          style={{
            paddingBottom: 0
          }}
        />

        <CardContent>
          <StockListHeader />
          <StockList collapsed={!this.state.visibleStock} />
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
}
