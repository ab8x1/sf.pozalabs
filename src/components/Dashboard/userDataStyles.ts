import styled from "styled-components"

export const InfoBlock = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px 50px;
    border-radius: 15px;
    margin: 20px 0;
    font-size: 1.5rem;
    text-align: center;
    background: rgba(0,0,0,0.03);
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