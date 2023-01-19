import {UseFormWatch} from 'react-hook-form'
import {BorrowFormTypes} from './borrowTypes'
import styled from 'styled-components'
import {InputWithSpecification, Specification} from './borrowStyles'

const Container = styled.div`
    display: flex;
    align-items: center;
    flex: 1;
    background: rgba(255, 193, 87, 0.67);
    border-radius: 5px;
    padding: 16.5px 14px;
`

type LoanAmountProps = {
    watch: UseFormWatch<BorrowFormTypes>
}

function LoanAmountComponent({watch}: LoanAmountProps){
    let rate: number = watch('rate');
    let borrowAmount: number = watch('borrowAmount');
    let token: string = watch('token');
    const totalCost = Number(borrowAmount) + (borrowAmount*(rate/100)) ;
    return(
        <InputWithSpecification style={{background: 'rgba(255, 193, 87, 0.67)'}}>
            <Container>
                {rate && borrowAmount && token ? `${totalCost} ${token}` : "-"}
            </Container>
            <Specification style={{background: '#EDAE50'}}>
                {token ? token : ''}
            </Specification>
        </InputWithSpecification>
    )
}
export default LoanAmountComponent;