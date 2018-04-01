import React from 'react'
import List, { ListItem } from 'mui/List'
import Typography from 'mui/Typography'
import { LinearProgress } from 'mui/Progress'
import RoutePath from '../../RoutePath'

export const KSpaceListItem = ({route, systems, jumps, onClick}) => (
  <ListItem button onClick={onClick}>
    <div style={{display: 'flex', flexDirection: 'column' }}>
      <Typography variant="caption" style={{marginBottom: 6}}> { route.origin.name} </Typography>
      <RoutePath systems={systems} previewSize={'small'} routeButton={false} />
    </div>

    <div style={{ flexGrow: 1, flexDirection: 'column' }}>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottom: '1px solid #eee',
        flexGrow: 1,
        paddingLeft: 12
      }}>

        <Typography variant="subheading">
          {jumps}
        </Typography>

        <Typography variant="subheading">
          {route.destination.name}
        </Typography>
      </div>

      <LinearProgress style={{
        height: 1,
        width: '100%',
      }}/>
    </div>

  </ListItem>
)

export default KSpaceListItem
