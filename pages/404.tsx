import styled from 'styled-components'

const AlignContent = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 100%;
    flex: 1;
`;

export default function FourOhFour() {
  return(
    <AlignContent>
        <h1>404 - Page Not Found</h1>
    </AlignContent>
  )
}