import { useState, useEffect } from "react";
import { SubscriptionType } from "./SubscriptionTypes";
import { ActualFlowRate as ApprovedInfo} from "../../Borrow-Against-Salary/Offers/offersStyles";
import { Info, AgreementButton as Button, AgreementContainer, TopInfo, TopInfoContainer, InfoCol } from "../Manage-Agreement/AgreementStyles";
import { shortenAdress } from "../../Navbar/TopNavbar";
import approveOrRevokeAction from "./helpers/approveOrRevoke"
import Image from "next/image";


function Subscription({id, isApproved, shares, setSnackBar, wallet} : SubscriptionType){
    const [approved, setApproved] = useState<boolean | undefined>(isApproved)

    useEffect(() => {
        setApproved(isApproved);
    }, [isApproved])

    const approveOrRevoke = async (type: string) => {
        setApproved(undefined);
        try{
            await approveOrRevokeAction(wallet, id, type);
            setApproved(type === "approve" ? true : false);
            setSnackBar({
                isOpened: true,
                status: "success",
                message: "Your request has succeeded!"
            });
        }
        catch(e){
            setApproved(isApproved);
            setSnackBar({
                isOpened: true,
                status: "error",
                message: "Sorry, something went wrong. Please try again soon"
            })
        }
    }

    return(
        <AgreementContainer>
            <TopInfoContainer>
                <TopInfo>
                Id:<span style={{marginLeft: '10px'}}><a href={`https://goerli.etherscan.io/address/${id}`}  rel="noreferrer" target="_blank">{shortenAdress(id)}</a></span>
                </TopInfo>
            </TopInfoContainer>
            <InfoCol>
                <Info style={{minWidth: '130px'}}>
                    <ApprovedInfo $rate={approved ? 1 : approved === false ? 0 : undefined}>{approved ? "Approved" : "Not approved"}</ApprovedInfo>
                </Info>
                <Info>
                    <Image src="/shares.svg" width={30} height={30} alt="dai"/>
                    <span>{shares}%</span>
                </Info>
            </InfoCol>
            <InfoCol>
                <Button $disabled={approved === undefined} style={{color: 'white'}} color={!approved ? "#9ed27d" : "#F0564C"} onClick={() => approveOrRevoke(approved ? "revoke" : "approve")}>
                    <Image src={approved ? '/revoke.svg' : '/approve.svg'} width={25} height={25} alt="dai"/>
                    {approved ? "Revoke" : "Approve"}
                </Button>
            </InfoCol>
        </AgreementContainer>
    )
}
export default Subscription;