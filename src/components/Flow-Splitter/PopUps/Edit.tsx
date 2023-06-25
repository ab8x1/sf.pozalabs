import { HeaderText, Input, InputLabel, SubmitForm as Button, FormContainer, FormHeader } from "../../Borrow-Against-Salary/Borrow/borrowStyles";
import { PopUpContainer, InputRow, AddButton, Remove, ErrorLabel, OrderCol } from '../SplitterStyles'
import { useForm, SubmitHandler, useFieldArray, useFormState } from "react-hook-form"
import {CreateSplitterFormTypes as CreateSplitterFormTypes, ManageSplitterProps, SplittersChanges, Subscriber} from '../SplitterTypes'
import Image from "next/image"
import {unitsValidationObj, validateAddress} from '../helpers/formHelpers'
import SideShares from "../SideShares"
import MainShares from "../MainShares"
import createOrEditSplitter from "../helpers/createOrEditSplitter";

const newSplitterDefaults = [{address: ""}, {address: ""}]

function Edit({reference, wallet, connectWallet, popUpData, data, closePopUp, setSnackBar, createSplitterData, setSplitters, updateFlows}: ManageSplitterProps){
    const {address, mainReceiver, sideReceiver} = popUpData?.data || {};
    const {subscribers, id, setSplitterSubscribers} = data || {};
    const isNewSplitter = !data;
    const clickToConnect = !wallet && connectWallet ? {onClick: () => connectWallet(false)}  : {}
    const { register, handleSubmit, formState: { errors, isDirty }, control, setFocus, getValues, watch, trigger} = useForm<CreateSplitterFormTypes>({
        defaultValues: {
            mainAddress: mainReceiver?.address || "",
            sideAddress: sideReceiver?.address || "",
            sideUnits: sideReceiver?.units || "",
        },
        mode: 'onChange'
    });

    const { fields, append, remove } = useFieldArray({
        name: "subscribers",
        control
    });

    const onSubmit: SubmitHandler<CreateSplitterFormTypes> = async (data): Promise<void> => {
        const [newAddress, mainReceiverFlow, sideReceiverFlow] = await createOrEditSplitter(
            wallet,
            address ? "edit" : "create",
            getValues().sideUnits,
            getValues().mainAddress,
            getValues().sideAddress,
            address);            
        if(address) updateFlows(sideReceiverFlow, mainReceiverFlow)
        //create new splitter element
        if(!address) setSplitters(st=>{
            const prevArr = st?.length > 0 ? st : [];
            return ([...prevArr, {
                    address: newAddress,
                    sideReceiver: {
                      address: sideReceiver,
                      units: getValues().sideUnits,
                      flow: mainReceiverFlow
                    },
                    mainReceiver: {
                      address: mainReceiver,
                      units: 1000 - getValues().sideUnits,
                      flow: sideReceiverFlow
                    }    
                }])
        })
        
        closePopUp()
    }

    return(
        <PopUpContainer>
            <form onSubmit={handleSubmit(onSubmit)} ref={reference}>
                <FormHeader style={{background: 'linear-gradient(90deg, rgba(252,211,140,1) 0%, rgba(242,195,113,1) 50%, rgba(244,170,42,1) 100%)'}}>
                    <div>
                        <HeaderText>{address ? 'Edit' : 'Create'} Splitter</HeaderText>
                        <HeaderText>Manage your Splitter: choose the side receiver&apos;s shares</HeaderText>
                    </div>
                </FormHeader>
                <FormContainer style={{boxShadow: 'none', padding:'30px'}}>
                    <InputRow>
                        <InputLabel className="hideMobile"></InputLabel>
                        <InputLabel>Receiver</InputLabel>
                        <InputLabel>Units</InputLabel>
                        <InputLabel className="hideMobile" style={{marginLeft: '10px'}}>Shares</InputLabel>
                    </InputRow>
                            <InputRow>
                                <OrderCol className="hideMobile">
                                    <span style={{marginLeft: '4px'}}>Side</span>
                                </OrderCol>
                                <div style={{position: 'relative'}}>
                                    <ErrorLabel>{errors?.sideAddress?.message}</ErrorLabel>
                                    <Input disabled={false} error={!!errors?.sideAddress} type="text" placeholder="Wallet address" {...register(`sideAddress`, { validate: { isValidAddress: address => validateAddress(address, setFocus, 0, getValues)
                                }})} />
                                </div>
                                <div style={{position: 'relative'}}>
                                    <ErrorLabel>{errors?.sideUnits?.message}</ErrorLabel>
                                    <Input disabled={false} error={!!errors?.sideUnits} type="number" min={1} max={999} maxLength={3} placeholder='Units' {...register(`sideUnits`, unitsValidationObj)}/>
                                </div>
                                <SideShares watch={watch} index={0}/>
                            </InputRow>
                            <InputRow>
                                <OrderCol className="hideMobile">
                                    <span style={{marginLeft: '4px'}}>Main</span>
                                </OrderCol>
                                <div style={{position: 'relative'}}>
                                    <ErrorLabel>{errors?.mainAddress?.message}</ErrorLabel>
                                    <Input disabled={false} error={!!errors?.mainAddress} type="text" placeholder="Wallet address" {...register(`mainAddress`, { validate: { isValidAddress: address => validateAddress(address, setFocus, 0, getValues)}})} />
                                </div>
                                <div style={{position: 'relative'}}>
                                <ErrorLabel>{errors?.mainUnits?.message}</ErrorLabel>
                                    <Input disabled={true} error={!!errors?.mainUnits} type="number" min={1} placeholder='Units' value={1000 - watch('sideUnits')}/>
                                </div>
                                <MainShares watch={watch} index={1}/>
                            </InputRow>
                    <Button $disabled={!isDirty} type={wallet ? "submit" : "button"} {...clickToConnect} style={{width: '100%'}}>
                        {wallet ? `${address ? 'Edit' : 'Create'} Splitter` : "Connect Wallet"}
                    </Button>
                </FormContainer>
            </form>
        </PopUpContainer>
    )
}
export default Edit;