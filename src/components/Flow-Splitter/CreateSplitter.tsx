import { useState } from "react";
import Image from 'next/image'
import { CreateSplitterContainer, AddButton, NewSplitterInfo } from './SplitterStyles';
import { PopUpType } from "./SplitterTypes";
import PopUp from "./PopUps/PopUp";
import { CreateSplitterProps } from "./SplitterTypes";
import SnackBar from "../../../modules/SnackBar/SnackBar";
import { SnackBarObj } from "../Borrow-Against-Salary/Offers/offersTypes";
import { LoadingSpinner } from "./LoadingSpinner";

function CreateSplitter({wallet, connectWallet, setSplitters}: CreateSplitterProps){
    const [snackBar, setSnackBar] = useState<SnackBarObj>({isOpened: false, status: "success", message: ""});
    const [loading, setLoading] = useState<boolean>(false);
    const [popUp, setPopUp] = useState<PopUpType>({status: false, setSnackBar});
    const closePopUp = () => {
        setPopUp(st => ({...st, status: false}));
    }
    return(
        <section>
            <CreateSplitterContainer>
                <NewSplitterInfo>
                    <h1>Your Super Splitters</h1>
                    <p>Send money streams to <strong>multiple</strong> accounts at the same time!</p>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <AddButton $disabled={loading} onClick={() => setPopUp(st => ({...st, status: "edit", createSplitterData: {setSplitters, setNewSplitterLoading: setLoading}}))}>
                            Create Splitter
                            <Image width={20} height={20} src="/add.svg" alt='add button' priority/>
                        </AddButton>
                        {loading && <LoadingSpinner size="30px"/>}
                    </div>
                </NewSplitterInfo>
                <Image src="/flow-splitter.png" width={400} height={400} alt="Splitter"/>
            </CreateSplitterContainer>
            {popUp.status !== false && <PopUp popUpData={popUp} closePopUp={closePopUp} wallet={wallet} connectWallet={connectWallet} setSplitters={setSplitters}/>}
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
export default CreateSplitter;