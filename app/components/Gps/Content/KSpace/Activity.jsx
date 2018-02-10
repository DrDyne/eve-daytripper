import React from 'react'
import { connect } from 'react-redux'
import List, { ListSubheader, ListItem } from 'mui/List'
import GridList, { GridListTile } from 'mui/GridList'
import { Typography } from 'mui'

export class Activity extends React.Component {
  state = {
    activity: [0, 0, 0, 0],
    grid: [{
      id: 'jumps', label: 'Jumps',
    }, {
      id: 'kills-npc', label: 'NPC',
    }, {
      id: 'kills-ship', label: 'Ships',
    }, {
      id: 'kills-pod', label: 'Pods',
    }]
  }

  urls = {
    jumps: 'https://esi.tech.ccp.is/latest/universe/system_jumps/?datasource=tranquility',
    kills: 'https://esi.tech.ccp.is/latest/universe/system_kills/?datasource=tranquility'
  }

  componentWillMount () {
    const { system } = this.props
    this.lookupActivity(system)
  }

  lookupActivity = system => (
    Promise.all([
      this.fetchJumps(system),
      this.fetchKills(system)
    ])
    .then(([jumps, [npc, ship, pod]]) => (
      this.setState({ activity: [jumps, npc, ship, pod] })
    ))
  )

  fetchJumps = system => (
    fetch(this.urls.jumps)
    .then(res => res.json())
    .then(universe => universe.find(({system_id}) => system.id === system_id))
    .then(system => !!system ? system.ship_jumps : 0)
  )

  fetchKills = system => (
    fetch(this.urls.kills)
    .then(res => res.json())
    .then(universe => universe.find(({system_id}) => system.id === system_id))
    .then(system => {
      if ( !system ) return [0, 0, 0]
      const { ship_kills, npc_kills, pod_kills } = system
      return [ npc_kills, ship_kills, pod_kills ]
    })
  )

  render () {
    const { system } = this.props
    return (
      <div>
        <ListSubheader style={{ background: 'white', zIndex: 5 }}>
          Activity - last hour
        </ListSubheader>

        <ListItem>
          <GridList cellHeight={'auto'} cols={4} style={{width: '100%', textAlign: 'center'}}>
            { this.state.grid.map(({id, label}, index) => (
              <GridListTile key={label}>
                <Typography type="headline"> { this.state.activity[index] } </Typography>
                <Typography variant="caption"> { label } </Typography>
              </GridListTile>
            )) }
          </GridList>
        </ListItem>
      </div>
    )
  }
}

export default Activity
