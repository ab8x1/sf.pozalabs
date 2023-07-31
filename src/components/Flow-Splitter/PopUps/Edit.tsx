import { HeaderText, Input, InputLabel, SubmitForm as Button, FormContainer, FormHeader } from "../../Borrow-Against-Salary/Borrow/borrowStyles";
import { PopUpContainer, InputRow, AddButton, Remove, ErrorLabel, OrderCol } from '../SplitterStyles'
import { useForm, SubmitHandler, useFieldArray, useFormState } from "react-hook-form"
import {CreateSplitterFormTypes as CreateSplitterFormTypes, ManageSplitterProps, SplittersChanges, SubscriberNew} from '../SplitterTypes'
import Image from "next/image"
import {unitsValidationObj, validateAddress} from '../helpers/formHelpers'
import Shares from "../Shares"
import Flow from "../Flow"
import MainShares from "../MainShares"
import createOrEditSplitter from "../helpers/createOrEditSplitter";

const newSplitterDefaults = [{address: ""}, {address: ""}]

function Edit({reference, wallet, connectWallet, popUpData, data, closePopUp, setSnackBar, createSplitterData, setSplitters, setReceivers, totalOutflow}: ManageSplitterProps){
    const {setSplitter, setNewSplitterLoading} = createSplitterData || {};
    const {address} = popUpData?.data || {};
    const {address:splitterAddress, receivers} = data || {};
    const isNewSplitter = !splitterAddress;
    const clickToConnect = !wallet && connectWallet ? {onClick: () => connectWallet(false)}  : {}
    const { register, handleSubmit, formState: { errors, isDirty }, control, setFocus, getValues, watch, trigger} = useForm<CreateSplitterFormTypes>({
        defaultValues: {
            receivers: receivers || newSplitterDefaults
        },
        mode: 'onChange'
    });

    const { fields, append, remove } = useFieldArray({
        name: "receivers",
        control
    });

    const addNewSubscriber = () => {
        append({address: "", new: true, units: undefined, flow:0});
    }

    const removeSubscriber = (index: number) => {
        const lengthAfterRemove = fields.length - 1;
        remove(index);
        if(index !== 0 || lengthAfterRemove > 1)
            trigger('receivers')
    }

    const onSubmit: SubmitHandler<CreateSplitterFormTypes> = async (data): Promise<void> => {
        (document.activeElement as HTMLElement).blur();
        let changes: SplittersChanges[] = [];
        const defaultReceivers = [...(receivers || [])];
        data.receivers.forEach(({address, units}, i) => {
            const numUnits = Number(units) || 0;
            const addressExistsIndex = defaultReceivers.findIndex(s => s?.address === address);
            if(addressExistsIndex >= 0){
                const addressExists = defaultReceivers.splice(addressExistsIndex, 1)[0];
                const type = numUnits === addressExists.units ? "noChange" : numUnits > addressExists.units ? "gain" : numUnits < addressExists.units ? "lose" : "noChange";
                changes.push({
                    address,
                    type,
                    units: numUnits
                })
            }
            else changes.push({address, type: "new", units: numUnits});
        });

        const applyChanges = async () => {
            try{
                if(changes.every(change => change.type === "noChange")){
                    setSnackBar({
                        isOpened: true,
                        message:  `No changes detected`,
                        status: "warning"
                    });
                }
                else{
                    if(!isNewSplitter && setReceivers)
                    setReceivers(undefined);
                    else if(isNewSplitter && setNewSplitterLoading)
                        setNewSplitterLoading(true);

                    const newId = await createOrEditSplitter(wallet, !receivers ? "create" : "edit", changes, splitterAddress);
                    const editedReceivers: SubscriberNew[] = data.receivers
                        .filter(({ units }) => Number(units) > 0)
                        .map(({address, units, flow}) => ({address, units: Number(units) || 0, flow: flow}));
                    console.log(`editedReceivers:`)
                    console.log(editedReceivers)

                    setSnackBar({
                        isOpened: true,
                        message:  `Success! Your request has succeeded`,
                        status: "success"
                    });

                    if(!isNewSplitter && setReceivers)
                        setReceivers(editedReceivers);
                    else if(isNewSplitter && setNewSplitterLoading && setSplitters){
                        const newSplitter = {
                            address: newId,
                            totalOutflow: 0,
                            receivers: editedReceivers
                        }
                        console.log("newSplitter: ",newSplitter);
                        setNewSplitterLoading(false);
                        setSplitters(st => {
                            if(st && st.length > 0) return [...st, newSplitter];
                            else return [newSplitter];
                        });
                    }
                }
            }
            catch(e){
                if(setNewSplitterLoading) setNewSplitterLoading(false);
                if(setReceivers) setReceivers(receivers);
                setSnackBar({
                    isOpened: true,
                    message:  `Sorry, something went wrong. Please try again soon`,
                    status: "error"
                });
                console.log(e)
            }
        }
        applyChanges();       
        closePopUp();
    }

    return(
        <PopUpContainer>
            <form onSubmit={handleSubmit(onSubmit)} ref={reference}>
                <FormHeader style={{background: 'linear-gradient(90deg, rgba(252,211,140,1) 0%, rgba(242,195,113,1) 50%, rgba(244,170,42,1) 100%)'}}>
                    <div>
                        <HeaderText>{address ? 'Edit' : 'Create'} Splitter</HeaderText>
                        <HeaderText>Manage your Splitter: manage receivers and edit their shares</HeaderText>
                    </div>
                </FormHeader>
                <FormContainer style={{boxShadow: 'none', padding:'30px'}}>
                    <InputRow>
                        <InputLabel className="hideMobile"></InputLabel>
                        <InputLabel>Receiver</InputLabel>
                        <InputLabel>Units</InputLabel>
                        <InputLabel>Flow/month</InputLabel>
                        <InputLabel className="hideMobile" style={{marginLeft: '10px'}}>Shares</InputLabel>
                    </InputRow>               
                            {
                                fields.map((field, index) =>
                                    <InputRow key={index}>
                                    <OrderCol className="hideMobile">
                                        <span style={{marginLeft: '4px'}}>{index + 1}</span>
                                    </OrderCol>
                                    <div style={{position: 'relative'}}>
                                        <ErrorLabel>{errors?.receivers?.[index]?.address?.message}</ErrorLabel>
                                        <Input disabled={false} error={!!errors?.receivers?.[index]?.address} type="text" placeholder="Wallet address" {...register(`receivers.${index}.address`, { validate: { isValidAddress: address => validateAddress(address, setFocus, index, getValues)
                                    }})} />
                                    </div>
                                    <div style={{position: 'relative'}}>
                                        <ErrorLabel>{errors?.receivers?.[index]?.units?.message}</ErrorLabel>
                                        <Input min={0} disabled={false} error={!!errors?.receivers?.[index]?.units} type="number" placeholder='Units' {...register(`receivers.${index}.units`, unitsValidationObj)}/>
                                    </div>
                                    <Flow watch={watch} index={index} totalOutflow={totalOutflow}/>
                                    <Shares watch={watch} index={index}/>
                                </InputRow>
                                )
                        }
                    <Button $disabled={false} type={"button"} onClick={addNewSubscriber} style={{backgroundColor: "#ffeb3b", width: '100%'}}>
                        Add receiver
                        <Image src="/add.png" width={20} height={20} alt="add"/>
                    </Button>
                    <Button $disabled={!isDirty} type={wallet ? "submit" : "button"} {...clickToConnect} style={{width: '100%'}}>
                        {wallet ? `${address ? 'Edit' : 'Create'} Splitter` : "Connect Wallet"}
                    </Button>
                </FormContainer>
            </form>
        </PopUpContainer>
    )
}
export default Edit;