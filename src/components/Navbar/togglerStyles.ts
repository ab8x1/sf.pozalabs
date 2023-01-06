import styled from "styled-components";

export const TogglerButton = styled.div`
    width: 20px;
    height: 17px;
    margin-bottom: 5px;
    background: #FFFFFF;
    box-sizing: border-box;
    cursor: pointer;
    user-select: none;
    @media(min-width: 992px){
        display: none;
    }
`

export const Toggler = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    & span{
        background-color: #6F7177;
    }
    & span:nth-of-type(1){
        top: 0;
    }
    & span:nth-of-type(2){
        top: 50%;
    }
    & span:nth-of-type(3){
        top: 100%;
    }

`

export const Bar = styled.span`
    position: absolute;
    width: 100%;
    height: 3px;
    background-color: black;
    transition: all 0.2s ease-in-out;
`