import { Dispatch, MutableRefObject, SetStateAction } from "react"
import { UseFormGetValues, UseFormWatch } from "react-hook-form"
import { WalletProps, WalletType } from "../App/appTypes"
import { GlobalContextProps } from "../App/appTypes";
import { SnackBarObj } from "../Borrow-Against-Salary/Offers/offersTypes";

type connectWallet = ((initialization: boolean) => void);

export type PopUpType = {
    status: false | string,
    data?: SplitterTypesNew,
    createSplitterData?: NewSplitterTypes
    setSnackBar: Dispatch<SetStateAction<SnackBarObj>>
}

type Subscriber = {
    address: string,
    units: number,
    approved?: boolean
}

type SubscriberNew = {
    address: string,
    units?: number,
    flow?: number
}

export type SplitterTypes = {
    id: string,
    assets: number,
    subscribers?: Subscriber[],
    setSplitterSubscribers?: Dispatch<SetStateAction<Subscriber[] | undefined>>,
    setAssets?: Dispatch<SetStateAction<number | undefined>>
}

export type SplitterTypesNew = {
    address: string,
    sideReceiver?: SubscriberNew,
    mainReceiver?: SubscriberNew
}

export type NewSplitterTypes = {
    setSplitters: Dispatch<SetStateAction<undefined | null | SplitterTypes[]>>,
    setNewSplitterLoading: Dispatch<SetStateAction<boolean>>
}

export type ManageSplitterProps = {
    reference: any,
    wallet: WalletProps,
    connectWallet?: connectWallet,
    data?: SplitterTypes,
    createSplitterData?: NewSplitterTypes
    closePopUp: () => void,
    setSnackBar: Dispatch<SetStateAction<SnackBarObj>>
}

export type CreateSplitterFormTypes = {
    sideAddress: string,
    sideUnits: number,
    mainAddress: string
}

export type SharesPropsTypes = {
    index: number
    watch: UseFormWatch<CreateSplitterFormTypes>
}

export type OwnedSplittersProps = {
    globalCTX: GlobalContextProps,
    Splitters: undefined | null | SplitterTypes[]
}

export type SplitterProps = {
    index: number,
    data: SplitterTypesNew,
    wallet: WalletProps
}

export type PopUpProps = {
    popUpData: PopUpType
    closePopUp: () => void,
    wallet: WalletProps,
    connectWallet?: connectWallet,
}

export type TransferDistributeProps = {
    reference: any,
    wallet: WalletType,
    data: SplitterTypes | undefined,
    type: string,
    allUnits: number,
    closePopUp: () => void,
    setSnackBar: Dispatch<SetStateAction<SnackBarObj>>
}

export type CreateSplitterProps = {
    wallet: WalletProps,
    connectWallet: connectWallet,
    setSplitters: Dispatch<SetStateAction<undefined | null | SplitterTypes[]>>,
}

export type SplittersChanges = {
    type: "create" | "edit",
    units: number
}