import styled from "styled-components";
import { useState, useRef } from "react";
import Image from "next/image";

const Container = styled.div`
    margin: 30px 0;
`

const Title = styled.div`
    display: table;
    font-weight: bold;
    font-size: 1.4rem;
    cursor: pointer;
    & img{
        margin-left: 10px;
        transition: transform 0.2s ease-in-out;
        ${({opened}) => opened && `
            transform: rotate(180deg);
        `}
    }
`

const Body = styled.div`
    overflow: hidden;
    transition: height 0.2s ease-in-out;
    & a{
        color: #1E88E5
    }
    & img{
        max-width: 100%;
    }
`

function Accordion({title, content}){
    const [height, setHeight] = useState(0);
    const ref = useRef();

    const toogle = () => {
        if(height > 0){
            setHeight(0);
        }
        else setHeight(ref.current.scrollHeight);
    }

    return(
        <Container>
            <Title onClick={toogle} opened={height > 0}> {title} <Image src="/arrow.svg" width={16} height={16} alt="arrow"/></Title>
            <Body ref={ref} style={{height: height}} dangerouslySetInnerHTML={{
                __html: content
            }}/>
        </Container>
    )
}
export default Accordion;