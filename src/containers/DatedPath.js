import React,{Component} from 'react'
import 'math-sqrt'
import {scaleLinear} from 'd3-scale'
import {select} from 'd3-selection'
import {transition} from 'd3-transition'
import {easeBounce} from 'd3-ease'

class DatedPath extends Component{



  constructor(props){
    super(props)
    this.createPath = this.createPath.bind(this)
    this._createPath = this._createPath.bind(this)
    let percHeight = this.props.height * 0.2
    this.height = ( percHeight > 300)? 300 : percHeight
    this.width = this.props.width * 0.8
    this.nodes = [{
      id: 1,
      name: "Kit Harington",
      age: 30,
      occupation: "Actor",
      zodiac: "Pisces"
    }]
  }

  componentDidMount() {
    this.createPath()
  }

  shouldComponentUpdate(nextProps,nextState){
    if(nextProps.clickedRow !== "none"){
      return true
    }
    return false
  }
  componentDidUpdate(){
    this.createPath()
  }

  createPath() {
    if(this.props.clickedRow  === "none"){
      this._createPath(this.nodes)
    }
    else {
      this.nodes = [this.nodes[0],this.props.clickedRow]
      console.log(this.nodes)
      this._createPath(this.nodes)
    }
  }

_createPath(nodes){
    const node = this.node
    let width = this.width
    let height = this.height
    let duration = 2500
    let radius = 45

    select(node)
      .select(".circleGroups")
      .data([]).exit().remove()

      var initialNode = select(node)
                    .style("border","1px solid black")
                    .append("g")
                    .selectAll(".circleGroups")
                    .data(nodes)
                .enter()
                .append("g")
                .attr("class","circleGroups")
                .attr("transform", function(d,i) {
                  return "translate(" + i*width + "," + 0 + ")"
                })

  initialNode.append("circle")
    .attr("class","celebNode")
    .attr("r",radius)
    .style("fill","white")
    .style("stroke","black")
    .style("stroke-width","2")

  initialNode.append("text")
    .text( d => d.name)
    .style("text-anchor","middle")
    .style("fill","#555")
    .style("font-size",14)


    initialNode.transition()
              .duration(duration)
              .ease(easeBounce)
              .attr("transform", function(d,i) {
                    return "translate(" + ((i === 0)?(i + 0.1)*width :(i - 0.1)*width)  + "," + (height/2) + ")"
                    })

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
