import {useRef, useState, useEffect} from 'react'
import { ethers } from 'ethers'
import OnClickOutside from '../../../../modules/Select/helpers/onClickOutside'
import { BuyerFlowRate } from './BuyerTypes';
import {DialogBg, DialogContainer, ActionButton, TokenPerMounth} from '../../Borrow-Against-Salary/Offers/offersStyles';
import {InputContainer, Input, InputLabel, Error} from '../../Borrow-Against-Salary/Borrow/borrowStyles';
import employerFlow from '../../Borrow-Against-Salary/Offers/helpers/employerFlow';

const transactionCB = async (tx: any, updateData: (() => void)) => {
    await tx?.wait();
    updateData();
}

function FlowRate({setFlowRatePopUp, wallet, address, setActualFlowRate, actualFlowRate, setNewBuyer, minPaymentFlowRate}: BuyerFlowRate){
    const [flowRate, setFlowRate] = useState<number | undefined>();
    const [rawFlowRate, setRawFlowRate] = useState(0);
    const [error, setError] = useState("");
    const minFlow = Number(minPaymentFlowRate) * 3600 * 24 * 30;
    const minDefaultFlow = Math.round((minFlow + Number.EPSILON) * 100) / 100;
    const ref: any = useRef();

    const closePopUp = () => {
        setFlowRatePopUp(false);
        document.body.style.overflowY = "auto";
    }

    OnClickOutside(ref, () => {
        closePopUp();
    });

    const calculateFlowRate = (amountInEther: number) => {
        try{
            const monthlyAmount = ethers.utils.parseEther(amountInEther.toString());
            const calculatedFlowRate = Math.floor(Number(monthlyAmount) / 3600 / 24 / 30);
            setFlowRate(calculatedFlowRate);
            if(error) setError("");
        }
        catch(e){
            setError("Value outside range");
            setFlowRate(undefined);
        }
      }

    const handleFlowRateChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const rawVal = e.target.value;
        const val = Number(rawVal);
        if(typeof val !== "number" || isNaN(val) === true || val < minDefaultFlow){
            setError(`Min flow: ${minDefaultFlow}`);
            setFlowRate(undefined);
        }
        else{
            setRawFlowRate(val);
            calculateFlowRate(val);
        }

    }

    const lendAction = async (e: React.MouseEvent<HTMLButtonElement>) => {
        try{
            const type = (e.target as HTMLButtonElement).value;
            const tx = await employerFlow(type, wallet, address, flowRate);
            setActualFlowRate(undefined);
            const updateData = () => {
                setActualFlowRate(rawFlowRate);
                setNewBuyer(wallet?.adress || "");
            }
            transactionCB(tx, updateData);
            closePopUp();
        }
        catch(e){
            console.log(e);
        }
    }

    return(
        <DialogBg>
            <DialogContainer ref={ref}>
                <h3>Specify new flow rate</h3>
                <InputContainer>
                    <InputLabel>Flow rate /month <span style={error ? {color: 'red'} : {}}>{error}</span></InputLabel>
                    <Input
                        type="number"
                        step="any"
                        error={!!error}
                        name="flowRate"
                        onChange={handleFlowRateChange}
                        defaultValue={""}
                        placeholder={`Min flow rate: ${minDefaultFlow}`}
                        style={error ? {borderColor: 'red'} : {}}
                        min={minDefaultFlow}
                    />
                </InputContainer>
                <TokenPerMounth>
                    <b style={error ? {color: 'red'} : {}}>Your FlowRate is: {flowRate}</b>
                </TokenPerMounth>
                <InputContainer style={{marginTop: '30px'}}>
                    <ActionButton $disabled={!flowRate || !!error} style={{margin: 0}} value="createFlow" onClick={lendAction}>
                        Activate flow
                    </ActionButton>
                </InputContainer>
            </DialogContainer>
        </DialogBg>
    )
}
export default FlowRate;
