import React,{Component} from 'react'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import Divider from 'material-ui/Divider'
import {Link} from 'react-router'
import {NavToggleButton} from '../styled/NavDrawer'

class NavDrawer extends Component{
  state = {
    open: false,
    width: 250
  }

  toggle = () => {
    this.setState((prevState,props) =>{
      return {
        open: !prevState.open
      }
    }
    )
  }
  render() {
    return(
      <div>
        <NavToggleButton
          toggle= {this.toggle}
          width = {this.state.width}
          open = {this.state.open}
        />
        <Drawer
        open = {this.state.open}
        width = {this.state.width}
        >
        <Divider/>
        <Link
          to = {'/'}
        >
          <MenuItem
          onTouchTap = {this.toggle}
          primaryText = {'Explore Graph'}
          />
        </Link>
        <Link
          to = {'/'}
        >
        <MenuItem
         onTouchTap = {this.toggle}
         primaryText = {'Celebrity Page Rank'}
        />
        </Link>
        </Drawer>
      </div>
    )
  }
}

export default NavDrawer
