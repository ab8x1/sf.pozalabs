import {ethers} from 'ethers'
import { UseFormGetValues, UseFormSetFocus } from "react-hook-form"
import {CreateSplitterFormTypes} from '../SplitterTypes'

export const validateAddress = (adress: string, setFocus: UseFormSetFocus<CreateSplitterFormTypes>, index: number, getValues: UseFormGetValues<CreateSplitterFormTypes>) => {
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
    max: {
        value: 999,
        message: "Too big"
    }
}