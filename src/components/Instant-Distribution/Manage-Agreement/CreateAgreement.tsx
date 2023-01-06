import { useState } from "react";
import Image from 'next/image'
import { CreateAgreementContainer, AddButton, NewAgreementInfo } from './AgreementStyles';
import { PopUpType } from "./AgreementTypes";
import PopUp from "./PopUps/PopUp";
import { CreateAgreementProps } from "./AgreementTypes";
import SnackBar from "../../../../modules/SnackBar/SnackBar";
import { SnackBarObj } from "../../Borrow-Against-Salary/Offers/offersTypes";
import { LoadingSpinner } from "./LoadingSpinner";

function CreateAgreement({wallet, connectWallet, setAgreements}: CreateAgreementProps){
    const [snackBar, setSnackBar] = useState<SnackBarObj>({isOpened: false, status: "success", message: ""});
    const [loading, setLoading] = useState<boolean>(false);
    const [popUp, setPopUp] = useState<PopUpType>({status: false, setSnackBar});
    const closePopUp = () => {
        setPopUp(st => ({...st, status: false}));
    }
    return(
        <section>
            <CreateAgreementContainer>
                <NewAgreementInfo>
                    <h1>Your Agreements</h1>
                    <p>Set conditions and unleash the power of asset distribution</p>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <AddButton disabled={loading} onClick={() => setPopUp(st => ({...st, status: "edit", createAgreementData: {setAgreements, setNewAgreementLoading: setLoading}}))}>
                            Create Agreement
                            <Image width={20} height={20} src="/add.svg" alt='add button' priority/>
                        </AddButton>
                        {loading && <LoadingSpinner size="30px"/>}
                    </div>
                </NewAgreementInfo>
                <Image src="/agreement.png" width={400} height={400} alt="agreement"/>
            </CreateAgreementContainer>
            {popUp.status !== false && <PopUp popUpData={popUp} closePopUp={closePopUp} wallet={wallet} connectWallet={connectWallet}/>}
            {snackBar.isOpened &&
                <SnackBar
                    status={snackBar.status}
                    message={snackBar.message}
                    closeSnackBar={() => setSnackBar(st => ({...st, isOpened: false}))}
                />
            }
        </section>
    )
}
export default CreateAgreement;