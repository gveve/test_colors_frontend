import React from 'react';
import Login from '../components/Login'
import Signup from '../components/Signup'
import Profile from '../components/Profile'
import Canvas from '../components/Canvas'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import chroma from 'chroma-js'

class PaintingContainer extends React.Component{
  constructor(){
    super()

    this.state={
      color1: '',
      color2: '',
      colorscal: []
    }
  }

  handleColor = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
      colorscal: []
    })
  }

  handleSubmit = (event) => {
    // debugger;
    let color = [this.state.color1, this.state.color2]
    let colors = chroma.scale(colors).colors(10)
    this.setState({
      colorscal: colors
    })
  }

  handleUpload = (event) => {

  }

  render(){

    return(
      <div>
          <div className="flex">
            <div className="w-1/6 bg-grey h-screen flex-no-shrink text-white p-8">

              <div className="w-full leading-none border rounded border-white mt-4 px-4 py-2">
                <div className="pl-2 pt-2">
                  <label className="text-sm text-white" name="scale-color-1">Select color 1</label>
                </div>
                <div className="px-6 py-4">
                  <input className="leading-none border rounded border-white mx-auto" type="color" name="color1" id="color1" onChange={this.handleColor} />
                </div>
              </div>

              <div className="w-full leading-none border rounded border-white mt-4 px-4 py-2">
                  <div className="pl-2 pt-2">
                    <label className="text-sm text-white" name="scale-color-2">Select color 2</label>
                  </div>
                  <div className="px-6 py-4">
                    <input className="leading-none border rounded border-white mx-auto" type="color" name="color2" id="color2" onChange={this.handleColor} />
                  </div>
              </div>

              <div className="w-full text-sm h-auto mt-4 px-4 py-4 leading-none border rounded border-white hover:border-transparent  hover:bg-white mt-4">
                <button className="text-white hover:text-teal" id="generate-color-scale" value="submit" onClick={this.handleSubmit}>Generate color scale</button>
              </div>

              <div className="w-full text-sm h-auto mt-4 px-4 py-4 leading-none border rounded border-white hover:border-transparent  hover:bg-white mt-4">
                <button href="#" className="pl-2 text-sm text-white hover:text-teal">Save Canvas</button>
              </div>

            </div>
            <Canvas handleUpload={this.handleUpload} colors={this.state}/>
        </div>
      </div>
    )
  }
}

export default PaintingContainer;
