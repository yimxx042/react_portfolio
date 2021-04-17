import React from 'react';

function Result ({ result, openPopup}) {
    return (
        <div className="result" onClick={() => openPopup(result.imdbID)}>
            <img height="350px" width="250" src={result.Poster} />
            <h3>{result.Title}</h3>
        </div>
    )
}

export default Result;

