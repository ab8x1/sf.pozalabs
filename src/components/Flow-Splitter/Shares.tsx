import {SharesPropsTypes} from './SplitterTypes'
import styled from 'styled-components'

const SharesContiner = styled.div`
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

const DisplayShares = styled.div`
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

function Shares({watch, index}: SharesPropsTypes){
    const vals = watch('receivers');
    const allUnits = vals.reduce((acc, val) => acc + (Number(val?.units) || 0), 0);
    const unit = vals[index]?.units || 0;
    const owned = ((unit / allUnits) * 100);
    return(
        <SharesContiner>
            <DisplayShares>
            <div><b>{`${owned ? owned.toFixed(2) : 0}%`}</b></div>
            <div>{`(${unit}/${allUnits})`}</div>
            </DisplayShares>
        </SharesContiner>
    )
}

export default Shares;