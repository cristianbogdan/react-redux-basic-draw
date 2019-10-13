export default class CanvasDrawingController{
 // mouse down
  constructor(e, canvas) {
    canvas.props.addShape({ 
          type: canvas.state.shapeType,
          x: e.nativeEvent.offsetX,
          y: e.nativeEvent.offsetY,
          w: 0,
          h: 0
        });

  // mouse move
  this.keepDrawing = (e) =>{
      canvas.props.editShape(
             canvas.props.currentShape, 
             { w: e.nativeEvent.offsetX - 
                canvas.props.shapes[canvas.props.currentShape].x ,
             h: e.nativeEvent.offsetY - 
                canvas.props.shapes[canvas.props.currentShape].y
             }
       );
    }
  }
}