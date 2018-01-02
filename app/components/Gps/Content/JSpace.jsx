import React from 'react'
import List, { ListItem, ListItemText } from 'material-ui/List'
import { Avatar, Button } from 'material-ui'
import { ListItemIcon } from 'material-ui/List'
import { Collapse } from 'material-ui/transitions'

import ExpandMore from 'material-ui-icons/ExpandMore'
import ExpandLess from 'material-ui-icons/ExpandLess'

import { WormholeStaticListItem } from 'App/components/RoutesHistory/Jspace'


const EFFECT_COLOR_BAD = 'rgb(240, 0,0)'
const EFFECT_COLOR_GOOD = 'green'


export const WormholeStatics = ({system}) => (
  <List>
    { system.statics.map(wh => (
      <WormholeStaticListItem
        key={`${system.name}:${wh.sig}`}
        system={system}
        sig={wh.sig}
        leadsTo={wh.leadsTo}
      />
    )) }
  </List>
)

export class WormholeEffect extends React.Component {
  state = {
    showEffect: false,
  }

  render () {
    const { system } = this.props
    const { showEffect } = this.state

    return (
      <List>
        <ListItem
          button
          onClick={() => this.setState({showEffect: !showEffect})}
          style={{
            textAlign: 'right'
          }}
        >
          <ListItemText primary={system.effectName} />
          { showEffect ? <ExpandLess /> : <ExpandMore /> }
        </ListItem>

        <Collapse in={showEffect}>
          { system.effects.map(eff => (
            <ListItem dense key={eff.label}>
              <ListItemText
                primary={eff.label}
              />
              <Button disabled>
                <span style={{
                  color: eff.bad ? EFFECT_COLOR_BAD : EFFECT_COLOR_GOOD
                }}>
                  {eff.neg ? '-' : ''}{eff.value}%
                </span>
              </Button>
            </ListItem>
          )) }
          </Collapse>
      </List>
    )
  }
}
