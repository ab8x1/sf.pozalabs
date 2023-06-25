import styled, {css} from "styled-components"
import { MutableRefObject } from "react"
import {SubmitForm, Error} from "../Borrow-Against-Salary/Borrow/borrowStyles"
import { OfferContainer, loadingStyles } from "../Borrow-Against-Salary/Offers/offersStyles"

export const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`

export const TopInfoContainer = styled.div`
    position: absolute;
    top: 15px;
    left: 40px;
    right: 40px;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const SplitterContainer = styled(OfferContainer)`
    position: relative;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    width: 100%;
    padding: 60px 15px 15px 15px;
    @media(min-width: 992px){
        padding: 60px 40px 30px 40px;
        justify-content: space-between;
    }
`

export const Assets = styled.span<{$rate?: number}>`
    border-radius: 5px;
    color: ${({$rate}) => $rate === undefined ? "transparent" : $rate > 0 ? "#A8E085" : "#F2675E"};
    text-align: center;
    ${({$rate}) => $rate === undefined && loadingStyles}
`

export const InfoCol = styled.div`
    display: flex;
    align-items: center;
    filter: none;
`

export const Info = styled.div`
    display: flex;
    align-items: center;
    font-weight: bold;
    margin: 10px;
    & img{
        margin-right: 15px;
    }
`

export const TopInfo = styled.p`
    display: flex;
    font-weight: bold;
    & label{
        margin-right: 10px;
    }
`

export const PopUpContainer = styled.div`
    width: 100%;
    max-width: 750px;
    background-color: white;
    border-radius: 15px;
    overflow: auto;
    @media(min-width: 1200px){
        margin-left: 260px;
    }
`

export const CreateSplitterContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #FCD38C;
    padding: 40px 25px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 25px;
    & img{
        display: none;
    }
    @media(min-width: 768px){
        flex-direction: row;
        justify-content: space-around;
        padding: 0 30px;
        & img{
            display: block;
        }
    }
`

export const NewSplitterInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    & h1{
        margin: 0;
        font-size: 1.8rem;
        text-align: center;
    }
    & p{
        margin: 30px 0;
    }
    @media(min-width: 768px){
        align-items: flex-start;
        & h1{
            font-size: 2.3rem;
        }
    }
`

export const InputRow = styled.div`
    display: grid;
    align-items: center;
    grid-template-columns: 0.7fr 0.3fr;
    margin: 20px 0;
    & div:nth-of-type(1) input{
        border-radius: 12px 0 0 12px;
    }
    & div:nth-of-type(2) input{
        border-radius: 0 12px 12px 0;
    }
    @media(min-width: 768px){
        grid-template-columns: 70px 0.6fr 0.2fr 0.2fr;
    }
`
export const AddButton = styled(SubmitForm)`
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: center;
    background-color: white;
    color: black;
    font-weight: bold;
    padding: 18px 35px 18px 35px;
    margin: 10px 0;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    & img{
        margin-left: 5px;
    }
`

export const Remove = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`

export const ErrorLabel = styled(Error)`
    top: -5px;
    transform: translateY(-100%);
`

export const OwnedSplittersContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 50px;
    flex: 1;
    width: 100%;
`

export const SplitterButton = styled(SubmitForm)`
    padding: 10px 30px;
    min-width: auto;
    margin: 10px 0;
    background-color: ${({color}) => color ? color : "white"};
    z-index: 100;
    border-radius: 10px;
    & span{
        display: none;
    }
    @media(min-width: 768px){
        padding: 15px 20px;
    }
    @media(min-width: 1100px){
        & span{
            display: block;
            margin-left: 5px;
        }
    }
`

export const OrderCol = styled.label`
    display: flex;
    align-items: center;
    font-weight: bold;
    & img{
        margin-top: 2px;
        margin-right: 2px;
    }
`