import { type } from "os";
import { Dispatch, SetStateAction } from "react";

export type OptionTypes = {
    selected?: boolean
}

export type OpenedNavbar = {
    open: boolean
};

export type TogglerProps = {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>
}

export type  TopMenuProps = TogglerProps;

export type route = {url: string, name: string};

export type AppOptionsProps = {
    info: {name: string, img: string},
    mainUrl: string,
    routes?: route[]
}

export type OptionWrapperProps = {
    children?: any,
    hasSubRoutes?: boolean,
    url: string,
    name: string
}