import {SharesPropsTypes} from './SplitterTypes'
import styled from 'styled-components'

const FlowContainer = styled.div`
    display: flex;
    flex-direction: column;
    order: 3;
    width: 100%;
    overflow: hidden;
    margin-top: 30px;
    @media(min-width: 768px){
        order: inherit;
        margin-left: 15px;
        margin-top: unset;
    }
`

const DisplayFlow = styled.div`
    display: flex;
    flex: 1;
    & div{
        margin: 0 5px;
    }
    @media(min-width: 768px){
        flex-direction: column;
        justify-content: center;
        & div{
            margin: 1px 0;
        }
    }
`

function Flow({watch, index, totalOutflow}){
    const vals = watch('receivers');
    const totalFlow = vals.reduce((acc, val) => acc + (Number(val?.flow) || 0), 0);

    const unit = vals[index]?.units || 0;
    const allUnits = vals.reduce((acc, val) => acc + (Number(val?.units) || 0), 0);
    const ownedUnitsRatio = unit / allUnits;
    const displayFlow = totalOutflow * ownedUnitsRatio;
    return(
        <FlowContainer>
            <DisplayFlow>
            <div><b>{displayFlow ? displayFlow.toFixed(2) : 0}</b></div>
            </DisplayFlow>
        </FlowContainer>
    )
}

export default Flow;