import React, { Component } from 'react';
import CanvasDrawingController from './canvasDrawingController.js';
import CanvasMovingController from './canvasMovingController.js';

// Presentation components are identical in all implementations: React, MVC, Redux

/* The shape type chooser at the top of the canvas, can be easily replaced with something more usable. 
   Will call onTypeChange() from the component properties at each change.
   This is now shown as a stateless function component.
*/
const ShapeType =({type, onTypeChange})=>
   (
      /*  Note that the value is always read from props.type, no matter what the user chooses (single source of truth). So we have to keep this in sync with the user choice  */
      <select value={type} 
           onChange={
             (e) => onTypeChange(e.target.value)
           }
           >
        <option value="rectangle">Rectangle</option>
        <option value="line">Line</option>
        <option value="ellipse">Ellipse</option>
      </select>);

/* The main canvas presentation component */
export default class CanvasPresentation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shapeType: 'line',
      controller: undefined
    };
  }

  render() {
    return (<React.Fragment>
      <div><ShapeType 
        type={this.state.shapeType}
        onTypeChange={
          (type) => this.setState({ shapeType: type })} />
      </div>
      <svg className="shapeCanvas"
        onMouseDown={this.startDrawing}
        onMouseMove={this.keepDrawing}
        onMouseUp={this.stopDrawing} >
        {
          // for each shape in props.shapes[]
          this.props.shapes.map((shape, i) =>

            shape.type === 'rectangle' && // if it's a rectangle
            <rect key={i} className={this.strokeClass(i)}
              x={shape.x}
              y={shape.y}
              width={shape.w}
              height={shape.h}
              data-idx={i}
             >
            </rect>
            ||   // or maybe it's an ellispe?
            shape.type === 'ellipse' &&
            <ellipse key={i} className={this.strokeClass(i)}
              cx={shape.x + shape.w / 2}
              cy={shape.y + shape.h / 2}
              rx={shape.w / 2}
              ry={shape.h / 2}
              data-idx={i}
              >
            </ellipse>
            ||  // or maybe it's a line segment?
            shape.type === 'line' &&
            <line key={i} className={this.strokeClass(i)}
              x1={shape.x}
              y1={shape.y}
              x2={shape.x + shape.w}
              y2={shape.y + shape.h}
              data-idx={i}
             >
            </line>
          )
        }
      </svg>
    </React.Fragment>);
  }

  /** helper function to draw the current shape with a thicker stroke */
  strokeClass = (i) => (i == this.props.currentShape) ? "currentShape":"shape"


  // mouse down
  startDrawing = (e) => {
    
    // set local state with the controller
    this.setState({ controller: e.nativeEvent.target.nodeName==='svg'?
      new CanvasDrawingController(e, this)
      :
      new CanvasMovingController(e, this)});
  }

  // mouse move
  keepDrawing = (e) =>{
    // we check the local state to see if we are drawing:
    if(this.state.controller)
         this.state.controller.keepDrawing(e);
  }

  // mouse up
  stopDrawing = (e) => {  // mouse up, we are done with drawing
    this.setState({ controller: undefined });
  };

}