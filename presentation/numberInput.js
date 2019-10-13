import  React,{ Component } from 'react';

/*
 A text input that reads numbers.  A generic presentation component that fires a numberChange event with a numeric value
*/
export class NumberInput extends Component{
    costructor(props){ 
      super(props); 
    }

    render(){
          return ( 
              <input type="text"
                     value={this.val()}
                     onChange={(e) => this.props.numberChange(this.parseField(e))} />
          );
    }

    // helper function to generate the input field value
    val = () => {
            // we normally return from the parent state
            var ret = this.props.value;
            // but if the value is zero and we marked this field as dirty
            if (ret == 0 && this.state && this.state.dirty)
                    // we return an empty string
                    return "";
            return ret;
    }


  /* Helper function to read the <input > values and update the parent state*/ 
    parseField = e => {
            // we make sure the event is not reused from a cache
            e.persist();

            // we parse the <input> text to an int
            let result = parseInt(e.target.value);

            // if the value is not a number, 
            // we mark the field as dirty in the local state, and return 0
            if (isNaN(result)) {
                  this.setState({dirty:true});
                  return 0;
            }
            // if not, the value is  a proper number so we remove the dirty flag
            if (this.state&& this.state.dirty)
                  this.setState({dirty: false});

            // return the proper number
            return result;
  }

}