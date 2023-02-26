import styled from 'styled-components';

export const Container = styled.div`
    position: fixed;
    top: 80px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 1rem;
    color: white;
    border-radius: 7px;
    overflow: hidden;
    z-index: 1800;
    @media(min-width: 992px){
        top: 20px;
        left: 50%;
        transform: translateX(calc(-50% + 130px));
    }
`;

export const Message = styled.div<{status: string}>`
    position: relative;
    display: flex;
    align-items: center;
    background-color: ${({status}) => status === "warning" ? '#FFC107' : status === "success" ? '#4CAF50' : '#F44336'};
    padding: 15px 30px;
`;

export const Close = styled.div`
    position: absolute;
    right: 7px;
    top: 3px;
    cursor: pointer;
    & img{
        width: 15px;
        height: 15px;
    }
`