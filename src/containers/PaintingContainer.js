import React from 'react';
import {connect} from 'react-redux'
import Login from '../components/Login'
import Signup from '../components/Signup'
import Profile from '../components/Profile'
import Canvas from '../components/Canvas'
import AuthAdapter from "../services";
import { BrowserRouter as Router, Route, Switch, Link, Redirect, withRouter } from 'react-router-dom';
import { Pencil, TOOL_PENCIL, Line, TOOL_LINE, Ellipse, TOOL_ELLIPSE, Rectangle, TOOL_RECTANGLE, TOOL_PARTICLE, Particle, TOOL_POLYGON, Polygon, TOOL_FLOWER, Flower, TOOL_POLY, Poly } from '../tools'
import * as actions from '../actions';
import chroma from 'chroma-js'

  const toolsMap = {
    [TOOL_PENCIL]: Pencil,
    [TOOL_LINE]: Line,
    [TOOL_RECTANGLE]: Rectangle,
    [TOOL_ELLIPSE]: Ellipse,
    [TOOL_PARTICLE]: Particle,
    [TOOL_POLYGON]: Polygon,
    [TOOL_FLOWER]: Flower,
    [TOOL_POLY]: Poly,
  };



  const slider = {
      webkitAppearance: 'none',
      appearance: 'none',
      width: '90px',
      height: '15px',
      background: '#d3d3d3',
      outline: 'none',
      opacity: 0.7,
      hover: {
        background: 'teal'
      }
  }


class PaintingContainer extends React.Component{
  constructor(){
    super()

    this.state={
      color1: '',
      color2: '',
      colorscal: [],
      tool:TOOL_PENCIL,
      size: 2,
      color: '#000000',
      fill: false,
      fillColor: '#444444',
      fillColor2: '#444444',
      colorscal: [],
      items: [],
      save: false
    }
  }

  handleColor = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
      colorscal: [],
      dataURL: ''
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    let color = [this.state.color1, this.state.color2]
    let colors = chroma.scale(colors).colors(10)
    this.setState({
      colorscal: colors
    })
  }

  wannaSave = () => {
    this.setState({
      save: true
    })
  }

  handleSave = (data) => {
      let image = data
      let user = this.props.currentUser.id
      this.props.saveImage(image, user, this.props.history)
  }

  render(){
    const { tool, size, color, fill, fillColor, fillColor2, colorscal, items, save } = this.state;
    console.log("painting", this.props, this.state);
    return(
      <div>
          <div className="flex">
            <div className="w-1/6 bg-grey h-screen flex-no-shrink text-white p-8">

              <div className="w-full leading-none border rounded border-white px-4 pb-2">
                <div className=" pt-2 text-center">
                  <label className="text-sm text-center text-white" name="scale-color-1">Color</label>
                </div>
                <div className="py-4 text-center input-center">
                  <input className="leading-none border rounded border-white hover:border-teal" type="color" name="color" id="color" value={color} onChange={(e) => this.setState({color: e.target.value})} />
                </div>
              </div>

              <div className="w-full leading-none border rounded border-white mt-4 px-4 pb-2">
                <div className=" pt-2 text-center">
                  <label className="text-sm text-center text-white" name="scale-color-1">Size</label>
                </div>
                <div className="px-6 py-4 text-center item-center" >
                  <input className="leading-none border rounded border-white hover:border-teal items-center mx-auto" id="size" min="1" style={slider} max="20" type="range" value={size} onChange={(e) => this.setState({size: parseInt(e.target.value)})} />
                </div>
              </div>

              <div className="w-full text-sm h-auto mt-4 px-4 py-4 leading-none border rounded border-white hover:border-transparent text-center hover:text-teal hover:bg-white mt-4">
                <button className="text-white hover:text-teal"
                onClick={() => this.setState({tool:TOOL_PENCIL})} >Pencil</button>
              </div>

              <div className="w-full text-sm h-auto mt-4 px-4 py-4 leading-none border rounded border-white hover:border-transparent text-center hover:text-teal hover:bg-white mt-4">
                <button className="text-white hover:text-teal"
                onClick={() => this.setState({tool:TOOL_LINE})} >Line</button>
              </div>

              <div className="w-full text-sm h-auto mt-4 px-4 py-4 leading-none border rounded border-white hover:border-transparent text-center hover:text-teal hover:bg-white mt-4">
                <button className="text-white hover:text-teal"
                onClick={() => this.setState({tool:TOOL_ELLIPSE})} >Elipse</button>
              </div>

              <div className="w-full text-sm h-auto mt-4 px-4 py-4 leading-none border rounded border-white hover:border-transparent text-center hover:text-teal hover:bg-white mt-4">
                <button className="text-white hover:text-teal"
                onClick={() => this.setState({tool:TOOL_RECTANGLE})} >Rectangle</button>
              </div>

              <div className="w-full text-sm h-auto mt-4 px-4 py-4 leading-none border rounded border-white hover:border-transparent text-center hover:text-teal hover:bg-white mt-4">
                <button className="text-white hover:text-teal"
                onClick={() => this.setState({tool:TOOL_PARTICLE})} >Particle</button>
              </div>

              <div className="w-full text-sm h-auto mt-4 px-4 py-4 leading-none border rounded border-white hover:border-transparent text-center hover:text-teal hover:bg-white mt-4">
                <button className="text-white hover:text-teal"
                onClick={() => this.setState({tool:TOOL_POLYGON})} >Polygon</button>
              </div>

              <div className="w-full text-sm h-auto mt-4 px-4 py-4 leading-none border rounded border-white hover:border-transparent text-center hover:text-teal hover:bg-white mt-4">
                <button className="text-white hover:text-teal"
                onClick={() => this.setState({tool:TOOL_FLOWER})} >Flower</button>
              </div>

              <div className="w-full text-sm h-auto mt-4 px-4 py-4 leading-none border rounded border-white hover:border-transparent text-center text-white hover:text-teal hover:bg-white mt-4">
                <button className="text-white text-center hover:text-teal"
                onClick={() => this.setState({tool:TOOL_POLY})} >Poly</button>
              </div>

              <div className="w-full text-sm h-auto mt-4 px-4 py-4 leading-none border rounded border-white hover:border-transparent text-center hover:text-teal hover:bg-white mt-4">
                <button href="#" className="pl-2 text-sm text-white hover:text-teal" onClick={this.wannaSave}>Save Canvas</button>
              </div>

            </div>
            <div className="w-5/6">
            <Canvas
            handleSave={this.handleSave}
            handleDataURL={this.handleDataURL}
            wannaSave={this.wannaSave}
            colors={this.state}
            width={500}
            height={500}
            animate={true}
            size={size}
            color={color}
            fillColor={fill ? color : ''}
            colorscal={colorscal}
            items={items}
            tool={tool}
            save={save}
            />
            </div>
        </div>
      </div>
    )
  }
}

// <div className="w-full text-sm h-auto mt-4 px-4 py-4 leading-none border rounded border-white hover:border-transparent hover:text-teal hover:bg-white mt-4">
//   <button className="text-white hover:text-teal" id="generate-color-scale" value="submit" onClick={this.handleSubmit}>Generate color scale</button>
// </div>

function mapStateToProps (state){
  return {
    currentUser: state.auth.currentUser,
    loggedIn: !!state.auth.currentUser.id,
  }
}

export default withRouter(connect(mapStateToProps, actions)(PaintingContainer));
