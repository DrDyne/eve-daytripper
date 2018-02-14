import React from 'react'
import propTypes from 'prop-types'
import { ListItem } from 'mui/List'

export const ListItemButtonLink = ({href, target, content, justifyContent="center"}) => (
  <a href={href} target={target} style={{textDecoration: 'none'}}>
    <ListItem button style={{justifyContent, textAlign: 'center'}}>
      {content}
    </ListItem>
  </a>
)

ListItemButtonLink.propTypes = {
  justifyContent: propTypes.oneOf(['flex-start', 'center', 'flex-end']),
  content: propTypes.any.isRequired,
  href: propTypes.string.isRequired,
  target: propTypes.string,
}

export default ListItemButtonLink
