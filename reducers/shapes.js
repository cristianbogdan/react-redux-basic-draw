const defaultShapes=[
        { type: 'ellipse', x: 10, y: 10, w: 12, h: 34 },
        { type: 'line', x: 60, y: 20, w: 12, h: 34 },
        { type: 'rectangle', x: 30, y: 30, w: 12, h: 34 },
      ];

export default function shapes(state = defaultShapes, action) {
  switch (action.type) {
    case 'ADD_SHAPE':
      console.log(action)
      return state.concat([action.newShape]);
    case 'CHANGE_SHAPE':
      console.log(action)
      let newState = [...state] // clone the array
      action.toEdit.map((op)=>{newState[action.index][op.field]=op.value});
      return newState;
    default:
      return state
  }
}