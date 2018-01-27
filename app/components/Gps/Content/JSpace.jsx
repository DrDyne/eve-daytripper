import React from 'react'
import List, { ListItem, ListSubheader, ListItemText } from 'material-ui/List'
import { Avatar, Button } from 'material-ui'
import { ListItemIcon } from 'material-ui/List'
import { Collapse } from 'material-ui/transitions'

import ExpandMore from 'material-ui-icons/ExpandMore'
import ExpandLess from 'material-ui-icons/ExpandLess'

import { WormholeStaticListItem } from 'App/components/RoutesHistory/Jspace'
import ISK from 'App/components/ISK'


const EFFECT_COLOR_BAD = 'rgb(240, 0,0)'
const EFFECT_COLOR_GOOD = 'green'


export const WormholeStatics = ({system}) => (
  <List>
    <ListSubheader style={{background: 'white'}}>
      Statics
    </ListSubheader>
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

    if ( !system.effectName ) return null

    return (
      <List>
        <div>
          <ListItem button onClick={() => this.setState({showEffect: !showEffect})} >
            <ListItemText primary={ system.effectName } />
            { showEffect ? <ExpandLess /> : <ExpandMore /> }
          </ListItem>

          { !!showEffect && system.effects.map(eff => (
            <ListItem dense key={eff.label}>
              <ListItemText
                secondary={eff.label}
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

        </div>
      </List>
    )
  }
}

import moment from 'moment'
export class WormholeActivity extends React.Component {
  state = {
    topKiller: null,
    mostKills: null,
    victim: null,
    lastKill: null,
    recentKills: [], // last 7 days
    topKillerCorp: null,
    mostKillsCorp: null,
    victimCorp: null,
  }

  componentWillMount () {
    const { system } = this.props
    this.fetchWormholeActivity(system.id)
  }

  fetchWormholeActivity = id => {
    const url = `https://zkillboard.com/api/kills/solarSystemID/${id}/`
    const options = {
      headers: {
        'Accept-Encoding': 'gzip',
        'User-Agent': 'wip',
      }
    }

    return fetch(url, options)
    .then(res => res.json())
    .then(killmails => {
      const recentKills = this.findKillsInTime('7 days ago', killmails) // kills within last 7 days

      const topKiller = this.findTopKillerCorp(killmails) // most destructive (isk destroyed)
      const mostKills = this.findMostKillsCorp(killmails) // most kills (ships destroyed)
      const victim = this.findVictim(killmails) // suffered most kills (isk or ships)

      this.setState({
        lastKill: recentKills[0],
        recentKills,
        topKiller,
        mostKills,
        victim
      })

      return Promise.all([
        this.identifyCorp(topKiller.corpId),
        this.identifyCorp(mostKills.corpId),
        this.identifyCorp(victim.corpId),
      ])
      .then(([topKillerCorp, mostKillsCorp, victimCorp]) => {
        this.setState({ topKillerCorp, mostKillsCorp, victimCorp })
      })
    })
  }

  identifyCorp = corpId => (
    fetch(`https://esi.tech.ccp.is/latest/corporations/${corpId}/?datasource=tranquility`)
    .then(res => res.json())
  )


  getUniqueAttackerCorpIds = killmails => (
    killmails
    .reduce((memo, km) => memo.concat(...km.attackers), [])
    .map(atk => atk.corporation_id)
    .reduce((memo, corpId) => memo.find(id => corpId === id)
      ? memo
      : memo.concat(corpId)
    , [])
  )

  getUniqueVictimCorpIds = killmails => (
    killmails
    .map(km => km.victim.corporation_id)
    .reduce((memo, corpId) => memo.find(id => corpId === id)
      ? memo
      : memo.concat(corpId)
    , [])
  )

  findTopKillerCorp = killmails => {
    const attackers = this.getUniqueAttackerCorpIds(killmails)
    const totalDestroyedByAttacker = attackers.map(corpId => {
      const totalDestroyed = killmails.reduce((memo, km) => {
        const wasAttacker = !!km.attackers.find(c => c.corporation_id === corpId)
        return memo + (wasAttacker && km.zkb.totalValue)
      }, 0)

      return { corpId, totalDestroyed }
    })

    const corporations = totalDestroyedByAttacker.filter(k => k.corpId)
    const topKill = Math.max(...corporations.map(c => c.totalDestroyed))
    const { corpId } = corporations.find(c => c.totalDestroyed === topKill)

    return { corpId, totalDestroyed: topKill }
  }

  findMostKillsCorp = killmails => {
    const attackers = this.getUniqueAttackerCorpIds(killmails)
    const totalKillsByAttacker = attackers.map(corpId => {
      const nbKills = killmails.reduce((memo, km) => {
        const wasAttacker = !!km.attackers.find(c => c.corporation_id === corpId)
        return memo + (wasAttacker && 1)
      }, 0)

      return { corpId, nbKills }
    })

    const corporations = totalKillsByAttacker.filter(c => c.corpId)
    const mostKills = Math.max(...corporations.map(k => k.nbKills))
    const { corpId } = corporations.find(k => k.nbKills === mostKills)

    return { corpId, totalKills: mostKills }
  }

  findVictim = killmails => {
    const victims = this.getUniqueVictimCorpIds(killmails)
    const totalLossByVictim = victims.map(corpId => {
      const lostAssets = killmails.reduce((memo, km) => {
        const wasVictim = (km.victim.corporation_id === corpId)
        return memo + (wasVictim && 1)
      }, 0)

      const lostIsk = killmails.reduce((memo, km) => {
        const wasVictim = (km.victim.corporation_id === corpId)
        return memo + (wasVictim && km.zkb.totalValue)
      }, 0)

      return { corpId, lostAssets, lostIsk }
    })

    const corporations = totalLossByVictim.filter(c => c.corpId)
    const mostAssetsLost = Math.max(...corporations.map(k => k.lostAssets))
    const { corpId, lostIsk } = corporations.find(k => k.lostAssets === mostAssetsLost)

    return { corpId, lostIsk, lostAssets: mostAssetsLost }
  }

  findKillsInTime = (date, killmails) => {
    return []
  }

  render () {
    const {
      topKiller,
      mostKills,
      victim,
      lastKill,
      recentKills,
      topKillerCorp,
      mostKillsCorp,
      victimCorp
    } = this.state

    return (
      <List>
        <ListSubheader style={{background: 'white'}}>
          Activity
        </ListSubheader>

        { topKillerCorp &&
          <TopKiller corp={topKillerCorp} {...topKiller} />
        }

        { mostKillsCorp &&
          <MostKills corp={mostKillsCorp} {...mostKills} />
        }

        { victimCorp &&
          <Victim corp={victimCorp} {...victim} />
        }

        <LastKill corp={lastKill} />

        { [ ...recentKills ]
        .map((killmail, index) => {
          return (
            <ListItem key={index} >
              {index}
            </ListItem>
          )
        }) }

        <ListItem>
          <ListItemText type="caption" secondary="* based on last 200 killmails" />
        </ListItem>
      </List>
    )
  }
}

const TopKiller = ({corp, corpId, totalDestroyed}) => (
  <ListItem>
    <CorpAvatar corpId={corpId} />
    <ListItemText
      primary={ `[${corp.ticker}] ${corp.name}` }
      secondary={(
        <span>
          top killer: <ISK short value={totalDestroyed} /> destroyed
        </span>
      )}
    />
  </ListItem>
)

const MostKills = ({corp, corpId, totalKills}) => (
  <ListItem>
  {console.log(corp, corpId, totalKills)}
    <CorpAvatar corpId={corpId} />
    <ListItemText
      primary={ `[${corp.ticker}] ${corp.name}` }
      secondary={`most kills: ${totalKills}`}
    />
  </ListItem>
)

const Victim = ({corp, corpId, lostIsk, lostAssets}) => (
  <ListItem>
    <CorpAvatar corpId={corpId} />
    <ListItemText
      primary={ `[${corp.ticker}] ${corp.name}` }
      secondary={(
        <span>
          victim: {lostAssets} lost assets (<ISK short value={lostIsk} />)
        </span>
      )}
    />
  </ListItem>
)

const LastKill = ({corp}) => (
  <ListItem>
  </ListItem>
)

const CorpAvatar = ({corpId}) => (
  <Avatar src={`https://image.eveonline.com/Corporation/${corpId}_128.png`} />
)
