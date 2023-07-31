import { useRef } from "react";
import { PopUpProps } from "../SplitterTypes";
import { DialogBg } from "../../Borrow-Against-Salary/Offers/offersStyles"
import Edit from "./Edit";
import OnClickOutside from "../../../../modules/Select/helpers/onClickOutside";

function PopUp({closePopUp, wallet, connectWallet, popUpData, setSplitters, updateFlows, setReceivers, receivers} : PopUpProps){
    const {status, setSnackBar, createSplitterData} = popUpData || {};
    const {address, totalOutflow} = popUpData.data || {};
    const data = {address, receivers, totalOutflow}
    const container: any = useRef();
    OnClickOutside(container, () => closePopUp());
    return(
        <DialogBg>
            <Edit reference={container} connectWallet={connectWallet} wallet={wallet} popUpData={popUpData} data={data} closePopUp={closePopUp} setSnackBar={setSnackBar} createSplitterData={createSplitterData} setSplitters={setSplitters} setReceivers={setReceivers} receivers={receivers} totalOutflow={totalOutflow}/>
        </DialogBg>
    )
}
export default PopUp;