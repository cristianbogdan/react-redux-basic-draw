import React, { useState } from 'react';
import CanvasPresentation from './presentation/canvasPresentation';


/* Functional version of the canvas Container component, uses the redux store via subscription 
For a class version of this component, see canvas.js
*/
const  Canvas=({store})=>{
    const [, updateState] = React.useState();
    //const forceUpdate = React.useCallback(() => updateState({}), []);

    // subscribe to the store just after first render
    React.useEffect(()=> store.subscribe(() => updateState({})), []);

    function addShape(sh){
      // update the Redux store state using dispatch(action)
      store.dispatch({
          type:'ADD_SHAPE',
          newShape: sh
        });
      store.dispatch({
          type:'SET_CURRENT_SHAPE',
          currentShape:store.getState().shapes.length-1
      });
    };

    function editShape(index, fieldsToChange={}){
      store.dispatch({
        type: 'CHANGE_SHAPE',
        index: index,
        toEdit:Object.keys(fieldsToChange).map(k=>({field:k, value: fieldsToChange[k]}))
      });
      store.dispatch({
        type:'SET_CURRENT_SHAPE',
        currentShape:index
      });
    }

   return ( <CanvasPresentation
            shapes={store.getState().shapes}
            currentShape={store.getState().currentShape}
            addShape={(shp)=>addShape(shp)}
            editShape={(index, fields)=>editShape(index, fields)}
        />);
}

export default Canvas;



