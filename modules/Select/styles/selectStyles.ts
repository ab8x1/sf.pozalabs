import styled, {css} from 'styled-components'
import {ControlProps, InputProps, ClearProps, ArrowContainerProps} from '../types/customTypes'

export const Container = styled.div`
    position: relative;
    flex: 1;
`;

export const Control = styled.div<ControlProps>`
    display: flex;
    align-items: center;
    height: 100%;
    background-color: ${({darkTheme}) => darkTheme ? '#35373c' : 'white'};
    color: ${({darkTheme}) => darkTheme ? 'white' : 'black'};
    border: 1px solid ${({customColors, listFocused, error}) => error && !listFocused ? 'red' : customColors ? listFocused ? customColors.focused : customColors.unfocused : "#9E9E9E"};
    border-radius: 8px;
    font-size: 1rem;
    padding: 0;
    overflow: hidden;
    ${({customStyles}) => css`${customStyles}`}
`;

export const Align = styled.div`
    display: flex;
    align-items: center;
`;

export const Magnifier = styled.img`
    align-self: center;
    width: 25px;
    height: 25px;
    cursor: pointer;
    margin-left: 10px;
`;

export const ArrowContainer = styled.div<ArrowContainerProps>`
    display: flex;
    align-items: center;
    padding: 0 12px;
    cursor: pointer;
    & img{
        width: 15px;
        height: 15px;
    }
    ${({customStyles}) => css`${customStyles}`}
`;

export const InputControl = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    flex: 1;
`;

export const PlaceholderContainer = styled.span`
    position: absolute;
    display: flex;
    padding: 15px 10px 15px 0;
    align-items: center;
    font-size: 0.7em;
    left: 0;
    width: 100%;
    top: 0;
    height: 100%;
    pointer-events: none;
`;

export const Input = styled.input<InputProps>`
    width: 100%;
    padding: 15px 5px 15px 0;
    border: none;
    outline: none;
    background-color: inherit;
    color: inherit;
    cursor: ${({isSearchable}) => isSearchable ? 'text' : 'pointer'};
    &::placeholder{
        font-size: 1em;
        color: inherit;
        opacity: 0.8;
    }
    ${({customStyles}) => css`${customStyles}`}
`;

export const Clear = styled.img<ClearProps>`
    align-self: center;
    width: 12px;
    height: 12px;
    margin: 0 10px;
    cursor: pointer;
    opacity: 0.7;
    transition: opacity 0.2s ease-in-out;
    ${({darkTheme}) => darkTheme && `
        filter: invert(100%);
    ;`}
    &:hover{
        opacity: 1;
    }
`;