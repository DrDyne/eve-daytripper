import React from 'react'

const whmock = {
  id: 31000831,
  name: 'J102038',
  sec: -0.99,
  wh: true,
  jClass: 'C2',
  statics: [
    { sig: 'B274', life: '24 Hours', leadsTo: 'High-Sec', mass: 2000000000, jump: 300000000 },
    { sig: 'Z647', life: '16 Hours', leadsTo: 'Class 1', mass: 500000000, jump: 20000000 }
  ],
  effects: [
    { label: 'Heat Damage', value: 22, bad: 1 },
    { label: 'Overload Bonus', value: 44 },
    { label: 'Smart Bomb Damage', value: 44 },
    { label: 'Smart Bomb Range', value: 44 },
    { label: 'Bomb Damage', value: 44 }
  ]
}

export const WormholeSystemEffectInfo = ({ system }) => {
  return (
    <div>
      <div>
        Statics:
        { system.statics.map(s => (
          <div key={s.sig}> {s.sig}: {s.leadsTo} </div>
        )) }
      </div>

      <div>
        Effect: { system.jClass }/{ system.effectName }
        { system.effects.map(effect => (
          <div key={effect.label} style={{
            color: effect.bad ? 'red' : 'default'
          }}>
            { effect.neg && '-' }{ effect.value }% { effect.label }
          </div>
        )) }
      </div>
    </div>
  )
}
