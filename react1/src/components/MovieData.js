import React, { useState } from 'react';
import SearchMovie from './SearchMovie';
import axios from 'axios';
import Results from './Results';
import Popup from './Popup';

function MovieData(){
    const [state, setState] = useState({
        s: "",
        results: [],
        selected: {}
    });
    const url="http://www.omdbapi.com/?apikey=6e4b7986";

    const search = (e) => {
        if (e.key === "Enter"){
            axios(url + "&s=" + state.s).then(({data}) => {
                let results = data.Search;

                setState(prevState => {
                    return { ...prevState, results: results}
                })
            });
        }
    }
    
    const handleInput = (e) => {
        let s = e.target.value;

        setState(prevState => {
            return { ...prevState, s: s }
        });
    }

    const openPopup = id => {
        axios(url + "&i=" + id).then(({data}) => {
            let result = data;

            console.log(result);
            setState(prevState => {
                return { ...prevState, selected: result}
            });
        });
    }

    const closePopup = () => {
        setState(prevState => {
            return { ...prevState, selected: {}}
        });
    }

    return (
        <div className="MovieData">  
        <header> 
            <h1>Check Movies before you Watch</h1>   
        </header>
        <main>
            <SearchMovie handleInput={handleInput} search={search}/>
            <p className="movieexample">Popular Search | #Horror 
            #Comedy #Romance #Hero</p>
            <Results results={state.results} openPopup={openPopup} />

            {(typeof state.selected.Title != "undefined") ? <Popup selected={state.selected} closePopup={closePopup} /> : false}
        </main>
        
        </div>
    );

}

export default MovieData;