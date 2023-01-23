import styled, {keyframes, css} from "styled-components"
import {ConnectMetamask} from '../../Navbar/navbarStyles'
import {LendButonProps} from './offersTypes'
import Image from "next/image"
import { LoadingSpinner } from "../../Instant-Distribution/Manage-Agreement/LoadingSpinner"

export const ConnectFirstInfo = styled.div`
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    & button{
        font-size: 1.2rem;
    }
`

export const LendOffers = styled.div`
    width: 100%;
    max-width: 1000px;
    margin: 50px auto;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 0px 0px 17px 17px;
`

const placeHolderShimmer = keyframes`
    0% {
        background-position: -468px 0
    }
    100% {
        background-position: 468px 0
    }
`

const animation  = (props: any) => css`
    ${placeHolderShimmer} 1s linear infinite forwards
`

export const loadingStyles = css`
        animation: ${animation};
        background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
        background-size: 950px 104px;
        color: transparent;
        pointer-events: none;
        z-index: 200;

`

export const LoadingContainer = styled.div`
    width: 100%;
    min-height: 400px;
    ${loadingStyles}
`

export const OfferContainer = styled.div<{$loading?: boolean, $active?: boolean | null}>`
    position: relative;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    padding: 30px 10px 15px 10px;
    min-height: 124px;
    font-size: 0.8rem;
    cursor: pointer;
    & p{
        margin: 10px;
    }
    @media(min-width: 992px){
        padding: 10px 30px;
        margin: 20px 0;
        font-size: 0.9rem;
        & p{
            margin: 20px 15px;
        }
    }
    ${({$loading}) => $loading && loadingStyles}
`

export const Expand = styled(Image)`
    cursor: pointer;
    padding: 15px;
    box-sizing: content-box;
`

export const ActualFlowRate = styled.span<{$rate?: number}>`
    border-radius: 5px;
    color: ${({$rate}) => $rate === undefined ? "transparent" : $rate > 0 ? "green" : "#F2675E"};
    text-align: center;
    ${({$rate}) => $rate === undefined && loadingStyles}
`

export const Adresses = styled.div`
    display: block;
    font-size: 1.1em;
    & a{
        display: block;
        font-weight: bold;
        color: #1E88E5;
        cursor: pointer;
    }
`

export const Info = styled.p`
    display: flex;
    justify-content: center;
    font-size: 1em;
    text-align: center;
    overflow: hidden;
    max-width: 150px;
    min-width: 75px;
    font-weight: bold;
    cursor: text;
    & img{
        margin-left: 5px;
    }
`

export const ContractStatus = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`

export const Loading = styled.div`
    position: absolute;
    left: 0px;
    top: 50%;
    transform: translate( -100%, -50%);
`

export const Status = styled.p<{$funded?: boolean, $disabled: boolean}>`
    padding: 5px 5px;
    min-width: 120px;
    margin-left: 5px;
    text-align: center;
    border-radius: 5px;
    font-weight: bold;
    cursor: default;
    transition: transform 0.1s ease-in-out;
    ${({$funded, $disabled}) => $disabled ? `
        background-color: #E0E0E0;
        color: #616161;
    ` : $funded ? `
        color: #A8E085;
    ` : `
        background-color: #F8B39D;
        color: white;
        cursor: pointer;
        &: hover {
            transform: scale(1.05);
        }
    `}
`

export const ExternalLink = styled.a`
    color: #1E88E5;
`

export const LendButton = styled(ConnectMetamask)<LendButonProps>`
    justify-content: center;
    text-align: center;
    min-width: 120px;
    margin: 10px 20px;
    ${({$disabled}) => $disabled && `
        cursor: default;
        pointer-events: none;
        background-color: lightgray!important;
    `}
`

export const OfferInfo = styled.div`
    position: absolute;
    right: 15px;
    top: 5px;
`

export const IsActive = styled.span<{active: boolean | null}>`
    padding: 2px 8px;
    color: ${({active}) => active ? 'rgb(16,187,53)' : '#757575'};
    font-weight: bold;
    font-size: 0.7rem;
`

export const DialogBg = styled.div`
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgba(0,0,0,0.6);
    z-index: 1500;
`;

export const DialogContainer = styled.div`
    width: 100%;
    max-width: 500px;
    padding: 20px 40px;
    background-color: white;
    border-radius: 15px;
`
export const TokenPerMounth = styled.p`
    text-align: center;
    font-size: 1.1rem;
`

export const LoanActive = styled.p`
    font-weight: bold;
    font-size: 1.2rem;
    color: #388E3C;
    max-width: 165px;
    text-align: center;
`