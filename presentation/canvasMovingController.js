export default class CanvasDrawingController{
 // mouse down
  constructor(e, canvas) {
    this.index=e.nativeEvent.target.getAttribute("data-idx");
    canvas.props.editShape(this.index);
    canvas.setState({dragEvent:e.nativeEvent});

  // mouse move
  this.keepDrawing = (e) =>{
      canvas.props.editShape(
             this.index, 
             {x: canvas.props.shapes[this.index].x+ e.nativeEvent.offsetX -  canvas.state.dragEvent.offsetX,
             y: canvas.props.shapes[this.index].y+ e.nativeEvent.offsetY -  canvas.state.dragEvent.offsetY
             }
       );
       canvas.setState({dragEvent:e.nativeEvent});
    }
  }
}