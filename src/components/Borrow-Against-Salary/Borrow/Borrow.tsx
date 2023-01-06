import { useContext, useEffect, useState } from "react"
import {ethers} from 'ethers'
import { BorrowForm, FormName, InputContainer, Input, InputLabel, DoubleContainer, SubmitForm, Value, Error, FormContainer, FormImg } from "./borrowStyles";
import { GlobalCTX } from '../../App'
import { GlobalContextProps } from '../../App/appTypes'
import Select from "../../../../modules/Select"
import { useForm, SubmitHandler  } from "react-hook-form"
import {BorrowFormTypes} from './borrowTypes'
import Controller from './Controller'
import LoanAmount from './LoanAmount'
import Image from "next/image"
import {deployLoan} from './deployLoan'
import SnackBar from '../../../../modules/SnackBar'


const tokenItems = [["fDAIx", "/dai.png"]].map(([item, url], i) => ({value: item, label: item, id: i, iconUrl: url}));
const customControlColors = {
    unfocused: "#E0E0E0",
    focused: "rgb(16, 187, 53)"
}
const customSelectStyles = {
    control: `
        border-radius: 0 12px 12px 0;
    `,
}

type SnackBarObj = {isOpened: boolean, status: "success" | "warning" | "error", message: string};

const transactionCB = async (tx: any, updateData: (() => void)) => {
    await tx?.wait();
    updateData();
}

function BorrowComponent(){
    const [loading, setLoading] = useState(false);
    const [snackBar, setSnackBar] = useState<SnackBarObj>({isOpened: false, status: "success", message: ""});
    const {wallet, connectWallet} = useContext(GlobalCTX) as GlobalContextProps;
    const { register, handleSubmit, watch, formState: { errors }, formState, setValue, control, getValues, trigger } = useForm<BorrowFormTypes>();
    const submitAction = wallet ? {} : {onClick: () => connectWallet(false)};

    const onSubmit: SubmitHandler<BorrowFormTypes> = async (data): Promise<void> => {
        if(wallet?.network.name === "goerli"){
            const {borrower, employer, borrowAmount, rate, period} = data;
            try{
                setLoading(true);
                const tx = await deployLoan(wallet, borrower, employer, borrowAmount, rate, period);
                const updateDataCb = () =>{
                    setLoading(false);
                    setSnackBar({isOpened: true, status: "success", message: "Success! Your loan request has succeeded"});
                }
                transactionCB(tx, updateDataCb);
            }
            catch(e){
                console.log(e);
                setSnackBar({isOpened: true, status: "error", message: "Sorry, something went wrong. Please try again soon"})
                setLoading(false);
            }
        }
        else{
            alert("Change network to goerli")
        }

    };

    useEffect(() => {
        const checkWallet = async (): Promise<void> => {
            if(wallet) {
                setValue('borrower', wallet.adress);
                await trigger('borrower');
            };
        }
        checkWallet();
    }, [wallet])

    return(
        <BorrowForm onSubmit={handleSubmit(onSubmit)}>
            <FormImg>
                <FormName>Create borrow request</FormName>
                <Image quality={100} src="/galaxy.jpeg" fill style={{backgroundSize: 'cover', objectFit: 'cover'}} alt="galaxy"/>
            </FormImg>
            <FormContainer>
                <InputContainer>
                    <InputLabel>Borrower address <Error>{errors?.borrower?.message}</Error></InputLabel>
                    <Input disabled={true} type="text" defaultValue={wallet?.adress || ""} {...register("borrower", { validate: {
                                    isValidAdress: adress => ethers.utils.isAddress(adress) ? true : "Wrong address"}})} error={!!errors?.borrower}/>
                </InputContainer>
                <InputContainer>
                    <InputLabel>Employer address <Error>{errors?.employer?.message}</Error></InputLabel>
                    <Input type="text" {...register("employer", { validate: {
                                    isValidAdress: adress => adress === getValues('borrower') ? "Must be different than borrowers" : !ethers.utils.isAddress(adress) ? "Wrong address" : true}})} error={!!errors?.employer}/>
                </InputContainer>
                <DoubleContainer>
                    <InputContainer>
                        <InputLabel>Borrow amount <Error>{errors?.borrowAmount?.message}</Error></InputLabel>
                        <Input type="number" step="any" min={0} {...register("borrowAmount", {required: {value: true, message: "Required"}, validate: {isValidAmount: amount => amount > 0 ? true : "Must be > 0"}})} error={!!errors?.borrowAmount} style={{borderRadius: '12px 0 0 12px'}}/>
                    </InputContainer>
                    <InputContainer>
                        <InputLabel>Token <Error>{errors?.token && "Required"}</Error></InputLabel>
                        <Controller
                            Component={Select}
                            componentProps={{
                                    Placeholder: "Select a token",
                                    items: tokenItems,
                                    customControlColors: customControlColors,
                                    customStyles: customSelectStyles,
                                    error: errors?.token
                            }}
                            control={control}
                            name="token"
                            required={true}
                            key="token"
                        />
                    </InputContainer>
                </DoubleContainer>
                <DoubleContainer>
                    <InputContainer>
                        <InputLabel>Payback period <Error>{errors?.period?.message}</Error></InputLabel>
                        <Input placeholder="i.e 12" step="1" type="number" min="1" max="120" {...register("period", {required:{value: true, message: "Required"}, max: {value: 120, message: "Max: 120"}, min: {value: 1, message: "Min: 1"}})} error={!!errors?.period}/>
                    </InputContainer>
                    <InputContainer>
                        <InputLabel/>
                        <Value>months</Value>
                    </InputContainer>
                </DoubleContainer>
                <DoubleContainer>
                    <InputContainer>
                        <InputLabel>Interest rate in % <Error>{errors?.rate?.message}</Error></InputLabel>
                        <Input min={0} max={100} placeholder="i.e. 5" step="1" type="number" {...register("rate", {required: {value: true, message: "Required"}, validate: {
                                    isValidRate: amount => amount >= 0 && amount <= 100 ? true : "Between 0 and 100"}})} error={!!errors?.rate}/>
                    </InputContainer>
                    <InputContainer style={{marginLeft: '20px'}}>
                        <InputLabel>Total cost:</InputLabel>
                        <LoanAmount watch={watch}/>
                    </InputContainer>
                </DoubleContainer>
                <SubmitForm disabled={(!formState.isValid && formState.isSubmitted) || loading} type={wallet ? "submit" : "button"} {...submitAction}>{loading ? "Loading..." : wallet ? 'Send Borrow Request' : 'Connect Wallet'}</SubmitForm>
            </FormContainer>
            {snackBar.isOpened &&
                <SnackBar
                    status={snackBar.status}
                    message={snackBar.message}
                    closeSnackBar={() => setSnackBar(st => ({...st, isOpened: false}))}
                />
            }
        </BorrowForm>
    )
}
export default BorrowComponent;