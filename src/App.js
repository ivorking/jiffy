import React, { Component } from "react";
import loader from '../assets/loader.svg';
import { timingSafeEqual } from "crypto";

const randomChoice = arr => {
   const randIndex = Math.floor(Math.random() * arr.length)
   return arr[randIndex]
}

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
         hintText: 'Hit enter to search',
         gif: null
      };
   }

   searchGiphy = async searchTerm => {
      try {
         const response = await fetch(
            `https://api.giphy.com/v1/gifs/search?api_key=9M9YA08KMs8ABCUaNn9XzG3LVp6RvJ9l&q=${searchTerm}&limit=25&offset=0&rating=R&lang=en`
         );
         const {data} = await response.json();
         const randomGif = randomChoice(data)

         this.setState((prevState, props) => ({
            ...prevState,
            gif: randomGif
         }))
      } catch (error) {}
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
         this.searchGiphy(value);
      }
   }

   render() {
      const {searchTerm, gif} = this.state

      return (
         <div className="page">
            <Header />
            
            <div className="search grid">
               {gif && <video
                  className='grid-item video'
                  autoPlay
                  loop
                  src={gif.images.original.mp4}
                  />
               }
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
