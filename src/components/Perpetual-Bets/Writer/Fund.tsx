import { useState, useEffect, useRef } from "react";
import { DialogBg } from "../../Borrow-Against-Salary/Offers/offersStyles";
import { ethers } from "ethers";
import { HeaderText, Input, InputLabel, SubmitForm as Button, FormContainer, FormHeader, InputContainer, DoubleContainer, Value} from "../../Borrow-Against-Salary/Borrow/borrowStyles";
import { PopUpContainer, InputRow, AddButton, Remove, ErrorLabel } from '../../Instant-Distribution/Manage-Agreement/AgreementStyles'
import Image from "next/image"
import { TransferDistributeProps } from "../../Instant-Distribution/Manage-Agreement/AgreementTypes";
import { shortenAdress } from "../../Navbar/TopNavbar";
import distribute from "../../Instant-Distribution/Manage-Agreement/helpers/distribute";
import transfer from '../../Instant-Distribution/Manage-Agreement/helpers/transfer';
import OnClickOutside from '../../../hooks/useClickOutside';
import { FundProps } from "./WriterTypes";

function Transfer({setPopUp, wallet, assets, setAssets, address }: FundProps){
    const ref : any = useRef();
    OnClickOutside(ref, () => setPopUp(false))
    const [amount, setAmount] = useState<number | undefined>();
    const submit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        const submitData = async () => {
            try{
                if(address && amount && setAssets && assets !== undefined){
                    setAssets(undefined);
                    await transfer(wallet, amount, address);
                    setAssets(amount + assets);
                }
            }
            catch(e){
                if(setAssets) setAssets(assets);
            }
        }
        submitData();
    }
    return(
        <DialogBg>
            <PopUpContainer style={{maxWidth: '600px'}} ref={ref}>
                <FormHeader style={{background: 'linear-gradient(90deg, rgba(252,211,140,1) 0%, rgba(242,195,113,1) 50%, rgba(244,170,42,1) 100%)'}}>
                    <div>
                        <HeaderText>Top up agreement</HeaderText>
                    </div>
                </FormHeader>
                <FormContainer style={{boxShadow: 'none'}}>
                    <form onSubmit={submit}>
                        <DoubleContainer  style={{margin: '10px 0 30px 0', gridTemplateColumns: '0.75fr 0.25fr'}}>
                            <InputContainer>
                                <InputLabel>Amount</InputLabel>
                                <Input error={false} type="number" step="0.1" required placeholder="Type amount" onChange={e => setAmount(Number(e.target.value))}/>
                            </InputContainer>
                            <InputContainer>
                                <InputLabel>Token</InputLabel>
                                <Value>fDaix</Value>
                            </InputContainer>
                        </DoubleContainer>
                        <div style={{margin: '10px 0 30px 0'}}>
                            Total assets in agreement after transaction:
                            <span style={{margin: '0 7px', fontWeight: 'bold'}}>{(assets || 0) + (amount || 0)} fDaix</span>
                        </div>
                        <Button style={{backgroundColor: "#64B5F6", color: "white", width: '100%'}} $disabled={!amount}>Confirm</Button>
                    </form>
                </FormContainer>
            </PopUpContainer>
        </DialogBg>
    )
}
export default Transfer;