import { WalletProps } from "../../App/appTypes"

export type BuyerProps = {
    wallet: WalletProps
}

type Offer = {
    price: string,
    owner: string,
    buyer: string,
    freezePeriod: string,
    freezePeriodEnd: string,
    strikePrice: string,
    minPaymentFlowRate: string,
    isCall: string,
    address: string
}

export type OfferTypes = Offer[] | undefined | null

export type BuyerOfferProps = {
    data: Offer
}