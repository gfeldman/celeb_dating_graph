import React,{Component} from 'react'
import Select from 'react-select'
import 'react-select/dist/react-select.css'

class DatedSelect extends Component {
  constructor(props){
    super(props)
    this.state = {value: null,names: []}
    this.getCelebs = this.getCelebs.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  onChange (value) {
  this.setState({
    value: value,
  })
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
              "MATCH (n) RETURN n.id,n.name"
           }]
        })
      }
    }
        let request = await fetch(requestURL,options())
        let response = await request.json()
        let data = response.results[0]
                          .data
                          .map( function(e) {
                              return({ value: e.row[1], label: e.row[1]})
                            })

        this.setState({names:data})
}
componentWillMount() {
  this.getCelebs()
}
  render () {
    return(
      <Select
        value = {this.state.value}
        onChange = {this.onChange}
        options={this.state.names}
        autosize={false}
      />
    )
  }
}
export default DatedSelect
