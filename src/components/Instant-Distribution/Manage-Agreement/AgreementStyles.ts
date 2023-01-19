import styled, {css} from "styled-components"
import { MutableRefObject } from "react"
import {SubmitForm, Error} from "../../Borrow-Against-Salary/Borrow/borrowStyles"
import { OfferContainer, loadingStyles } from "../../Borrow-Against-Salary/Offers/offersStyles"

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

export const AgreementContainer = styled(OfferContainer)`
    display: flex;
    justify-content: space-around;
    width: 100%;
    padding: 60px 15px 15px 15px;
    @media(min-width: 992px){
        padding: 70px 40px 40px 40px;
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
    font-size: 1.1rem;
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
    & a{
        color: #E0805A;
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

export const CreateAgreementContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #FCD38C;
    padding: 20px;
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

export const NewAgreementInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    & h1{
        margin: 0;
        font-size: 2.3rem;
        text-align: center;
    }
    & p{
        margin: 30px 0;
    }
    @media(min-width: 768px){
        align-items: flex-start;
    }
`

export const InputRow = styled.div`
    display: grid;
    align-items: center;
    grid-template-columns: 0.7fr 0.3fr 50px;
    margin: 20px 0;
    & div:nth-of-type(1) input{
        border-radius: 12px 0 0 12px;
    }
    & div:nth-of-type(2) input{
        border-radius: 0 12px 12px 0;
    }
    @media(min-width: 768px){
        grid-template-columns: 45px 0.6fr 0.2fr 0.2fr 50px;
    }
`
export const AddButton = styled(SubmitForm)`
    display: flex;
    align-items: center;
    width: auto;
    justify-content: center;
    background-color: white;
    color: black;
    font-weight: bold;
    padding: 21px 35px 21px 35px;
    margin: 0 20px 0 0;
    font-size: 1rem;
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

export const OwnedAgreementsContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 50px;
    flex: 1;
    width: 100%;
`

export const AgreementButton = styled.button<{color?: string, $disabled?: boolean}>`
    position: relative;
    display: flex;
    align-items: center;
    padding: 12px 40px;
    margin: 10px 0;
    font-size: 0.9rem;
    background-color: ${({color}) => color ? color : "white"};
    z-index: 100;
    border-radius: 10px;
    font-size: 1.1rem;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    & img{
        margin-right: 10px;
    }
    & span{
        margin-left: 5px;
    }
    ${({$disabled}) => $disabled && `
        opacity: 0.5;
        pointer-events: none;
    `}
    @media(max-width: 767px){
        padding: 15px 20px;
    }
    @media(max-width: 1100px){
        & span{
            display: none;
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