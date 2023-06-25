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

function SideShares({watch, index}: SharesPropsTypes){
    const val = watch('sideUnits');
    const allUnits = 1000;
    const unit = val || 0;
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

export default SideShares;