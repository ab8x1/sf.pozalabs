import { Dispatch, SetStateAction } from "react"
import { WalletProps, WalletType } from "../../App/appTypes"
import { Offer } from "../Buyer/BuyerTypes"

export type WriterProps = {
    wallet: WalletProps,
    connectWallet: (initialization: boolean) => void
}

export type PopUpProps = {
    setPopUp: Dispatch<SetStateAction<boolean>>,
    wallet: WalletProps
}

export type NewOfferTypes = {
    flowRate: number,
    call: boolean,
    puts: boolean,
    strikePrice: number,
    period: {
        freezeDays: number,
        freezeHours: number,
        freezeMinutes: number,
    }
}

export type WriterOfferType = {
    data: Offer,
    wallet: WalletType,
}

export type FundProps = {
    setPopUp: Dispatch<SetStateAction<boolean>>,
    wallet: WalletType,
    assets: number | undefined,
    address: string,
    setAssets: Dispatch<SetStateAction<number | undefined>>
}