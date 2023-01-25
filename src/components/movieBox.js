import React from "react";
import styled from "styled-components";

export function MovieBox({poster_src}){
    return (
        <>
        <MovieBoxWrappler>
            <img src={poster_src}/>
            <GenreWrappler>

            </GenreWrappler>
        </MovieBoxWrappler>
        </>
    )
}

const MovieBoxWrappler = styled.div`
width: 220px;
img {
    width: 90%;
    height: auto;
    cursor: pointer;
    
}
&:hover {
    transform: scale(1.1);
    }
`
const GenreWrappler = styled.div`
height: 40px;
display: flex;
gap: 10px;
h1 {
    color: #f16305;
}

`