
const ethers = require("ethers")
const EmploymentLoanABI = require("../../../../artifacts/contracts/EmploymentLoan.sol/EmploymentLoan.json").abi
const LoanFactoryABI = require("../../../../artifacts/contracts/LoanFactory.sol/LoanFactory.json").abi
const LoanFactoryAddress = process.env.NEXT_PUBLIC_LOAN_FACTORY_ADDRESS
const goerliUrl = process.env.NEXT_PUBLIC_GOERLI_URL
const customHttpProvider = new ethers.providers.JsonRpcProvider(goerliUrl)
const loanFactoryContract = new ethers.Contract(
    LoanFactoryAddress,
    LoanFactoryABI,
    customHttpProvider
);

const getLoanAdress = (id) => {
    return new Promise(async (res, rej) => {
        try{
            const loanAdress = await loanFactoryContract.idToLoan(id);
            res(loanAdress)
        }
        catch(e){
            rej(e);
        }
    })
}

export async function getLoanById(id) {
    return new Promise(async (res, rej) => {
        try{
            const loanAdress = await getLoanAdress(id);
            if(loanAdress !== "0x0000000000000000000000000000000000000000"){
                const employmentLoan = new ethers.Contract(
                    loanAdress,
                    EmploymentLoanABI,
                    customHttpProvider
                )
                //all values are important so use promise all - reject offer if not all values are fetched correct
                const results = await Promise.all([employmentLoan.borrowAmount(), employmentLoan.interestRate(), employmentLoan.paybackMonths(), employmentLoan.employer(), employmentLoan.borrower(), employmentLoan.loanOpen(), employmentLoan.getPaymentFlowRate(), employmentLoan.lender(), employmentLoan.isClosed()]);
                res([...results, loanAdress]);
            }
            else {
                rej("No more offers");
            }
        }
        catch(e){
            console.log("Fetching error");
            rej("Fetching error");
        }
    })
}