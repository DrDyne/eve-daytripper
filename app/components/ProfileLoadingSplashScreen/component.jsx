import React from 'react'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog'
import Avatar from 'material-ui/Avatar'
import Typography from 'material-ui/Typography'
import { LinearProgress, CircularProgress } from 'material-ui/Progress'
import style from './style.css'

export const portrait256 = portrait64 => portrait64.replace(/64.jpg$/, '256.jpg')

export const ProfileLoadingSplashScreen = ({show, profile, fullWidth=false, showProgress=true, message=null}) => {
  if ( !show ) return null

  return (
    <Dialog
      open={true}
      fullWidth={fullWidth}
    >
      <DialogTitle style={{textAlign: 'center'}}>Loading profile</DialogTitle>
      { showProgress && <LinearProgress mode="query" /> }

    <DialogContent>
      <div>
        <div style={{ flexGrow: 1 }} />
        <div style={{
          flexGrow: 1,
          alignSelf: 'center',
          marginTop: 10,
        }}>
          { !!profile
          ? (<Typography type="body2" style={{textAlign: 'center'}}>
            {profile.name}
          </Typography>)
          : (
          <Typography type="body1" style={{textAlign: 'center'}}>
            Profile is loading...
          </Typography>)
          }
        </div>
      </div>

        <div
          className={style.avatarContainer}
          style={{
            flexGrow: 1,
            alignSelf: 'center',
            position: 'relative',
            marginTop: 10,
          }}
        >

          { !!profile
          ? (<Avatar
              alt={profile.name}
              src={`https://imageserver.eveonline.com/Character/${profile.id}_256.jpg`}

              className={style.avatar256}
              style={{
                width: 256,
                height: 256,
              }}
            />)
          : <Avatar style={{width: 256, height: 256}} />
          }

          { message }

          <div style={{
            flexGrow: 1,
            position: 'absolute',
            top: 0,
            width: '100%',
          }}>
            <div className={style.avatarCover} style={{
              background: profile ? 'none' : 'white'
            }} />
          </div>
        </div>
      </DialogContent>

    </Dialog>
  )
}

export default ProfileLoadingSplashScreen
