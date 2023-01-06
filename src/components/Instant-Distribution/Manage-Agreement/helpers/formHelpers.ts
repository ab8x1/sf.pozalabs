import {ethers} from 'ethers'
import { UseFormGetValues, UseFormSetFocus } from "react-hook-form"
import {CreateAgteementFormTypes} from '../AgreementTypes'

export const validateAddress = (adress: string, setFocus: UseFormSetFocus<CreateAgteementFormTypes>, index: number, getValues: UseFormGetValues<CreateAgteementFormTypes>) => {
    if(ethers.utils.isAddress(adress)){
        if(getValues("subscribers").some((val, i) => val.address === adress && index !== i)) return "*Already exists";
        setFocus(`subscribers.${index}.units`);
        return true
    }
    else return "*Wrong address";
}

export const unitsValidationObj = {
    required: {
        value: true,
        message: "*Required"
    },
    pattern: {
        value: /^[0-9]+$/,
        message: '*Only Integers'
    }
}