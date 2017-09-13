import React,{Component} from 'react'
import DatedPath from '../containers/DatedPath'
import DatedTable from '../containers/DatedTable'
import DatedSelect from '../containers/DatedSelect'
import {Container} from '../styled/DatedHome'

class DatedHome extends Component {

  constructor(props){
    super(props)
    this.onRowClick = this.onRowClick.bind(this)
    this.state = {clicked_row: null}
  }


  componentWillMount() {
    let height = window.innerHeight
    let width  = window.innerWidth
    this.setState({
      height,
      width
    })
  }

  onRowClick = (state, rowInfo, column, instance) => {
      return {
          onClick: e => {
              const res =  rowInfo.row.id
              this.setState({ clicked_row: res })
          }
      }
  }

  render () {
    let {
      height,
      width
    } = this.state
    return(
      <Container>
          {/*<DatedSelect/>*/}
          <DatedPath
            height = {height}
            width = {width}
            clickedRow = {this.state.clicked_row}
            />
        <DatedTable
          clickedRow={this.state.clicked_row}
          onRowClick = {this.onRowClick}
        />
      </Container>
    )
  }

}

export default DatedHome
