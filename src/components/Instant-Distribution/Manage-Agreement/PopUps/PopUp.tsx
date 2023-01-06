import { useRef } from "react";
import { PopUpProps } from "../AgreementTypes";
import { DialogBg } from "../../../Borrow-Against-Salary/Offers/offersStyles"
import Edit from "../PopUps/Edit";
import Transfer from "../PopUps/Transfer";
import OnClickOutside from "../../../../../modules/Select/helpers/onClickOutside";

function PopUp({closePopUp, wallet, connectWallet, popUpData} : PopUpProps){
    const {status, data, setSnackBar, createAgreementData} = popUpData;
    const allUnits = data?.subscribers?.reduce((acc, val) => acc + (Number(val?.units) || 0), 0) || 0;
    const container: any = useRef();
    OnClickOutside(container, () => closePopUp());
    return(
        <DialogBg>
            {
                status ?
                    status === "edit" ?
                        <Edit reference={container} connectWallet={connectWallet} wallet={wallet} data={data} closePopUp={closePopUp} setSnackBar={setSnackBar} createAgreementData={createAgreementData}/>
                    :
                        <Transfer type={status} setSnackBar={setSnackBar} reference={container} wallet={wallet} data={data} allUnits={allUnits} closePopUp={closePopUp}/>
                :
                null
            }
        </DialogBg>
    )
}
export default PopUp;