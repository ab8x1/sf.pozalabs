import styled from "styled-components";

export const BorrowForm = styled.form`
    width: 100%;
    max-width: 850px;
    margin-bottom: 40px;
`

export const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px 15px;
    border-radius: 15px;
    @media(min-width: 768px){
        box-shadow: rgb(204 204 204 / 25%) 0px 0px 6px 3px;
        padding: 10px 30px 50px 30px;
    }
`

export const FormHeader = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    border-radius: 15px 15px 0 0;
    padding: 20px 30px;
    overflow: hidden;
    width: 100%;
    min-height: 120px;
`

export const HeaderText = styled.p`
    word-spacing: 0.15em;
    margin: 15px 10px 10px 30px;
    &:first-of-type{
        font-size: 1.15rem;
        font-weight: bold;
    }
`

export const DoubleContainer = styled.div`
    display: grid;
    width: 100%;
    grid-template-columns: 1fr;
    align-items: stretch;
    @media(min-width: 768px){
        grid-template-columns: 1fr 1fr;
        gap: 20px;
    }
`

export const InputWithSpecification = styled.div`
    display: grid;
    grid-template-columns: 0.65fr 0.35fr;
    align-items: stretch;
    background: #F2F3FB;
    border-radius: 5px;
    & input{
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    }
`

export const Specification = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    background: #DDBDCD;
    border-radius: 5px;
    font-weight: bold;
    font-size: 0.9rem;
`

export const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 10px 0;
    @media(min-width: 768px){
        margin: 20px 0;
    }
`

export const InputLabel = styled.label`
    position: relative;
    display: block;
    width: 100%;
    font-weight: bold;
    font-size: 1rem;
    line-height: 250%;
    min-height: 45px;
`

export const Input = styled.input<{error: boolean, disabled?: boolean, hasSpecification?: boolean}>`
    position: relative;
    display: block;
    border: 2px solid transparent;
    background: #F2F3FB;
    border-radius: 5px;
    margin: 0px;
    width: 100%;
    padding: 16.5px 14px;
    outline: none;
    &:focus, &:active{
        border-color: rgb(246,203,206);
    }
    ${({error}) => error && `border-color: red;`}
    ${({disabled}) => disabled && `
        pointer-events: none;
    `}
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