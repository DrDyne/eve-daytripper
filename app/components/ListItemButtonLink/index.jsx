import React from 'react'
import propTypes from 'prop-types'
import Avatar from 'mui/Avatar'
import { ListItem, ListItemText } from 'mui/List'

import DotlanIcon from 'Images/dotlan-logo.png'
import ZkillboardIcon from 'Images/zkillboard-logo.png'

const DotlanAvatar = <Avatar style={{background: 'white'}}> <img src={DotlanIcon} style={{width: 20}}/> </Avatar>
const ZkillAvatar = <Avatar style={{background: 'white'}}> <img src={ZkillboardIcon} style={{width: 20}}/> </Avatar>

const ListItemButtonLink = ({href, icon, primary}) => (
  <a href={href} target="_blank" style={{textDecoration: 'none'}}>
    <ListItem button>
      { icon === 'dotlan' ? DotlanAvatar
      : icon === 'zkill' ? ZkillAvatar
      : null
      }
      <ListItemText secondary={primary} />
    </ListItem>
  </a>
)

ListItemButtonLink.propTypes = {
  icon: propTypes.oneOf(['dotlan', 'zkill']),
  href: propTypes.string.isRequired,
  primary: propTypes.string,
}

export default ListItemButtonLink
