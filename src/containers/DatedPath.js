import React,{Component} from 'react'
import 'math-sqrt'
import {scaleLinear,scaleBand,scaleOrdinal} from 'd3-scale'
import {select} from 'd3-selection'
import {transition} from 'd3-transition'
import {easeSin,easeBounce} from 'd3-ease'
import {range} from 'd3-array'
import {line,curveLinear,curveBasis} from 'd3-shape'
import {forceSimulation,forceLink,forceCenter,forceManyBody} from 'd3-force'

class DatedPath extends Component{

  constructor(props){
    super(props)

    this.getShortestPath = this.getShortestPath.bind(this)
    this.createPath = this.createPath.bind(this)
    this._createPath = this._createPath.bind(this)
    let percHeight = this.props.height * 0.2
    this.height = ( percHeight > 300)? 300 : percHeight
    this.width = this.props.width * 0.8
    this.state = {data: []}

    this.nodes = [{
      id: 1,
      name: "Kit Harington",
      age: 30,
      occupation: "Actor",
      zodiac: "Pisces"
    }]
  }


  async getShortestPath(input) {
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
                `MATCH (c1:Celebrity {name:'Kit Harington'}), (c2:Celebrity {id: ${input}}), p=allShortestPaths((c1)-[*]->(c2)) RETURN p`
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
                              })[0]

          this.setState({data},() => this.createPath() )
  }

  componentDidMount() {
    this.createPath()
  }

  shouldComponentUpdate(nextProps,nextState){
    if(nextProps.clickedRow !== null &&
       nextProps.clickedRow !== this.props.clickedRow){
      return true
    }
    return false
  }

  componentWillUpdate(nextProps,nextState){
    const node = this.node
    select(node)
      .selectAll("g.node")
      .data([]).exit().remove()

      select(node)
        .selectAll(".edge-text")
        .data([]).exit().remove()

      select(node)
        .selectAll("line.link")
        .data([]).exit().remove()
   if(nextProps.clickedRow !== null) {
        this.getShortestPath(nextProps.clickedRow)

      }
  }


  createPath() {
    if(this.props.clickedRow !== null){
      this.nodes = [this.nodes[0],this.state.data[this.state.data.length-1]]
    }
    this._createPath(this.state.data)
  }

_createPath(data){
    const node = this.node
    let width = this.width
    let height = this.height
    let radius = 10

    let nodeDuration = 2500
    let edgeDuration = 1000

    let nodeEasement = easeBounce
    let edgeEasement = easeSin

    var nodes = []
    data.forEach(
      (d,i) => {
        if(i % 2 === 0){
          nodes.push(d)
        }
      }
    )

    var edges = []
    data.forEach(
      (d,i) => {
        if(i % 2 !== 0){
          var res = d
          res.source = +data[i-1].id
          res.target = +data[i+1].id
          edges.push(res)
        }
      }
    )

    var nodeHash = {};
    nodes.forEach(node => {
      nodeHash[node.id] = node;
    });

    edges.forEach(edge => {
      edge.type = edge.type;
      edge.rumored = edge.rumored
      edge.source = nodeHash[edge.source];
      edge.target = nodeHash[edge.target];
    });

    var xScale = scaleBand().domain(range(1,nodes.length+1))
                            .range([0,width])
                            .paddingOuter(10)
                            .paddingInner(5)

   let relationshipScale = scaleOrdinal().domain(["Relationship","Encounter","Unknown","Married"])
                                         .range(["green","red","black","orange"])
    var styledSVG = select(node)
                      .style("border","2px solid black")

    var edgeEnter = styledSVG.selectAll("line.link")
                             .data(edges, d => `${d.source.id}-${d.target.id}`)
                             .enter()
    edgeEnter.append("line")
    .attr("class","link")
    .style("opacity",0.5)
    .style("stroke-width",10)
    .style("stroke-dasharray", d => d.rumored ? ("3","3") : ("0"))
    .style("stroke", d => relationshipScale(d.type))
    .attr("x1", function(d,i){return xScale(i+1);})
    .attr("x2", function(d,i){return xScale(i+2);})
    .attr("y1", height)
    .attr("y2", height)
    .transition()
    .ease(edgeEasement)
    .duration(edgeDuration)
    .attr("x1", function(d,i){return xScale(i+1);})
    .attr("x2", function(d,i){return xScale(i+2);})
    .attr("y1", height/2)
    .attr("y2", height/2)

    var edgeTextEnter = edgeEnter.append("g")
                                  .attr("class","edge-text")
                                  .attr("transform", function(d,i){return "translate(" + ((xScale(i+1)+xScale(i+2))/2) + "," + height + ")"; })
    edgeTextEnter.append("text")
    .attr("class","edge-type")
    .style("text-anchor","middle")
    .text(d => d.type)
    .attr("y",20)

    edgeTextEnter.append("text")
    .attr("class","edge-rumored")
    .style("text-anchor","middle")
    .text(d => (d.rumored)? "(rumored)" : "")
    .attr("y",40)

    edgeTextEnter.transition()
    .ease(edgeEasement)
    .duration(edgeDuration)
    .attr("transform", function(d,i){return "translate(" + ((xScale(i+1)+xScale(i+2))/2) + "," + height/2 + ")"; })



    var nodeEnter = styledSVG.selectAll("g.node")
    .data(nodes, d => d.id)
    .enter()
    .append("g")
    .attr("class","node")
    .attr("transform", function(d,i){return "translate(" + xScale(i+1) + "," + 0 + ")"; })

    nodeEnter.append("circle")
    .attr("r",radius)
    .style("fill","white")
    .style("stroke","black")

    nodeEnter.append("text")
    .style("text-anchor","middle")
    .text(d => d.name)
    .attr("dy",-20)

    nodeEnter.transition()
    .ease(nodeEasement)
    .duration(nodeDuration)
    .attr("transform", function(d,i){return "translate(" + xScale(i+1) + "," + height/2 + ")"; })

}

  render() {
    return(
      <svg ref={node => this.node = node}
           width = {this.width}
           height= {this.height}>
      </svg>
    )
  }
}
export default DatedPath
