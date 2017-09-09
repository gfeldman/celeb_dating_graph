import React, {Component} from 'react'
import ReactTable from "react-table"
import "react-table/react-table.css"

class DatedTable extends Component {

constructor(props) {
  super(props);
}

  static defaultProps = {
    data: [{
      id: 1,
      name: "Kit Harington",
      age: 30,
      occupation: "Actor",
      zodiac: "Pisces"
    },
    {
      id: 2,
      name: "Anna Kendrick",
      age: 50,
      occupation: "Actor",
      zodiac: "Virgo"
    },
    {
      id: 3,
      name: "Beavis",
      age: 15,
      occupation: "Actor",
      zodiac: "Pisces"
    }]
  }



  componentDidUpdate() {
    
  }



  render() {
    const data = this.props.data
    return(
      <ReactTable
        data = {data}
        columns= {[
            {Header: "Name",id: "name", minWidth: 200 ,accessor: d => d.name},
            {Header: "Age", id: "age", accessor: d => d.age},
            {Header: "Occupation", id: "occupation", accessor: d => d.occupation},
            {Header: "Zodiac Sign", id: "zodiac", accessor: d => d.zodiac}
        ]}
        defaultPageSize={10}
        className="-striped -highlight"
        getTrProps={this.props.onRowClick}
      >
      </ReactTable>
    )
  }
}
export default DatedTable
