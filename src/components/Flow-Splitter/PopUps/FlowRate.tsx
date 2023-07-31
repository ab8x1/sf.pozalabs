import {useRef, useState, useEffect} from 'react'
import { ethers } from 'ethers'
import OnClickOutside from '../../../../modules/Select/helpers/onClickOutside'
import {FlowRateProps} from './offersTypes'
import {DialogBg, DialogContainer, ActionButton, TokenPerMounth} from './offersStyles'
import {InputContainer, Input, InputLabel, Error} from './borrowStyles'
import manageFlow from './manageFlow'
import { fetchReceiversAndOutflow, getSplitterContract, fetchSplitterSingle } from '../helpers/getSplitters'

const transactionCB = async (tx: any, updateData: (() => void)) => {
    await tx?.wait();
    updateData();
}

function FlowRate({setShowFlowRate, wallet, flowSplitterAddress, defaultFlowRate, actualFlowRate, setSnackBar, setActualFlowRate, setTotalOutflow, setReceivers}: FlowRateProps){
    const [flowRate, setFlowRate] = useState<number | undefined>();
    const [rawFlowRate, setRawFlowRate] = useState(0);
    const [error, setError] = useState("");

    const ref: any = useRef();

    const closePopUp = () => {
        setShowFlowRate(false);
        document.body.style.overflowY = "auto";
    }

    OnClickOutside(ref, () => {
        closePopUp();
    });

    useEffect(() => {
        if(actualFlowRate) calculateFlowRate(actualFlowRate);
    }, [])

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
        if(typeof val !== "number" || isNaN(val) === true || val <= 0){
            setError("Must be positive number");
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
            const tx = await manageFlow(type, wallet, flowSplitterAddress, flowRate);
            setActualFlowRate(undefined);
            const updateData = async () => {
                const typeMessage = type === 'updateFlow' ? 'update' : type === 'createFlow' ? 'create' : 'delete';
                setSnackBar({
                    isOpened: true,
                    message:  `Success! Your ${typeMessage} flow request has succeeded`,
                    status: "success"
                });
                setActualFlowRate(type === "deleteFlow" ? 0 : rawFlowRate);
                const flowSplitter = getSplitterContract(flowSplitterAddress, wallet.provider);
                const [receiverAddrs, totalOutflow] = await fetchReceiversAndOutflow(flowSplitter);
                setTotalOutflow(totalOutflow);
            }
            await tx.wait();
            transactionCB(tx, updateData);
            closePopUp();
        }
        catch(e){
            console.log(e);
            setSnackBar({isOpened: true, status: "error", message: "Sorry, something went wrong. Please try again soon"})
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
                        defaultValue={actualFlowRate || ""}
                        placeholder="Amount /month in dollars"
                        style={error ? {borderColor: 'red'} : {}}
                    />
                </InputContainer>
                <TokenPerMounth>
                    <b style={error ? {color: 'red'} : {}}>Your FlowRate is: {flowRate}</b>
                </TokenPerMounth>
                <InputContainer style={{marginTop: '30px'}}>
                    <ActionButton $disabled={!flowRate || !!error} style={{margin: 0}} value={actualFlowRate ? "updateFlow" : "createFlow"} onClick={lendAction}>{actualFlowRate && actualFlowRate > 0 ? 'Change' : 'Activate'} flow</ActionButton>
                    <ActionButton $disabled={!actualFlowRate} style={{margin: '20px 0 0 0', backgroundColor: "red"}} value="deleteFlow" onClick={lendAction}>Delete flow</ActionButton>
                </InputContainer>
            </DialogContainer>
        </DialogBg>
    )
}
export default FlowRate;