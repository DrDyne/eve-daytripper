import React from 'react'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog'
import Avatar from 'material-ui/Avatar'
import Typography from 'material-ui/Typography'
import { CircularProgress } from 'material-ui/Progress'
import style from './style.css'

export const portrait256 = portrait64 => portrait64.replace(/64.jpg$/, '256.jpg')

export const ProfileLoadingScreen = props => {
  const { show } = props

  if ( !show ) return null

  const portrait = 'https://imageserver.eveonline.com/Character/1137347580_64.jpg'
  return (
    <Dialog
      open={true}
    >
      <DialogTitle>Loading profile...</DialogTitle>
    <div>
      profile is loading
      {/*
      <div style={{
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  height: '100vh',
}}>
*/}
  <div style={{ flexGrow: 1 }} />
    <div style={{
      flexGrow: 1,
      alignSelf: 'center',
    }}>
      <Typography type="body1">
        Welcome {name}, loading your inventory, adding you to the fleet...
      </Typography>
    </div>

      <div
        className={style.avatarContainer}
        style={{
          flexGrow: 1,
          alignSelf: 'center',
        }}
      >

        <Avatar
          alt={name}
          src={portrait256(portrait)}
          className={style.avatar256}
          style={{
            width: 256,
            height: 256,
          }}
        />

        <div className={style.avatarCover} />

        <div className={style.avatarLoaderContainer}>
          <CircularProgress size={256} className={style.avatarLoader} style={{display: 'block'}}/>
        </div>
      </div>

    </div>
    </Dialog>
  )
}
//<div style="flex-grow: 1;align-self: center;position: relative;/* margin: 0 auto; */"><div class="MuiAvatar-root-26" style="width: 256px;height: 256px;margin-right: 5px;margin: 0 auto;"><div class="MuiCircularProgress-root-189 MuiCircularProgress-primaryColor-190" role="progressbar" style="width: 256px;height: 256px;position: absolute;/* margin: 0 auto; *//* top: 0; */z-index: 3;"><svg class="MuiCircularProgress-svgIndeterminate-192" viewBox="0 0 50 50"><circle class="MuiCircularProgress-circle-194 MuiCircularProgress-circleIndeterminate-195" cx="25" cy="25" r="20" fill="none" stroke-width="3.6"></circle></svg></div><div style="
//    width: 100%;
//    height: 100%;
//    /* background-color: white; */
//    position: absolute;
//    /* z-index: 1; */
//    transition: 0.2s ease-in;
//"></div><img alt="" src="https://imageserver.eveonline.com/Character/1137347580_256.jpg" class="MuiAvatar-img-28"></div></div>
