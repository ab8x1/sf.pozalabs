import { ContractStatus, Status } from "./offersStyles";
import { Loading } from "./offersStyles";
import { LoadingSpinner } from "../../Instant-Distribution/Manage-Agreement/LoadingSpinner";

function OfferStatus({asyncDataLoading, active, actualFlowRate, fundOffer, userIs, type}: any){
    const loading = asyncDataLoading || (type === "employer" && actualFlowRate === undefined);
    const clickDisabled = loading || (type === "lender" && !actualFlowRate);

    return(
        <ContractStatus>
            { loading &&
                <Loading>
                    <LoadingSpinner size="20px"/>
                </Loading>
            }
            <Status
                onClick={!clickDisabled ? fundOffer : undefined}
                $funded={type !== "employer" && !!active}
                $disabled={clickDisabled}
            >
                {
                    loading ? "Loading..."
                    : type === "lender" ? "Fund now"
                    : userIs === "Employer" ? !actualFlowRate ? "Create Flow" : "Change Flow"
                    : userIs === "Borrower" ? "Your Debt" : "Your Loan"
                }
            </Status>
        </ContractStatus>
    )
}
export default OfferStatus;