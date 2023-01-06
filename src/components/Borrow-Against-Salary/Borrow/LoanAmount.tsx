import {UseFormWatch} from 'react-hook-form'
import {BorrowFormTypes} from './borrowTypes'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    align-items: center;
    flex: 1;
    font-weight: bold;
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
        <Container>
            {rate && borrowAmount && token ? `${totalCost} ${token}` : ""}
        </Container>
    )
}
export default LoanAmountComponent;