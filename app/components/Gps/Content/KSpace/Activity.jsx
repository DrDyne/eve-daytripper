import React from 'react'
import { connect } from 'react-redux'
import List, { ListSubheader, ListItem } from 'mui/List'
import { GridList, GridListTile } from 'mui/GridList'
import { Typography } from 'mui'

import { lookupActivity } from 'App/actions/gps'

export const mapStateToProps = state => ({
  activity: [{
    id: 'jumps',
    label: 'Jumps',
    value: 0,
  }, {
    id: 'kills-npc',
    label: 'NPC',
    value: 0,
  }, {
    id: 'kills-ship',
    label: 'Ships',
    value: 0,
  }, {
    id: 'kills-pod',
    label: 'Pods',
    value: 0,
  }]
})

export const mapDispatchToProps = dispatch => ({
  lookupActivity: system => dispatch(lookupActivity(system))
})

export class Activity extends React.Component {

  componentWillMount () {
    const { system, lookupActivity } = this.props
    lookupActivity(system)
  }

  render () {
    const { system, activity } = this.props
    return (
      <div>
        <ListSubheader style={{ background: 'white', zIndex: 5 }}>
          Activity
        </ListSubheader>

        <ListItem>
          <GridList cellHeight={'auto'} cols={4} style={{width: '100%', textAlign: 'center'}}>
            { activity.map(({label, value}) => (
              <GridListTile key={label}>
                <Typography type="headline"> { value } </Typography>
                <Typography type="caption"> { label } </Typography>
              </GridListTile>
            )) }
          </GridList>
        </ListItem>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Activity)
