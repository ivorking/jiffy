import React, { Component } from "react";
import loader from '../assets/loader.svg';
import clearButton from '../assets/close-icon.svg';
import Gif from '../src/Gif.js';

const randomChoice = arr => {
   const randIndex = Math.floor(Math.random() * arr.length)
   return arr[randIndex]
}

const Header = ({clearSearch, hasResults}) => (
   <div className = 'header grid'>
      {hasResults ? (
         <button onClick = {clearSearch}>
            <img src={clearButton} />
         </button>
      ) : (
        <h1 className="title">Jiffy</h1> 
      )}
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
         loading: false,
         searchTerm: '',
         hintText: 'Hit enter to search',
         // store in an array
         gifs: []
      };
   }

   searchGiphy = async searchTerm => {
   
      this.setState({
         loading: true
      })

      try {
         const response = await fetch(
            `https://api.giphy.com/v1/gifs/search?api_key=9M9YA08KMs8ABCUaNn9XzG3LVp6RvJ9l&q=${searchTerm}&limit=25&offset=0&rating=R&lang=en`
         );
         const {data} = await response.json();

         if (!data.length) {
            throw `Nothing found for ${searchTerm}`
         }

         const randomGif = randomChoice(data)

         this.setState((prevState, props) => ({
            ...prevState,
             // take previous gifs and spread out
            gifs: [...prevState.gifs, randomGif],
            loading: false,
            hintText: `Hit enter to seem more ${searchTerm}`
         }));

      } catch (error) {
         this.setState((prevState, props) => ({
            ...prevState,
            hintText: error,
            loading: false
         }));
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
      const {value} = event.target;

      if (value.length > 2 && event.key === 'Enter') {
         this.searchGiphy(value);
      }
   }

   clearSearch = () => {
      this.setState((prevState, props) => ({
         ...prevState,
         searchTerm: '',
         hintText: 'emptynowt',
         gifs: []
      }));
      this.textInput.focus();
   }

   render() {
      const {searchTerm, gifs} = this.state;
      const hasResults = gifs.length;

      return (
         <div className="page">
            <Header clearSearch = {this.clearSearch} hasResults = {hasResults} />
            <div className="search grid">
               {this.state.gifs.map(gif => (
                  <Gif {...gif} />
               ))}
               <input 
                  className="input grid-item" 
                  placeholder="Type something" 
                  onChange={this.handleChange}
                  onKeyPress={this.handleKeyPress}
                  value={searchTerm}
                  ref={input => {
                     this.textInput = input; 
                  }}
               />
            </div>
            <UserHint {...this.state} />
         </div>
      );

   }
}

export default App;
