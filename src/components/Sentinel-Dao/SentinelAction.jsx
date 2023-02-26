import {DialogBg, DialogContainer, ActionButton, TokenPerMounth} from '../Borrow-Against-Salary/Offers/offersStyles';
import { FormHeader } from '../Borrow-Against-Salary/Borrow/borrowStyles';
import { InputContainer, Input, InputLabel } from '../Borrow-Against-Salary/Borrow/borrowStyles';
import {useRef, useState, useEffect} from 'react'
import { ButtonsMenu } from './SentinelDaoStyles';
import OnClickOutside from '../../hooks/useClickOutside'

function SentinelAction({closeDialog}){
    const [manageState, setManageState] = useState('menu');
    const ref = useRef();

    OnClickOutside(ref, () => {
        closeDialog();
    });

    return(
        <DialogBg>
            <DialogContainer ref={ref} style={{padding: 0}}>
                <FormHeader style={{background: 'linear-gradient(90deg, rgba(252,211,140,1) 0%, rgba(242,195,113,1) 50%, rgba(244,170,42,1) 100%)'}}>
                    <h3>Manage Sentinel</h3>
                </FormHeader>
                <div className='container' style={{minHeight:'250px'}}>
                    {
                        manageState === 'menu' ?
                        <ButtonsMenu>
                            <ActionButton onClick={() => setManageState("fund")}>Fund Sentinel</ActionButton>
                            <ActionButton>Become Setinel</ActionButton>
                            <ActionButton>Reedem Funds</ActionButton>
                            <ActionButton>Redeem Setinel stake</ActionButton>
                        </ButtonsMenu>
                        :
                        <div>
                            <img src="/arrow.svg" style={{transform: 'rotate(90deg)', marginTop: '15px', cursor: 'pointer'}} onClick={() => setManageState("menu")}/>
                            <InputContainer style={{marginTop: '10px'}}>
                                <InputLabel>Type amount</InputLabel>
                                <Input type="text"/>
                            </InputContainer>
                            <ActionButton style={{margin: '20px 0'}}>Fund Setinel</ActionButton>
                        </div>
                    }
                </div>
            </DialogContainer>
        </DialogBg>
    )
}
export default SentinelAction;