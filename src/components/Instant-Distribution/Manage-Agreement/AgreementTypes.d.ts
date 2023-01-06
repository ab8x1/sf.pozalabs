import { Dispatch, MutableRefObject, SetStateAction } from "react"
import { UseFormGetValues, UseFormWatch } from "react-hook-form"
import { WalletProps, WalletType } from "../../App/appTypes"
import { GlobalContextProps } from "../../App/appTypes";
import { SnackBarObj } from "../../Borrow-Against-Salary/Offers/offersTypes";

type connectWallet = ((initialization: boolean) => void);

export type PopUpType = {
    status: false | string,
    data?: AgreementTypes,
    createAgreementData?: NewAgreementTypes
    setSnackBar: Dispatch<SetStateAction<SnackBarObj>>
}

type Subscriber = {
    address: string,
    units: number,
    approved?: boolean
}

export type AgreementTypes = {
    id: string,
    assets: number,
    subscribers?: Subscriber[],
    setAgreementSubscribers?: Dispatch<SetStateAction<Subscriber[] | undefined>>,
    setAssets?: Dispatch<SetStateAction<number | undefined>>
}

export type NewAgreementTypes = {
    setAgreements: Dispatch<SetStateAction<undefined | null | AgreementTypes[]>>,
    setNewAgreementLoading: Dispatch<SetStateAction<boolean>>
}

export type ManageAgreementProps = {
    reference: any,
    wallet: WalletProps,
    connectWallet?: connectWallet,
    data?: AgreementTypes,
    createAgreementData?: NewAgreementTypes
    closePopUp: () => void,
    setSnackBar: Dispatch<SetStateAction<SnackBarObj>>
}

export type CreateAgteementFormTypes = {
    subscribers: {
        address: string,
        units?: number,
        new?: boolean,
        approved?: boolean
    }[]
}

export type SharesPropsTypes = {
    index: number
    watch: UseFormWatch<CreateAgteementFormTypes>
}

export type OwnedAgreementsProps = {
    globalCTX: GlobalContextProps,
    agreements: undefined | null | AgreementTypes[]
}

export type AgreementProps = {
    index: number,
    data: AgreementTypes,
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
    data: AgreementTypes | undefined,
    type: string,
    allUnits: number,
    closePopUp: () => void,
    setSnackBar: Dispatch<SetStateAction<SnackBarObj>>
}

export type CreateAgreementProps = {
    wallet: WalletProps,
    connectWallet: connectWallet,
    setAgreements: Dispatch<SetStateAction<undefined | null | AgreementTypes[]>>,
}

export type AgreementsChanges = {
    address: string,
    type: "noChange" | "new" | "gain" | "lose" | "delete",
    units: number
}