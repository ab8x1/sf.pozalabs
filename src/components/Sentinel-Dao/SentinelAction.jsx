import {DialogBg, DialogContainer, ActionButton, TokenPerMounth} from '../Borrow-Against-Salary/Offers/offersStyles';
import { FormHeader, HeaderText } from '../Borrow-Against-Salary/Borrow/borrowStyles';
import { InputContainer, Input, InputLabel } from '../Borrow-Against-Salary/Borrow/borrowStyles';
import {useRef, useState, useEffect} from 'react'
import { ButtonsMenu } from './SentinelDaoStyles';
import OnClickOutside from '../../hooks/useClickOutside'
import picActions, {getMaxFctn} from './helpers/picActions';
import { Icon } from '../Navbar/navbarStyles';

const picCb = async (wallet, amount, setSnackBar, manageState, data) => {
    try{
        await picActions(wallet, amount, manageState, data);
        setSnackBar({
            isOpened: true,
            status: "success",
            message: "You request has succeeded"
        })
    }
    catch(e){
        const {reason} = e;
        setSnackBar({
            isOpened: true,
            status: "error",
            message:  reason.charAt(0).toUpperCase() + reason.slice(1)
        })
    }
}

function SentinelAction({closeDialog, wallet, setSnackBar, data}){
    const [manageState, setManageState] = useState('menu');
    const [amount, setAmount] = useState(0);
    const ref = useRef();

    OnClickOutside(ref, () => {
        closeDialog();
    });

    const picAction = (state) => {
        picCb(wallet, amount, setSnackBar, state || manageState, data);
    }

    const changeAmount = e => {
        setAmount(e.target.value);
    }

    useEffect(() => {
        if(manageState === "become")
            setAmount(data['daoFunds'])
    }, [manageState])

    const getMax = async () => {
        const balance = await getMaxFctn(wallet);
        console.log(balance);
        setAmount(balance)
    }

    return(
        <DialogBg>
            <DialogContainer ref={ref} style={{padding: 0}}>
                <FormHeader style={{background: 'linear-gradient(90deg, rgba(252,211,140,1) 0%, rgba(242,195,113,1) 50%, rgba(244,170,42,1) 100%)'}}>
                    <Icon src="/navbar/sentinel-dao.svg" style={{marginRight: '0px', width: '35px', height: '35px'}}/>
                    <div>
                        <HeaderText>Manage Sentinel</HeaderText>
                        <HeaderText>Tap into Sentinel's profitability</HeaderText>
                    </div>
                </FormHeader>
                <div className='container'>
                    {
                        manageState === 'menu' ?
                        <ButtonsMenu>
                            <ActionButton onClick={() => setManageState("fund")}>Fund Sentinel</ActionButton>
                            <ActionButton onClick={() => setManageState("become")}>Become Sentinel</ActionButton>
                            <ActionButton onClick={() => setManageState("redeemFunds")}>Reedem Funds</ActionButton>
                            <ActionButton onClick={() => picAction("redeemStake")}>Redeem Sentinel Stake</ActionButton>
                            <ActionButton onClick={() => setManageState("simulate")}>Simulate Rewards</ActionButton>
                        </ButtonsMenu>
                        :
                        <div>
                            <div style={{display: 'flex', alignItems: 'center', margin: '20px 0 20px 0'}}>
                                <img src="/arrow.svg" style={{transform: 'rotate(90deg)', cursor: 'pointer', marginRight: '10px', height: '16px', width: '16px'}} onClick={() => setManageState("menu")}/>
                                <label>Type amount</label>
                            </div>
                            <InputContainer style={{marginTop: '10px'}}>
                                <Input type="number" placeholder='Amount' value={amount} onChange={changeAmount}/>
                            </InputContainer>
                            <div style={{display: 'flex', justifyContent: 'space-between', margin: '10px 0 20px 0'}}>
                                <ActionButton onClick={e => picAction(null)} style={{margin: '0'}}>
                                    {manageState === "fund" ? "Fund Sentinel" : manageState === "become" ? "Become Sentinel" : manageState === "simulate" ? "Simulate Rewards" : "Reedem Funds"}
                                </ActionButton>
                                {
                                    manageState === "redeemFunds" &&
                                    <ActionButton onClick={getMax} style={{margin: '0', backgroundColor: 'black'}}>
                                        Max.
                                    </ActionButton>
                                }
                            </div>
                        </div>
                    }
                </div>
            </DialogContainer>
        </DialogBg>
    )
}
export default SentinelAction;