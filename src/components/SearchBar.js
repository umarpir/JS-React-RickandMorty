import './SearchBar.css';
import React, { useState, useRef } from 'react'
import App from '../App';

const SearchBar = (props) => {
    const searchRef = useRef()
 
    const handleClick = (e) => {
        props.onSearch(searchRef.current.value);
    }
    const handleKeyPress = (event) => {
        const { key } = event;
        if (key === 'Enter') {
          // Call function here
          handleClick()
        }
      }
 return (
        <div className="body">
            <div className="container">
                <div className="search-box">
                    <input type="text" className="search-input" placeholder="Search a Character" ref={searchRef} onKeyDown={handleKeyPress}/>
                    <button type="submit" className="search-button" onClick={handleClick} onSubmit={handleClick}>
                        <i className="fas fa-search"></i>
                    </button>
                </div>
            </div>
         </div>
        )
}
export default SearchBar;
