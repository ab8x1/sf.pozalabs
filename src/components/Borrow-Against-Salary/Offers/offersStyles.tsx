import styled, {keyframes, css} from "styled-components"
import {ConnectMetamask} from '../../Navbar/navbarStyles'
import {LendButonProps} from './offersTypes'
import Image from "next/image"

export const DisplayContainer = styled.div`
    width: 100%;
    max-width: 900px;
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
    width: 100%;
    font-size: 0.8rem;
    border-bottom: 1px solid #EEEEEE;
    padding: 30px 10px 15px 10px;
    & p{
        margin: 10px 20px;
    }
    @media(min-width: 992px){
        padding: 30px 30px 20px 30px;
        font-size: 0.9rem;
        & p{
            margin: 20px 15px;
        }
    }
    ${({$loading}) => $loading && loadingStyles}
`

export const InfoContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-between;
    @media(min-width: 992px){
        justify-content: space-between;
    }

`

export const ExpandArrow = styled(Image)<{opened: boolean}>`
    cursor: pointer;
    user-select: none;
    padding: 15px;
    box-sizing: content-box;
    ${({opened}) => opened && `
        transform: rotate(180deg);
    `}
`

export const DetailsTitle = styled.div`
    display: flex;
    margin: 25px 15px 0 15px;
    font-size: 1.1rem;
    font-weight: bold;
    & label{
        margin-right: 10px;
    }
`

export const ExpandDetails = styled.div`

`

export const Addresses = styled.div`
    display: block;
    & p{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    & a{
        display: block;
        color: #2F848C;
        margin-left: 10px;
        text-decoration: underline;
        cursor: pointer;
    }
`

const InfoWrapper = ({children, className}: any) => {
    const preventPropagation = (e: React.MouseEvent<HTMLParagraphElement>) => {
        e.preventDefault();
        e.stopPropagation();
    }
    return(
        <div className={className} onClick={preventPropagation}>
            {children}
        </div>
    )
}

export const Info = styled(InfoWrapper)`
    display: flex;
    justify-content: center;
    font-size: 1em;
    text-align: center;
    overflow: hidden;
    max-width: 150px;
    min-width: 75px;
    font-weight: bold;
    margin: 10px 20px;
    cursor: text;
    & img{
        margin-left: 5px;
    }
`

export const ContractStatus = styled(InfoWrapper)`
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

export const Status = styled.span<{$noActions?: boolean, $disabled: boolean}>`
    display: flex;
    justify-content: center;
    padding: 5px 5px;
    min-width: 120px;
    margin-left: 5px;
    text-align: center;
    border-radius: 5px;
    font-weight: bold;
    cursor: default;
    transition: transform 0.1s ease-in-out;
    ${({$noActions, $disabled}) => $noActions? `
        color: #616161;
    ` : $disabled ? `
        background-color: #E0E0E0;
        color: #616161;
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

export const ActionButton = styled(ConnectMetamask)<LendButonProps>`
    justify-content: center;
    text-align: center;
    min-width: 160px;
    margin: 10px;
    ${({$disabled}) => $disabled && `
        cursor: default;
        pointer-events: none;
        background-color: lightgray!important;
    `}
`

export const OfferInfo = styled.div`
    position: absolute;
    right: 5px;
    top: -15px;
    display: flex;
    font-size: 0.7rem;
    padding: 2px 8px;
`

export const ActualFlowRate = styled.label<{$rate?: number}>`
    border-radius: 5px;
    & span{
        color: ${({$rate}) => $rate === undefined ? "transparent" : $rate > 0 ? "#A8E085" : "#F2675E"};
        font-weight: bold;
    }
    ${({$rate}) => $rate === undefined && loadingStyles}
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
export const IsActive = styled.span<{active: boolean | null}>`
    padding: 2px 4px;
    color: ${({active}) => active ? '#A8E085' : '#F2675E'};
    font-weight: bold;
`