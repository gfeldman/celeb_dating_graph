import React,{Component} from 'react'
import DatedPath from '../containers/DatedPath'
import DatedTable from '../containers/DatedTable'
import {Container} from '../styled/DatedHome'
class DatedHome extends Component {

  constructor(props){
    super(props)
    this.onRowClick = this.onRowClick.bind(this)
    this.state = {clicked_row: "none"}
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
              console.log('A Td Element was clicked!')
              console.log('it produced this event:', e)
              console.log('It was in this column:', column)
              console.log('It was in this row:', rowInfo)
              console.log('It was in this table instance:', instance)
              const res =  {name: rowInfo.row.name,
                          age: rowInfo.row.age,
                          occupation: rowInfo.row.occupation,
                          zodiac: rowInfo.row.zodiac}
              console.log(res)
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
