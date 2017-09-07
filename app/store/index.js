// import mocked stuff to provide to the store
import { clipboard as cargoMock } from './cargo.pasted.js'
import { parseClipboardFromGameClientToJson } from '../reducers/utils'

export const state = {
  inventory: {
    items: parseClipboardFromGameClientToJson(cargoMock),
    stock: [{ name: 'Core Scanner Probe I', qty: 8 }],
  },
}
