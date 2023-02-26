import styled from "styled-components";
import { useState, useRef } from "react";
import Image from "next/image";

const Container = styled.div`
    margin: 20px 0;
`

const Title = styled.div`
    display: table;
    font-weight: bold;
    font-size: 1.4rem;
    cursor: pointer;
    & img{
        margin-left: 10px;
    }
`

const Body = styled.div`
    overflow: hidden;
    transition: height 0.2s ease-in-out;
`

function Accordion(){
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
            <Title onClick={toogle}>1. What is a Sentinel? <Image src="/arrow.svg" width={16} height={16} alt="arrow"/></Title>
            <Body ref={ref} style={{height: height}}>
                <p>Test</p>
                <p>Test</p>
                <p>Test</p>
                <p>Test</p>
                <p>Test</p>
                <p>Test</p>
            </Body>
        </Container>
    )
}
export default Accordion;