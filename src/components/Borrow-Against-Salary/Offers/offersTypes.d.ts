import { BigNumber } from "ethers"
import {WalletProps} from '../App/appTypes'
import { Dispatch, MouseEventHandler, SetStateAction } from "react"

export type SnackBarObj = {
    isOpened: boolean, status: "success" | "warning" | "error",
    message: string
}

export type OfferData = [
    BigNumber, //borrowAmount
    number, //interestRate
    BigNumber, //paybackMonths
    string, //employer
    string, //borrower
    boolean, //is loan active
    BigNumber, //defaultFlowRate
    string, //lenderAdress
    boolean, //offer is closed
    string, //loanAdress,
] | null

type Filter = (data: OfferData) => boolean;

export type OffersStateProps = {
    type: string,
    filter?: Filter,
    wallet?: WalletProps,
    connectWallet?: (initialization: boolean) => void
}

export type OfferProps = {
    loading?: boolean,
    data?: offerData,
    type: string,
    wallet?: WalletProps
}

export type LoaderProps = {
    lastRequestedId: number,
    setLastRequestdId: Dispatch<SetStateAction<number>>,
    setOffers: any,
    filter?: Filter
}

export type FlowRateProps = {
    active: boolean,
    setShowFlowRate: Dispatch<SetStateAction<boolean>>,
    wallet?: WalletProps,
    loanAdress: string,
    defaultFlowRate: number,
    actualFlowRate?: number,
    setSnackBar: Dispatch<SetStateAction<SnackBarObj>>,
    setActualFlowRate: Dispatch<SetStateAction<number | undefined>>
}

export type LendButonProps = {
    $disabled?: boolean,
    // onClick?: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>
}