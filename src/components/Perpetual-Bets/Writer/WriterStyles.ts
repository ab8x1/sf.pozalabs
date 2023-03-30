import styled from "styled-components";

export const CheckBoxes = styled.div`
    display: flex;
    align-items: center;
    flex: 1;
    & input{
        width: auto;
        margin: 0 20px;
        transform: scale(1.3);
    }
`

export const TripleContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 0 5px;
    & div{
        display: flex;
        align-items: center;
        & label{
            margin-left: 5px;
        }
    }
    & input::-webkit-outer-spin-button,
    & input::-webkit-inner-spin-button {
        /* display: none; <- Crashes Chrome on hover */
        -webkit-appearance: none;
        margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
    }
`