import {FC} from 'react'
import { Controller, Control } from "react-hook-form"
import {BorrowFormTypes} from './borrowTypes'

type ControllProps = {
    Component: FC<any>,
    componentProps?: Object,
    name: string,
    required: boolean,
    control: Control<BorrowFormTypes | any>
}

export default function Controll({Component, componentProps, control, name, required}: ControllProps){
    return(
        <Controller
            control={control}
            name={name}
            render={({
                field: fieldProps
            }) => (
            <Component
                customInputRef={fieldProps.ref}
                onChange={(e: any)=> fieldProps.onChange(e?.value)}
                {...componentProps}
            />
        )}
        rules={required ? { required: 'Required' } : {}}
    />
    )
}