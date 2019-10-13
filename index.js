import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import shapes from './reducers/shapes';
import currentShape from './reducers/currentShape';

import ShapeForm from './form.js';
import Canvas from './canvas-func.js';

import './style.css';

/* we could use combineReducers instead */
function reducer(state = {}, action) {
  return {
    shapes: shapes(state.shapes, action) ,
    currentShape: currentShape(state.currentShape, action)
  };
}

const store= createStore(reducer);

/* The main app, uses a ShapeForm and a Canvas
*/
class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <React.Fragment>
        <div> { /* example of passing the store via props, not recommended but shown for illustration purposes 
                  This does not need react-redux or connect() */ }
          <Canvas store={store} />
        </div>
        <div> { /* The recommended way of passing the store, needs react-redux connect() to generate the container component */ }
         <Provider store={store}> 
             <ShapeForm/>
         </Provider>
        </div>
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
