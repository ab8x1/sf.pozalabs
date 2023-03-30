import { useRef } from "react";
import { HeaderText, Input, SubmitForm as Button, FormContainer, FormHeader, Error } from "../../Borrow-Against-Salary/Borrow/borrowStyles";
import { PopUpContainer, InputRow, AddButton, Remove, ErrorLabel, OrderCol, } from '../../Instant-Distribution/Manage-Agreement/AgreementStyles';
import { useForm, SubmitHandler } from "react-hook-form"
import { DialogBg } from "../../Borrow-Against-Salary/Offers/offersStyles";
import Image from "next/image"
import OnClickOutside from "../../../hooks/useClickOutside";
import { PopUpProps, NewOfferTypes } from "./WriterTypes";
import { InputContainer, InputLabel, DoubleContainer } from "../../Borrow-Against-Salary/Borrow/borrowStyles";
import { CheckBoxes, TripleContainer } from "./WriterStyles";
import createOffer from './helpers/createOffer';


function WriterPopUp({setPopUp, wallet} : PopUpProps){
    const ref : any = useRef();
    OnClickOutside(ref, () => setPopUp(false))
    const { register, handleSubmit, formState: { errors, isValid }, control, setFocus, getValues, watch, trigger, setValue, setError} = useForm<NewOfferTypes>({
        defaultValues: {call: true},
        mode: 'onChange'
    });

    const onSubmit = async (data: NewOfferTypes) => {
        const {freezeMinutes, freezeHours, freezeDays} = data.period;
        createOffer(wallet, data);
    };

    return(
        <DialogBg>
            <PopUpContainer ref={ref} style={{maxWidth: '650px'}}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormHeader style={{background: 'linear-gradient(90deg, rgba(252,211,140,1) 0%, rgba(242,195,113,1) 50%, rgba(244,170,42,1) 100%)'}}>
                        <div>
                            <HeaderText>Create new Offer</HeaderText>
                            {/* <HeaderText>Manage your agreement: add / remove users, change shares</HeaderText> */}
                        </div>
                    </FormHeader>
                    <FormContainer style={{boxShadow: 'none', padding:'30px'}}>
                        <DoubleContainer style={{gridTemplateColumns: '1fr 0.5fr'}}>
                            <InputContainer>
                                <InputLabel>Min. Payment Flow Rate / h <Error>{errors.flowRate?.message}</Error></InputLabel>
                                <Input type="number" placeholder="Type flow rate" error={!!errors?.flowRate} {...register(`flowRate`, {required: "Input reqired", min: 1})}/>
                            </InputContainer>
                            <InputContainer>
                                <InputLabel>Call/Puts</InputLabel>
                                <CheckBoxes>
                                    <label>Call</label>
                                    <Input error={false} type="checkbox" placeholder="Type flow rate" {...register(`call`, {
                                        onChange: e => {
                                            const checked = e.target.checked;
                                            setValue('puts', checked ? false : true);
                                        }
                                    })}/>
                                    <label>Puts</label>
                                    <Input error={false} type="checkbox" placeholder="Type flow rate" {...register(`puts`, {
                                        onChange: e => {
                                            const checked = e.target.checked;
                                            setValue('call', checked ? false : true);
                                        }
                                    })}/>
                                </CheckBoxes>
                            </InputContainer>
                        </DoubleContainer>
                        <DoubleContainer style={{gridTemplateColumns: '1fr 0.7fr'}}>
                            <InputContainer>
                                <InputLabel>Strike Price <Error>{errors.strikePrice?.message}</Error></InputLabel>
                                <Input error={!!errors.strikePrice?.message} type="number" placeholder="Type strike price" {...register(`strikePrice`, {required: "Input reqired", min: 1})}/>
                            </InputContainer>
                            <InputContainer>
                                <InputLabel>Freeze Period <Error>{errors.period?.message}</Error></InputLabel>
                                <TripleContainer>
                                    <div>
                                        <Input type="number" error={false} {...register(`period.freezeDays`)}/>
                                        <label>D</label>
                                    </div>
                                    <div>
                                        <Input type="number" error={false} {...register(`period.freezeHours`)}/>
                                        <label>H</label>
                                    </div>
                                    <div>
                                        <Input type="number" error={false} {...register(`period.freezeMinutes`)}/>
                                        <label>M</label>
                                    </div>
                                </TripleContainer>
                            </InputContainer>
                        </DoubleContainer>
                        <Button $disabled={!isValid} style={{alignSelf: 'auto'}}>
                            Create Offer
                        </Button>
                    </FormContainer>
                </form>
            </PopUpContainer>
        </DialogBg>
    )
}
export default WriterPopUp;