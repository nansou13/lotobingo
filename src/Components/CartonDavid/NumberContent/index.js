import React, {useState} from 'react';
import Jeton from '../../Jetons'
import styled, { css } from 'styled-components'

export const SCCartonNumber = styled.div`
    /* background: ${props => props.primary ? "palevioletred" : "white"}; */
    display: flex;
    font-size : 30px;
    width: 50px;
    height: 85px;
    border: 3px solid red;
    justify-content: center;
    align-items: center;
    margin: 3px;
    padding: 3px;
    user-select: none;
    position: relative;
`;

export const SCCartonNumberEmpty = styled.div`
    /* background: ${props => props.primary ? "palevioletred" : "white"}; */
    background-color: red;
    width: 100%;
    height: 100%;
`;

const NumberContent = ({value}) => {
    const [displayJeton, setDisplayJeton] = useState(false)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const addJeton = (e) => {
        setMousePosition({x:e.nativeEvent.offsetX, y:e.nativeEvent.offsetY})
        setDisplayJeton(!displayJeton)
    }
    console.log('---->',mousePosition)
    return (
        <SCCartonNumber onClick={addJeton}>
            {displayJeton && <Jeton mousePosition={mousePosition}/>}
            {value || <SCCartonNumberEmpty/>}
        </SCCartonNumber>
    );
};

export default NumberContent;