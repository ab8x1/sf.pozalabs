import styled from "styled-components"

export const ConnectInfoBlock = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 20px;
    border-radius: 15px;
    margin: 20px 0;
    font-size: 1.2rem;
    text-align: center;
    background: #F2F3FB;
    @media(min-width: 992px){
        font-size: 1.5rem;
        padding: 30px 50px;
    }
`

export const ConnectToWalletInfo = styled.p`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    & span{
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        margin: 0 5px 0 5px;
        & img{
            margin-left: 7px;
        }
    }
`;

export const DashBoardContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    width: 100%;
    margin: 50px 0;
    & a{
        width: 95%;
        margin: 15px 0;
    }
    @media(min-width: 992px){
        & a{
            width: 45%;
            margin: 25px 0;
        }
    }
`
export const ServiceBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #F2F3FB;
    padding: 40px 20px;
    border-radius: 30px;
    transition: transform 0.2s ease-in-out;
    & label{
        display: flex;
        align-items: center;
        margin-bottom: 30px;
        font-weight: bold;
        & img{
            margin-left: 10px;
        }
    }
    &:hover{
        transform: scale(1.05);
        cursor: pointer;
    }
`