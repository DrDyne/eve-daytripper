import React from 'react'
import {
  Divider,
  Toolbar,
  Typography
} from 'material-ui'
import { LinearProgress } from 'material-ui/Progress'
import { M3 } from '../../M3'
import { ISK } from '../../ISK'

export class Footer extends React.Component {
  state = {
  }

  render () {
    const { inventory, history } = this.props
    const total = {
      isk: inventory.total.isk,
      m3: inventory.total.m3,
      prev: history.lastInventory.total
    }
    const [gain, loss] = [
      total.isk > total.prev.isk && (total.prev.isk > 0),
      total.isk < total.prev.isk
    ]

    return (<div>
      <Toolbar>
        { (gain || loss) && (
          <div style={{
              display: 'flex',
              justifyContent: 'flex-start',
              flexDirection: 'column'
            }}
            role="delta-since-paste"
          >
            <Typography type="caption" className="delta-isk">
              <DeltaSymbol current={total.isk} prev={total.prev.isk} />
              <ISK
                value={ Math.abs(total.isk - total.prev.isk) }
                style={{
                  display: 'inline',
                  color: gain
                    ? '#8BC34A'
                    : '#D50000'
                }} />
            </Typography>

            <Typography type="caption" className="delta-m3" align="right">
              <DeltaSymbol current={total.m3} prev={total.prev.m3} />
              <M3
                value={total.m3 - total.prev.m3}
                style={{
                  display: 'inline',
                  color: (total.m3 - total.prev.m3 > 0)
                    ? '#D50000'
                    : '#8BC34A'
                }} />
            </Typography>
          </div>)
        }

        <div style={{display: 'flex', flex: '1 1 auto'}} />

        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          flexDirection: 'column'
        }}>
          <Typography type="body2">
            <ISK value={total.isk} style={{display: 'inline'}} />
          </Typography>

          <Typography type="body2" align="right">
            <M3 value={total.m3} style={{display: 'inline'}} />
          </Typography>
        </div>
      </Toolbar>
    </div>)
  }
}

export const DeltaSymbol = ({current, prev}) => (<span>
  {((current - prev) > 0) ? '+' : '-'}
</span>)
