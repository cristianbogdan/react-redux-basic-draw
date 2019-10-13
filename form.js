import ShapeFormPresentation from './presentation/formPresentation'

/* The form presentation component will be connected to the Redux store by a container component produced using connect()
  connect() needs two mappings: mapStateToProps and mapDispatchToProps.

  ShapeFormPresentation has the following props:
  shapes
  currentShape
  fieldChange
  changeCurrentShape

  The two mappings describe how these props are produced based on a store state (for the 'data' props: shapes and currentShape), and based on the store dispatch() (for the 'action' props: fieldChange, changeCurrentShape)
*/

 /* How is the store state mapped to data props of the presentation component? */
 const mapStateToProps = (state) => {
  return {
    shapes: state.shapes,
    currentShape: state.currentShape
  }
}

/* How are the dispatched store actions mapped to 'action' props of the presentation component? */
const mapDispatchToProps = (dispatch) => ({
    fieldChange: (name, val, index) => dispatch({ 
         type:'CHANGE_SHAPE',
         index: index,
         toEdit:[{
            field:name,
            value: val
         } ]     
      }),
    changeCurrentShape: (index)=> dispatch({ 
         type: 'SET_CURRENT_SHAPE', 
         currentShape:index 
      })
})

import { connect } from 'react-redux'

/* container component for the form generated via react-redux connect() */
const ShapeForm= connect(mapStateToProps, mapDispatchToProps)(ShapeFormPresentation);

export default ShapeForm;