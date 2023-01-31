import { ContractStatus, Status } from "./offersStyles";
import { Loading } from "./offersStyles";
import { LoadingSpinner } from "../../Instant-Distribution/Manage-Agreement/LoadingSpinner";

function OfferStatus({asyncDataLoading, active, actualFlowRate, fundOffer, userIs, type}: any){
    const loading = asyncDataLoading || (type === "employer" && actualFlowRate === undefined);
    const clickDisabled = loading || (type === "lender" && (!actualFlowRate || active)) || type === "activeLoans";

    return(
        <ContractStatus>
            { loading &&
                <Loading>
                    <LoadingSpinner size="20px"/>
                </Loading>
            }
            <Status
                onClick={!clickDisabled ? fundOffer : undefined}
                $noActions={type !== "employer" && (active === true || active === null)}
                $disabled={clickDisabled}
            >
                {
                    loading ? "Loading..."
                    : type === "lender" ? !active ? "Fund now" : "Your Funded loan"
                    : type === "employer" ? !actualFlowRate ? "Create Flow" : "Change Flow"
                    : active === null ? "Closed Loan"
                    : userIs === "Borrower" ? "Your Debt" : "Your Funded Loan"
                }
            </Status>
        </ContractStatus>
    )
}
export default OfferStatus;