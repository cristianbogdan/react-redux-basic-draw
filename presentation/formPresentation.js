import React, { Component } from 'react';
import {NumberInput} from './numberInput'

/* The form as presentation component 
Note that this uses the functional description of the component. The props simply come in a function parameter. However, note that such components cannot keep state.
  Note also that this presentation component is not dependent on any data model. We use the exact same code in the MVC implementation.
  The implementation uses two other components. ArrayOption and ObjectForm, defined below.
*/
const ShapeFormPresentation=({shapes, currentShape, fieldChange, changeCurrentShape})=> (
      <React.Fragment>
        <ArrayOption array={shapes} 
                     current={currentShape}
                     changeCurrent={changeCurrentShape}
                     optionFormat={JSON.stringify}
        />
        <ObjectForm object={shapes[currentShape]}
                    fields={['x', 'y', 'w', 'h']}
                    fieldChange={(name, val)=>fieldChange(name, val, currentShape)}

        />            
      </React.Fragment>
  );

export default ShapeFormPresentation;


/* Presentation component allowing to choose an object from an array. Each object is formatted with a given function (optionFormat)  */
const ArrayOption=({array, optionFormat, current, changeCurrent})=>(
       <select onChange={(e)=>changeCurrent(parseInt(e.target.value))}
          value={current}
        >
              {  // for each shape, we generate an <option>
                array.map(
                  (obj, i) =>
                    <option key={i} value={i}>{optionFormat(obj)}</option>
                ) // end of map()
              }
        </select>
)

/* Presentation component showing a number-input for some numeric fields of an object */
const ObjectForm=({object, fields, fieldChange})=>{
   return(
        fields.map((name, i) =>
              <div key={i}>{name}: <NumberInput name={name} value={object[name]} numberChange={(val)=>fieldChange(name, val)} /></div>
            ) // end of map()
   )
}