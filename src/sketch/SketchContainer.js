import React, { Component } from 'react';
import SketchPad from './SketchPad'
import { Pencil, TOOL_PENCIL, Line, TOOL_LINE, Ellipse, TOOL_ELLIPSE, Rectangle, TOOL_RECTANGLE, TOOL_PARTICLE, Particle, TOOL_POLYGON, Polygon, TOOL_FLOWER, Flower, TOOL_POLY, Poly } from '../tools'
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


class SketchContainer extends Component{
  constructor(props) {
    super(props);

    this.state = {
      tool:TOOL_PENCIL,
      size: 2,
      color: '#000000',
      fill: false,
      fillColor: '#444444',
      fillColor2: '#444444',
      colorscal: [],
      items: []
    }
  }

  gradient = (e) => {
    let color1 = this.state.fillColor
    let color2 = e.target.value
    let colors = chroma.scale([`${color1}`, `${color2}`]).mode('lrgb').colors(10)
    this.setState({
      fillColor2: color2,
      colorscal: colors
    })
  }

  render() {
    const { tool, size, color, fill, fillColor, fillColor2, colorscal, items } = this.state;
    console.log("SKETCH", this.state);
    return (
      <div>
             <h1>React SketchPad</h1>
             <div style={{float:'left', marginRight:20}}>
               <SketchPad
                 width={500}
                 height={500}
                 animate={true}
                 size={size}
                 color={color}
                 fillColor={fill ? color : ''}
                 colorscal={colorscal}
                 items={items}
                 tool={tool}
               />
             </div>
             <div style={{float:'left'}}>
               <div className="tools" style={{marginBottom:20}}>
                 <button
                   style={tool == TOOL_PENCIL ? {fontWeight:'bold'} : undefined}
                   className={tool == TOOL_PENCIL  ? 'item-active' : 'item'}
                   onClick={() => this.setState({tool:TOOL_PENCIL})}
                 >Pencil</button>
                 <button
                   style={tool == TOOL_LINE ? {fontWeight:'bold'} : undefined}
                   className={tool == TOOL_LINE  ? 'item-active' : 'item'}
                   onClick={() => this.setState({tool:TOOL_LINE})}
                 >Line</button>
                 <button
                   style={tool == TOOL_ELLIPSE ? {fontWeight:'bold'} : undefined}
                   className={tool == TOOL_ELLIPSE  ? 'item-active' : 'item'}
                   onClick={() => this.setState({tool:TOOL_ELLIPSE})}
                 >Ellipse</button>
                 <button
                   style={tool == TOOL_RECTANGLE ? {fontWeight:'bold'} : undefined}
                   className={tool == TOOL_RECTANGLE  ? 'item-active' : 'item'}
                   onClick={() => this.setState({tool:TOOL_RECTANGLE})}
                 >Rectangle</button>
                 <button
                   style={tool == TOOL_PARTICLE ? {fontWeight:'bold'} : undefined}
                   className={tool == TOOL_PARTICLE  ? 'item-active' : 'item'}
                   onClick={() => this.setState({tool:TOOL_PARTICLE})}
                 >Particle</button>
                 <button
                   style={tool == TOOL_POLYGON ? {fontWeight:'bold'} : undefined}
                   className={tool == TOOL_POLYGON  ? 'item-active' : 'item'}
                   onClick={() => this.setState({tool:TOOL_POLYGON})}
                 >Polygon</button>
                 <button
                   style={tool == TOOL_FLOWER ? {fontWeight:'bold'} : undefined}
                   className={tool == TOOL_FLOWER  ? 'item-active' : 'item'}
                   onClick={() => this.setState({tool:TOOL_FLOWER})}
                 >Flower</button>
                 <button
                   style={tool == TOOL_POLY ? {fontWeight:'bold'} : undefined}
                   className={tool == TOOL_POLY  ? 'item-active' : 'item'}
                   onClick={() => this.setState({tool:TOOL_POLY})}
                 >Poly</button>
               </div>
               <div className="options" style={{marginBottom:20}}>
                 <label htmlFor="">size: </label>
                 <input min="1" max="20" type="range" value={size} onChange={(e) => this.setState({size: parseInt(e.target.value)})} />
               </div>
               <div className="options" style={{marginBottom:20}}>
                 <label htmlFor="">color: </label>
                 <input type="color" value={color} onChange={(e) => this.setState({color: e.target.value})} />
               </div>
               {(this.state.tool == TOOL_ELLIPSE || this.state.tool == TOOL_RECTANGLE || this.state.tool == TOOL_POLYGON || this.state.tool == TOOL_POLY) ?
                <div>
                  <label htmlFor="">fill in:</label>
                  <input type="checkbox" value={fill} style={{margin:'0 8'}} onChange={(e) => this.setState({fill: e.target.checked})} ></input>
                </div> : ''}
             </div>
           </div>
    );
  }
}

// {(this.state.tool == TOOL_ELLIPSE || this.state.tool == TOOL_RECTANGLE) ?
//   <div>
//     <label htmlFor="">fill in:</label>
//     <input type="checkbox" value={fill} style={{margin:'0 8'}}
//            onChange={(e) => this.setState({fill: e.target.checked})} />
//     {fill ? <span>
//         <label htmlFor="">with color:</label>
//         <input type="color" value={fillColor} onChange={(e) => this.setState({fillColor: e.target.value})} />
//           <label htmlFor="">with color:</label>
//           <input type="color" value={fillColor2} onChange={this.gradient} />
//         </span> : ''}
//   </div> : ''}

export default SketchContainer;
