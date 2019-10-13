import React, { Component } from 'react';
import CanvasPresentation from './presentation/canvasPresentation'


/* The canvas container component for Redux. 
   This implementation connects to the Redux store without the use of react-redux. Although this is not recommended, we do it like this to illustrate that Redux is actually a more sophisticated data model.
   The Canvas container component simply gets the store as a prop and then
   - for reading store data, it uses store.getState()
   - changes the state in the store by using store.dispatch(action)
   - it gets notified by the store using store.subscribe(). This of course works with other components connected via react-redux to the same store.

   For a react-redux store connection, see form.js
   For a functional version of this component, using hooks, see canvas-func.js
 */
export default class Canvas extends Component {
  constructor(props) {
    super(props);    
    this.props.store.subscribe(()=>this.setState({}));
  }

  render() {
    return (
       <CanvasPresentation
            shapes={this.props.store.getState().shapes}
            currentShape={this.props.store.getState().currentShape}
            addShape={(shp)=>this.addShape(shp)}
            editShape={(index, fields)=>this.editShape(index,fields)}
        />
    );
  }

  addShape(sh){
    // update the Redux store state using dispatch(action)
    this.props.store.dispatch({
        type:'ADD_SHAPE',
        newShape: sh
      });
    this.props.store.dispatch({
        type:'SET_CURRENT_SHAPE',
        currentShape:this.props.store.getState().shapes.length-1
    });
  };

  editShape(index, fieldsToChange={}){
        this.props.store.dispatch({
        type:'SET_CURRENT_SHAPE',
        currentShape:index
    });
    this.props.store.dispatch({
      type: 'CHANGE_SHAPE',
      index: index,
      toEdit:Object.keys(fieldsToChange).map(k=>({field:k, value: fieldsToChange[k]}))
    });
  }
}