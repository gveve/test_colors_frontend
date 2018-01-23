import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Sketch from 'sketch-js/js/sketch'
import { findDOMNode } from 'react-dom'
import { Pencil, TOOL_PENCIL, Line, TOOL_LINE, Ellipse, TOOL_ELLIPSE, Rectangle, TOOL_RECTANGLE, TOOL_PARTICLE, Particle } from '../tools'
import chroma from 'chroma-js'

export const toolsMap = {
  [TOOL_PENCIL]: Pencil,
  [TOOL_LINE]: Line,
  [TOOL_RECTANGLE]: Rectangle,
  [TOOL_ELLIPSE]: Ellipse,
  [TOOL_PARTICLE]: Particle
};

class SketchPad extends Component {

  tool = null;
  interval = null;

  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    items: PropTypes.array.isRequired,
    animate: PropTypes.bool,
    canvasClassName: PropTypes.string,
    color: PropTypes.string,
    fillColor: PropTypes.string,
    fillColor2: PropTypes.string,
    size: PropTypes.number,
    tool: PropTypes.string,
    toolsMap: PropTypes.object,
    onItemStart: PropTypes.func, // function(stroke:Stroke) { ... }
    onEveryItemChange: PropTypes.func, // function(idStroke:string, x:number, y:number) { ... }
    onDebouncedItemChange: PropTypes.func, // function(idStroke, points:Point[]) { ... }
    onCompleteItem: PropTypes.func, // function(stroke:Stroke) { ... }
    debounceTime: PropTypes.number,
  };

  static defaultProps = {
    width: 500,
    height: 500,
    color: '#000',
    size: 5,
    fillColor: '',
    fillColor2: '',
    canvasClassName: 'canvas',
    debounceTime: 1000,
    animate: true,
    tool: TOOL_PENCIL,
    toolsMap,
    colorscal: [],
    r: Math.floor(Math.random() * 200),
    g: Math.floor(Math.random() * 200),
    b: Math.floor(Math.random() * 200)
  };

  constructor(props) {
    super(props);
    console.log("sp-props", props);
    this.initTool = this.initTool.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onDebouncedMove = this.onDebouncedMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }

  componentDidMount() {
    this.canvas = findDOMNode(this.canvasRef);
    this.ctx = this.canvas.getContext('2d');
    this.initTool(this.props.tool);
    // console.log("component", this.props);
    this.ctx.fillStyle = `rgb(${this.props.r},${this.props.g},${this.props.b})`;
    this.ctx.fillRect(0, 0, this.width, this.height)
  }

  componentWillReceiveProps({tool, items}) {
    items
      .filter(item => this.props.items.indexOf(item) === -1)
      .forEach(item => {
        this.initTool(item.tool);
        this.tool.draw(item, this.props.animate);
      });
    this.initTool(tool);
  }

  initTool(tool) {
    this.tool = this.props.toolsMap[tool](this.ctx);
  }

  onMouseDown(e) {
    const data = this.tool.onMouseDown(...this.getCursorPosition(e), this.props.color, this.props.size, this.props.fillColor, this.props.fillColor2);
    data && data[0] && this.props.onItemStart && this.props.onItemStart.apply(null, data);
    if (this.props.onDebouncedItemChange) {
      this.interval = setInterval(this.onDebouncedMove, this.props.debounceTime);
    }
  }

  onDebouncedMove() {
    if (typeof this.tool.onDebouncedMouseMove == 'function' && this.props.onDebouncedItemChange) {
      this.props.onDebouncedItemChange.apply(null, this.tool.onDebouncedMouseMove());
    }
  }

  onMouseMove(e) {
    const data = this.tool.onMouseMove(...this.getCursorPosition(e));
    data && data[0] && this.props.onEveryItemChange && this.props.onEveryItemChange.apply(null, data);
    this.colorMe(e)
  }

  colorMe(e) {
    let canvas = document.getElementById('canvas')
    let ctx = canvas.getContext('2d');
    let mouse = this.getCursorPosition(e)
    let r = Math.round(255 * (mouse[0] / this.props.width))
    let g = Math.round(255 * (mouse[1] / this.props.height))
    let b = Math.round(255 * Math.abs(Math.cos(Math.PI * mouse[1] / this.props.width)))
    ctx.fillStyle = `rgb(${r}, ${g}, ${b})`
    // debugger
    ctx.fillRect = (0, 0, this.props.width, this.props.height)
  }

  onMouseUp(e) {
    const data = this.tool.onMouseUp(...this.getCursorPosition(e));
    data && data[0] && this.props.onCompleteItem && this.props.onCompleteItem.apply(null, data);
    if (this.props.onDebouncedItemChange) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  getCursorPosition(e) {
    const {top, left} = this.canvas.getBoundingClientRect();
    return [
      e.clientX - left,
      e.clientY - top
    ];
  }

  render() {
    console.log("render", this.props);
    const {width, height, canvasClassName} = this.props;
    return (
      <canvas id='canvas'
        ref={(canvas) => { this.canvasRef = canvas; }}
        className={canvasClassName}
        onMouseDown={this.onMouseDown}
        onMouseMove={this.onMouseMove}
        onMouseOut={this.onMouseUp}
        onMouseUp={this.onMouseUp}
        width={width}
        height={height}
      />
    )
  }
}

export default SketchPad;
