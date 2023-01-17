

import styled from 'styled-components'

export const SCNumber = styled.div`
    display: flex;
    padding: 5px;
    border-radius: 50%;
    border: 1px solid #999;
    margin: 2px;
    justify-content: center;
    align-items: center;
    width: 18px;
    height: 18px;
    font-size: 11px;
    font-weight: ${props => props.selected ? "bold" : "normal"};
    box-shadow: 0px 0px 4px 0px #999;
    background-color: ${props => props.selected ? "rgba(255,0,0, 0.7);" : "rgba(218, 218, 218, 0.7)"};
`;
export const SCCurrentNumber = styled.div`
    display: flex;
    border-radius: 50%;
    height: 200px;
    width: 200px;
    margin: 0;
    justify-content: center;
    background: radial-gradient(circle at 60px 60px,red,#000);
    align-items: center;
    font-size: 100px;
    color: white;
    text-shadow: 2px 2px 10px #000;
    margin-left: 60px;
`;

export const SCNumberCol = styled.div`
    display: flex;
    flex-direction: column;
`;

export const SCNumberCols = styled.div`
    display: flex;
`;