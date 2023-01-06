import styled from "styled-components";

export const BorrowForm = styled.form`
    width: 100%;
    max-width: 600px;
    margin-bottom: 40px;
`

export const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px 15px;
    border-radius: 15px;
    @media(min-width: 768px){
        box-shadow: rgb(204 204 204 / 25%) 0px 0px 6px 3px;
        padding: 10px 50px 50px 50px;
    }
`

export const FormImg = styled.div`
    position: relative;
    border-radius: 15px 15px 0 0;
    overflow: hidden;
    width: 100%;
    height: 120px;
`

export const FormName = styled.p`
    position: absolute;
    display: table;
    left: 10px;
    top: 10px;
    font-weight: bold;
    margin: 0 0 30px 0;
    padding: 4px 10px;
    border-radius: 8px;
    color: rgb(16, 187, 53);
    background-color: rgba(0,0,0,0.3);
    color: white;
    z-index: 100;
`

export const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 5px 0;
`

export const InputLabel = styled.label`
    position: relative;
    display: block;
    width: 100%;
    font-size: 1rem;
    line-height: 250%;
    min-height: 45px;
`

export const Input = styled.input<{error: boolean, disabled?: boolean}>`
    display: block;
    border: 0px;
    background: none;
    border: 1px solid #E0E0E0;
    border-radius: 12px;
    margin: 0px;
    width: 100%;
    padding: 16.5px 14px;
    outline: none;
    &:focus, &:active{
        border-color: rgb(16, 187, 53);
    }
    ${({error}) => error && `border-color: red;`}
    ${({disabled}) => disabled && `
        background-color: rgba(0,0,0,0.05)!important;
        pointer-events: none;
    `}
`

export const DoubleContainer = styled.div`
    display: grid;
    width: 100%;
    grid-template-columns: 6.5fr 3.5fr;
    align-items: stretch;
`

export const SubmitForm = styled.button<{disabled: boolean}>`
    width: 100%;
    color: rgb(16,187,53);
    background-color: rgba(16,187,53,0.1);
    padding: 15px 20px;
    font-size: 1rem;
    margin-top: 30px;
    border-radius: 12px;
    ${({disabled}) => disabled && `
        color: #BDBDBD;
        background-color: rgba(130, 146, 173, 0.2)!important;
        cursor: default;
    `}
`

export const Value = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: center;
    margin: 0 20px;
    font-size: 1.1rem;
    letter-spacing: 0.05rem;
`

export const Error = styled.span`
    position: absolute;
    width: max-content;
    margin-left: 10px;
    color: red;
    font-size: 0.9rem;
`