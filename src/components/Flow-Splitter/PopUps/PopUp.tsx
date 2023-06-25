import { useRef } from "react";
import { PopUpProps } from "../SplitterTypes";
import { DialogBg } from "../../Borrow-Against-Salary/Offers/offersStyles"
import Edit from "./Edit";
import OnClickOutside from "../../../../modules/Select/helpers/onClickOutside";

function PopUp({closePopUp, wallet, connectWallet, popUpData, setSplitters, updateFlows} : PopUpProps){
    const {status, data, setSnackBar, createSplitterData} = popUpData || {};
    const allUnits = data?.subscribers?.reduce((acc, val) => acc + (Number(val?.units) || 0), 0) || 0;
    const container: any = useRef();
    OnClickOutside(container, () => closePopUp());
    return(
        <DialogBg>
            <Edit reference={container} connectWallet={connectWallet} wallet={wallet} popUpData={popUpData} data={data} closePopUp={closePopUp} setSnackBar={setSnackBar} createSplitterData={createSplitterData} setSplitters={setSplitters} updateFlows={updateFlows}/>
        </DialogBg>
    )
}
export default PopUp;