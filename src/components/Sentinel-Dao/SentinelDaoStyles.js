import styled, {keyframes, css} from "styled-components";


export const ChainSelector = styled.div`
    display: flex;
    justify-content: flex-end;
    margin: 20px 0;
    border: solid lightgray;
    border-width: 0 0 1px 0;
`

export const Chain = styled.span`
    margin: 5px 5px;
    padding: 5px;
    font-size: 1.1rem;
    color: #616161;
    cursor: pointer;
    ${({$selected}) => $selected && `
        text-decoration: underline;
        font-weight: bold;
    `}
`

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    border-radius: 10px;
    border-style: hidden;
    box-shadow: 0 0 0 2px #777;
`;

const placeHolderShimmer = keyframes`
    0% {
        background-position: -468px 0
    }
    100% {
        background-position: 468px 0
    }
`

const animation  = () => css`
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
    height: 400px;
    border-radius: 0 0 10px 10px;
    ${loadingStyles}
`

export const TableHeader = styled.th`
    padding: 10px;
    border: 1px solid black;
    word-wrap: break-word;
`;

export const TableCell = styled.td`
    padding: 10px;
    border: 1px solid black;
    word-wrap: break-word;
    text-align: center;
    cursor: pointer;
`;

export const DoubleData = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 100%;
    justify-items: center;
`

export const ButtonsMenu = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px 10px;
    margin: 30px 0 20px 0;
    & button{
        font-size: 0.9rem;
        padding: 15px 20px;
        border-radius: 10px;
        font-weight: bold;
    }
`