import styled from 'styled-components'
import {OptionTypes, OpenedNavbar} from './navbarTypes'

export const Navbar = styled.nav`
    position: relative;
    padding: 20px;
`

export const TopMenu = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 52px;
    @media(min-width: 992px){
        justify-content: flex-end;
        width: 100%;
    }
`

export const ConnectMetamask = styled.button`
   display: flex;
   align-items: center;
   color: white;
   background-color: #d9b8c8;
   padding: 7px 20px;
   font-size: 1rem;
   border-radius: 10px;
   box-shadow: 0px 2.86296px 2.86296px rgba(0, 0, 0, 0.25);
   border-radius: 12px;
   font-weight: bold;
   transition: all 0.05s ease-in-out;
   & span{
        display: none;
   }
   & img{
        width: 32px;
        height: 32px;
        margin-left: 10px;
   }
   &:hover{
        box-shadow: 0px 1.5px 1.5px rgba(0, 0, 0, 0.25);
        transform: translateY(1px);
   }
   @media(min-width: 992px){
        padding: 10px 20px;
        & span{
            display: inline;
            margin-left: 5px;
        }
   }
`

export const ToggleNavbar = styled.div<OpenedNavbar>`
    position: fixed;
    left: 0;
    width: 300px;
    top: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    background-color: white;
    border-right: 1px solid #E0E0E0;
    transform: translateX(${({open}) => open ? '0px' : '-300px'});
    transition: transform 0.3s ease-in-out;
    z-index: 1000;
    @media(min-width: 992px){
        transform: unset;
    }
`

export const Logo = styled.p`
    margin-top: 40px;
    padding: 0 35px;
    color: black;
    font-size: 1rem;
    text-transform: uppercase;
    letter-spacing: 0.2rem;
    font-weight: bold;
`

export const Options = styled.ul`
    list-style: none;
    margin: 0;
    padding: 10px 20px;
    overflow: auto;
`;

export const AppOptions = styled(Options)`
    position: absolute;
    top: 0;
    height: 100%;
    left: 0;
    width: 100%;
`;

export const Option = styled.li<OptionTypes>`
    margin: 10px 0;
    user-select: none;
    border-radius: 12px;
    & a, & span{
        display: flex;
        align-items: center;
        padding: 15px;
        color: #6F7177;
        cursor: pointer;
        transition: background-color 0.2s ease-in-out;
        border-radius: 12px;
    }
    & a:hover, & span:hover{
        background-color: #f5f5f5;
    }
    ${({selected}) => selected && `
        & a, & span{
            background-color: #ECFAEF!important;
            color: #10BB35;
        }
    `}
`

export const Icon = styled.img`
    width: 24px;
    height: 24px;
    margin-right: 15px;
    border-radius: 5px;
`

export const UserAdress = styled.div`
    font-weight: bold;
    & span{
        display: block;
        font-weight: normal;
        color: rgb(16, 187, 53);
        text-align: center;
    }
`;