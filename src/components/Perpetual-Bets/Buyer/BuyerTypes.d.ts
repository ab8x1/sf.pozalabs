import { Dispatch, SetStateAction } from "react"
import { WalletProps, WalletType } from "../../App/appTypes"

export type BuyerProps = {
    wallet: WalletProps
}

export type Offer = {
    price: string,
    owner: string,
    buyer: string,
    freezePeriod: string,
    freezePeriodEnd: string,
    strikePrice: string,
    minPaymentFlowRate: string,
    isCall: boolean,
    address: string,
    token: string
}

export type OfferTypes = Offer[] | undefined | null

export type BuyerOfferProps = {
    data: Offer,
    wallet: WalletProps
}

export type BuyerFlowRate = {
    setFlowRatePopUp: Dispatch<SetStateAction<boolean>>,
    wallet: WalletProps,
    address: string,
    setActualFlowRate: Dispatch<SetStateAction<number | undefined>>,
    actualFlowRate: number | undefined,
    setNewBuyer: Dispatch<SetStateAction<string>>,
    minPaymentFlowRate: string
}