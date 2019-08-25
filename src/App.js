import React, { Component } from "react";
import loader from '../assets/loader.svg';
import { timingSafeEqual } from "crypto";

const Header = () => (
   <div className = 'header grid'>
      <h1 className = 'title'>Jiffy</h1>
   </div>
)

const UserHint = ({loading, hintText}) => (
   <div className = 'user-hint'>
      {loading ? <img className="block mx-auto" src={loader} /> : hintText}
   </div>
)

class App extends Component {

   constructor(props) {
      super(props);
      this.state = {
         searchTerm: '',
         hintText: 'Hit enter to search'
      }
   }

   handleChange = event => {
      const {value} = event.target;
      // setting searchTerm in state and using on the input as the value, created a controlled input
      this.setState((prevState, props) => ({
         // take old props
         ...prevState,
         // overwrite old props with new values
         searchTerm: value,
         hintText: value.length > 2 ? `Hit enter to search ${value}` : ''
      }));
   };

   handleKeyPress = event => {
      console.log(event.key)
      const {value} = event.target;

      if (value.length > 2 && event.key === 'Enter') {
         alert(`search for ${value}`);
      }
   }

   render() {
      const {searchTerm} = this.state
      return (
         <div className="page">
            <Header />
            <div className="search grid">
               <input 
                  className="input grid-item" 
                  placeholder="Type something" 
                  onChange={this.handleChange}
                  onKeyPress={this.handleKeyPress}
                  value={searchTerm}
               />
            </div>
            <UserHint {...this.state} />
         </div>
      );
   }
}

export default App;
