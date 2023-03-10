import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { HeaderText, Input, InputLabel, SubmitForm as Button, FormContainer, FormHeader, InputContainer, DoubleContainer, Value} from "../../../Borrow-Against-Salary/Borrow/borrowStyles";
import { PopUpContainer, InputRow, AddButton, Remove, ErrorLabel } from '../AgreementStyles'
import Image from "next/image"
import {TransferDistributeProps} from '../AgreementTypes'
import { shortenAdress } from "../../../Navbar/TopNavbar";
import distribute from "../helpers/distribute";
import transfer from '../helpers/transfer'

function Transfer({reference, wallet, data, type, allUnits, closePopUp, setSnackBar}: TransferDistributeProps){
    const [amount, setAmount] = useState<number | undefined>();
    const {id, assets, setAssets} = data || {};
    const assetsLeft = (assets || 0) - (amount || 0);
    const {subscribers} = data || {};
    const submit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        const submitData = async () => {
            try{
                if(type==="transfer" && id && amount && setAssets && assets !== undefined){
                    setAssets(undefined);
                    await transfer(wallet, amount, id);
                    setAssets(amount + assets);
                }
                else if(type === "distribute" && id && amount && setAssets && assets !== undefined){
                    setAssets(undefined);
                    await distribute(wallet, id, amount);
                    setAssets(assets - amount);
                }
                setSnackBar({
                    isOpened: true,
                    status: "success",
                    message: "Success! Your request has succeeded"
                })
            }
            catch(e){
                if(setAssets) setAssets(assets);
                setSnackBar({
                    isOpened: true,
                    status: "error",
                    message: "Sorry, something went wrong. Please try again soon"
                })
            }
        }
        submitData();
        closePopUp();
    }
    return(
        <PopUpContainer style={{maxWidth: '600px'}} ref={reference}>
            <FormHeader style={{background: 'linear-gradient(90deg, rgba(252,211,140,1) 0%, rgba(242,195,113,1) 50%, rgba(244,170,42,1) 100%)'}}>
                <div>
                    <HeaderText>{type === "transfer" ? "Top up agreement" : "Distribute assets" }</HeaderText>
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
                        {
                            type === "transfer" ?
                            <>
                                Total assets in agreement after transaction:
                                <span style={{margin: '0 7px', fontWeight: 'bold'}}>{(assets || 0) + (amount || 0)} fDaix</span>
                            </>
                            :
                            <>
                            {
                                subscribers?.map(({address, units}, i) =>
                                    <p key={i}>
                                        <b>{shortenAdress(address)}</b> will get <b>{((amount || 0) * (units/allUnits)).toFixed(2)} fDAIx</b> <span>({((units/allUnits)*100).toFixed(2)}%)</span>
                                    </p>
                                )
                            }
                                <p>
                                    Assets in agreement after transaction: <span style={assetsLeft >= 0 ? {color: 'green'} : {color: 'red'}}><b>{assetsLeft} fDaix</b></span>
                                </p>
                            </>
                        }
                    </div>
                    <Button style={{backgroundColor: "#64B5F6", color: "white", width: '100%'}} $disabled={!amount || (type==="distribute" && assetsLeft < 0)}>Confirm</Button>
                </form>
            </FormContainer>
        </PopUpContainer>
    )
}
export default Transfer;