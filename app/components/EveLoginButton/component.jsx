import EveLoginButtonImage from '../../../images/EVE_SSO_Login_Buttons_Large_Black.png'
import style from './style.css'

export const EveLoginButton = () => (
  <Button
    component={'a'}
    href={config.oauth}
    className={style.eveLoginButton}
  >
    <div />
  </Button>
)
