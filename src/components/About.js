import React from 'react';
import AuthAdapter from "../services";
import * as actions from '../actions';


class About extends React.Component {


  render(){
    return(
      <div className="flex justify-center bg-grey-lighter px-8 h-full">
        <div className="items-start bg-grey-lighter bg-white shadow-md w-screen rounded px-8 mt-8 mb-8 py-8 h-auto">
          <div className="flex">
            <div className="flex-1 text-grey-darker text-center bg-grey-light px-4 py-2 m-2"></div>
            <div className="flex-1 text-grey-darker text-center bg-grey-light px-4 py-2 m-2"><label className="shadow bg-purple text-white font-bold py-2 px-4 items-center rounded text-xl" >About</label></div>
            <div className="flex-1 text-grey-darker text-center bg-grey-light px-4 py-2 m-2"></div>
          </div>
          <div className="flex flex-wrap items-center justify-center content-center mt-8 pt-8">
          <label className="align-middle text-center inline block text-grey mb-1 mt-8 text-2xl leading-loose pr-4" >This project was made by <a href="https://www.gveve.com" className="no-underline hover:underline text-blue text-2xl" target="_blank">Gveve</a> using <a href="https://reactjs.org/" className="no-underline hover:underline text-blue text-2xl" target="_blank">React.js</a>, <a href="http://gka.github.io/chroma.js/" className="no-underline hover:underline text-blue text-2xl" target="_blank">chroma.js</a>, <a href="https://www.npmjs.com/package/react-modal" className="no-underline hover:underline text-blue text-2xl" target="_blank">react-modal</a>, <a href="https://tailwindcss.com/" className="no-underline hover:underline text-blue text-2xl" target="_blank">Tailwind.css</a>, and <a href="https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API" className="no-underline hover:underline text-blue text-2xl" target="_blank">HTML Canvas</a>. Inspiration from <a href="http://www.williammalone.com/articles/create-html5-canvas-javascript-drawing-app/" className="no-underline hover:underline text-blue text-2xl" target="_blank">William Malone</a>, and <a href="https://github.com/rolyatmax/watercolor-canvas" className="no-underline hover:underline text-blue text-2xl" target="_blank">rolyatmax</a>.</label>
          </div>
          <div className="flex flex-wrap items-center justify-center content-center mt-8 pt-8">
          <label className="align-middle text-center inline block text-grey mb-1 mt-8 text-2xl leading-loose pr-4" >This was made for fun, and may have bugs. If you encounter a bug, or want your password reset you can email me at GC@gveve.com. Enjoy!</label>
          </div>
        </div>
      </div>

    )
  }
}

export default About
