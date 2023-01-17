

import styled, { css } from 'styled-components'

const SCJetonBorder = styled.div`
    border: 3px solid #FFD700;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    overflow: hidden;
    position: absolute;
    z-index: 1;
    box-shadow: 1px 1px 5px 0px rgb(0 0 0 / 50%);
    top: ${props => props.mousePosition ? `${props.mousePosition.y - 20}px` : "auto"};
    left: ${props => props.mousePosition ? `${props.mousePosition.x - 20}px` : "auto"};
    & div {
        background-color: blue;
        opacity: 50%;
        width: 100%;
        height: 100%;
    }
`;

export const SCJeton = (props) => {
    console.log(props)
    return(
    <SCJetonBorder {...props}>
        <div></div>
    </SCJetonBorder>
)}
 
