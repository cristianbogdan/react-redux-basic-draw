export default function currentShape(state=0, action) {

  if (action.type === 'SET_CURRENT_SHAPE') {
      console.log(action)
      return action.currentShape
  } else {
      return state
  }
}