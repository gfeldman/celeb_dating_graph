import React, {Component} from 'react'
import ReactTable from "react-table"
import "react-table/react-table.css"

class DatedTable extends Component {

constructor(props) {
  super(props);
  this.state = {data: []}
  this.getCelebs = this.getCelebs.bind(this)
}



async getCelebs() {
    let requestURL ='http://localhost:7474/db/data/transaction/commit/'
    let options = () => {
      return {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Basic " + btoa("neo4j:1q2w3e$R")
        },
        body: JSON.stringify({
          statements: [{statement:
              "MATCH (jon_snow:Celebrity {name:'Kit Harington'})-[*1..3]-(hollywood) RETURN DISTINCT hollywood"
           }]
        })
      }
    }
        let request = await fetch(requestURL,options())
        let response = await request.json()
        let data = response.results[0]
                          .data
                          .map( function(d) {
                              return(d.row[0])
                            })

        this.setState({data})
}

  componentWillMount() {
    this.getCelebs()
  }

  render() {
    const data = this.state.data
    return(
      <ReactTable
        data = {data}
        columns= {[
            {Header: "ID", id: "id", accessor: d=>d.id},
            {Header: "Name",id: "name", minWidth: 200 ,accessor: d => d.name},
            {Header: "Age", id: "age", accessor: d => d.age},
            {Header: "Occupation", id: "occupation", accessor: d => d.occupation},
            {Header: "Zodiac Sign", id: "zodiac", accessor: d => d.zodiac_sign}
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
