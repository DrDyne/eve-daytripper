import React from 'react'

const beaconLeft = {
  offsetX: -40,
  inner: '#f50057',
  outer: '#f50057'
}

export default [ {
  title: 'PASTE RECIPIENT',
  selector: '#edt-paste-recipient',
  position: 'left',
  text: (<ol>
    <li>Click</li>
    <li>Paste</li>
  </ol>),
  style: {
    beacon: beaconLeft,
  }

}, {
  title: 'GPS',
  selector: '#edt-gps',
  position: 'left',
  text: 'Mo\' Money',
  style: {
    beacon: beaconLeft,
  }
}, {
  title: 'LOOT',
  selector: '#edt-inventory-loot',
  position: 'top',
  text: 'everybody likes loots',
}, {
  title: 'STOCK',
  selector: '#edt-inventory-stock',
  position: 'top',
  text: 'gotta count em ammo',
} ]
