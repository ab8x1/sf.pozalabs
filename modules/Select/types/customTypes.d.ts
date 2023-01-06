import React, { Dispatch, SetStateAction } from "react"

export type basicItem = {label: string, value: string, iconUrl?: string} //every item must conatin these props

export type inputItem = basicItem & { //query for actual user input
    query: string
}

export type listItem = basicItem & {id: number} //id for filtering selected items

export type customStyles = {
    control?: string,
    arrowContainer?: string,
    input?: string,

}

export type SelectProps = {
    items: listItem[],
    isSearchable?: boolean,
    onChange: (item: basicItem | null) => void,
    Placeholder: React.FC | string,
    darkTheme?: boolean,
    isLoading?: boolean,
    searchIcon?: boolean,
    customStyles?: customStyles,
    customControlColors: Object,
    customInputRef?: React.Ref,
    error?: boolean
}

export type ListProps = {
    userItems: listItem[],
    selected: number | undefined,
    selectItem: (e: React.MouseEvent<HTMLLIElement> | number) => void,
    hovered: number
    setHovered: Dispatch<SetStateAction<number>>,
    darkTheme?: boolean
}

export type ControlProps = {
    darkTheme?: boolean,
    customStyles?: string,
    customColors?: {
        unfocused?: string,
        focused?: string
    },
    listFocused: boolean,
    error?: boolean
}

export type InputProps = {
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void,
    onInput: ((e: React.ChangeEvent<HTML>) => void) | undefined,
    isSearchable?: boolean,
    customStyles?: string,
    listOpened?: boolean,
}

export type ClearProps = {
    darkTheme?: boolean
}

export type ArrowContainerProps = {
    customStyles?: string
}

export type ListContainerProps = {
    darkTheme?: boolean
}

export type ListItemProps = {
    selected: boolean,
    hovered: boolean,
    darkTheme?: boolean
}