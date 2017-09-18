// import mocked stuff to provide to the store
import { clipboard as cargoMock } from './cargo.pasted'
import { parseClipboardFromGameClientToJson } from '../reducers/utils'
//import { Ghunter } from './char.mock'
import { makePortraitUrl } from '../api/utils'
export const state = {
  char: {
    id: 97042320,
    name: "Ghunter Huffalott",
    portrait: makePortraitUrl(97042320)
  }
}
