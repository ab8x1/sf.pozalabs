import styled from "styled-components"

export const ConnectInfoBlock = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
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