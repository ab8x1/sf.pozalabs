import { FormName, Input, InputLabel, SubmitForm as Button, FormContainer, FormImg } from "../../../Borrow-Against-Salary/Borrow/borrowStyles";
import { PopUpContainer, InputRow, AddButton, Remove, ErrorLabel, OrderCol } from '../AgreementStyles'
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form"
import {CreateAgteementFormTypes, ManageAgreementProps, AgreementsChanges, Subscriber} from '../AgreementTypes'
import Image from "next/image"
import {unitsValidationObj, validateAddress} from '../helpers/formHelpers'
import {gainShare} from '../helpers/gainShare'
import Shares from "../Shares"
import createOrEditAgreement from "../helpers/createOrEditAgreement";

const newAgreementDefaults = [{address: ""}, {address: ""}]

function Edit({reference, wallet, connectWallet, data, closePopUp, setSnackBar, createAgreementData}: ManageAgreementProps){
    const {setAgreements, setNewAgreementLoading} = createAgreementData || {};
    const {subscribers, id, setAgreementSubscribers} = data || {};
    const isNewAgreement = !data;
    const clickToConnect = !wallet && connectWallet ? {onClick: () => connectWallet(false)}  : {}
    const { register, handleSubmit, formState: { errors }, control, setFocus, getValues, watch, trigger} = useForm<CreateAgteementFormTypes>({
        defaultValues: {subscribers: subscribers || newAgreementDefaults},
        mode: 'onChange'
    });
    const { fields, append, remove } = useFieldArray({
        name: "subscribers",
        control
    });

    const addNewSubscriber = () => {
        append({address: "", new: true, units: undefined});
    }

    const removeSubscriber = (index: number) => {
        const lengthAfterRemove = fields.length - 1;
        remove(index);
        if(index !== 0 || lengthAfterRemove > 1)
            trigger('subscribers')
    }

    const onSubmit: SubmitHandler<CreateAgteementFormTypes> = async (data): Promise<void> => {
        (document.activeElement as HTMLElement).blur();
        let changes: AgreementsChanges[] = [];
        const defaultSubscribers = [...(subscribers || [])];
        data.subscribers.forEach(({address, units}, i) => {
            const numUnits = Number(units) || 0;
            const addressExistsIndex = defaultSubscribers.findIndex(s => s?.address === address);
            if(addressExistsIndex >= 0){
                const addressExists = defaultSubscribers.splice(addressExistsIndex, 1)[0];
                const type = numUnits === addressExists.units ? "noChange" : numUnits > addressExists.units ? "gain" : numUnits < addressExists.units ? "lose" : "noChange";
                changes.push({
                    address,
                    type,
                    units: type === "noChange" ? numUnits : type === "gain" ? numUnits - addressExists.units : addressExists.units - numUnits
                })
            }
            else changes.push({address, type: "new", units: numUnits});
        });
        defaultSubscribers.forEach(({address}) => {
            changes.push({
                address,
                type: "delete",
                units: 0
            })
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
                    if(!isNewAgreement && setAgreementSubscribers)
                        setAgreementSubscribers(undefined);
                    else if(isNewAgreement && setNewAgreementLoading)
                        setNewAgreementLoading(true);

                    const newId = await createOrEditAgreement(wallet, !subscribers ? "create" : "edit", changes, id);
                    const editedSubscribers: Subscriber[] = data.subscribers.map(({address, units, approved}) => ({address, units: units || 0, approved: !!approved}));console.log('editedSubscribers: ',editedSubscribers);

                    setSnackBar({
                        isOpened: true,
                        message:  `Success! Your request has succeeded`,
                        status: "success"
                    });

                    if(!isNewAgreement && setAgreementSubscribers)
                        setAgreementSubscribers(editedSubscribers);
                    else if(isNewAgreement && setNewAgreementLoading && setAgreements){
                        const newSubscriber = {
                            id: newId,
                            assets: 0,
                            subscribers: editedSubscribers
                        }
                        console.log("newSubscriber: ",newSubscriber);
                        setNewAgreementLoading(false);
                        setAgreements(st => {
                            if(st && st.length > 0) return [newSubscriber, ...st];
                            else return [newSubscriber];
                        });
                    }
                }
            }
            catch(e){
                if(setNewAgreementLoading) setNewAgreementLoading(false);
                if(setAgreementSubscribers) setAgreementSubscribers(subscribers);
                setSnackBar({
                    isOpened: true,
                    message:  `Sorry, something went wrong. Please try again soon`,
                    status: "error"
                });
            }
        }
        applyChanges();
        closePopUp();
    }

    return(
        <PopUpContainer>
            <form onSubmit={handleSubmit(onSubmit)} ref={reference}>
                <FormImg>
                    <FormName>{`${subscribers ? 'Edit' : 'Create'} Agreement`}</FormName>
                    <Image quality={100} src="/spaceship-ida.jpeg" fill style={{backgroundSize: 'cover', objectFit: 'cover'}} alt="galaxy"
                    />
                </FormImg>
                <FormContainer style={{boxShadow: 'none', padding:'30px'}}>
                    <InputRow>
                        <InputLabel className="hideMobile"></InputLabel>
                        <InputLabel>Subscriber</InputLabel>
                        <InputLabel>Units</InputLabel>
                        <InputLabel className="hideMobile" style={{marginLeft: '10px'}}>Shares</InputLabel>
                        <InputLabel className="hideMobile">Delete</InputLabel>
                    </InputRow>
                    {
                        fields.map((field, index) =>
                            <InputRow key={field.id}>
                                <OrderCol className="hideMobile">
                                    <Image src={`/${field.approved ? 'approved.png' : 'pending.png'}`} width={20} height={20} alt="indicator"/>
                                    <span style={{marginLeft: '4px'}}>{index + 1}</span>
                                </OrderCol>
                                <div style={{position: 'relative'}}>
                                    <ErrorLabel>{errors?.subscribers?.[index]?.address?.message}</ErrorLabel>
                                    <Input disabled={!!subscribers && !field?.new} error={!!errors?.subscribers?.[index]?.address} type="text" placeholder="Wallet address" {...register(`subscribers.${index}.address`, { validate: { isValidAddress: address => validateAddress(address, setFocus, index, getValues)
                                }})} />
                                </div>
                                <div style={{position: 'relative'}}>
                                    <ErrorLabel>{errors?.subscribers?.[index]?.units?.message}</ErrorLabel>
                                    <Input disabled={false} error={!!errors?.subscribers?.[index]?.units} type="number" min={1} placeholder='Units' {...register(`subscribers.${index}.units`, unitsValidationObj)}/>
                                </div>
                                <Shares watch={watch} index={index}/>
                                <Remove>
                                    <Image src="/remove.png" width={25} height={25} alt="remove" onClick={() => removeSubscriber(index)}/>
                                </Remove>
                            </InputRow>
                        )
                    }
                    <AddButton disabled={false} type={"button"} onClick={addNewSubscriber} style={{backgroundColor: "#FFEB3B", boxShadow: 'none'}}>
                        Add subscriber
                        <Image src="/add.png" width={20} height={20} alt="add"/>
                    </AddButton>
                    <Button disabled={false} type={wallet ? "submit" : "button"} {...clickToConnect}>
                        {wallet ? `${subscribers ? 'Edit' : 'Create'} Agreement` : "Connect Wallet"}
                    </Button>
                </FormContainer>
            </form>
        </PopUpContainer>
    )
}
export default Edit;