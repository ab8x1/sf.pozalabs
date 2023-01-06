import { Dispatch, SetStateAction } from "react"
import { WalletProps } from "../../App/appTypes"
import { SnackBarObj } from "../../Borrow-Against-Salary/Offers/offersTypes"

export type OwnedSubscriptionsType = {
    setSnackBar: Dispatch<SetStateAction<SnackBarObj>>
}

export type SubscriptionType = {
    id: string,
    shares: number, // (units / totalUnits) * 100%,
    isApproved: boolean,
    setSnackBar: Dispatch<SetStateAction<SnackBarObj>>,
    wallet: WalletProps
}