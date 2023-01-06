const ethers = require("ethers")
const LoanContract = require("../../../../artifacts/contracts/EmploymentLoan.sol/EmploymentLoan.json")
const LoanContractABI = LoanContract.abi

export default async function main(wallet, loanAddress, borrowAmount) {
    return new Promise(async(res, rej) => {
        try{
            const {sfSigner, daix} = wallet;
            const userSigner = sfSigner;

            const employmentLoan = new ethers.Contract(
                loanAddress,
                LoanContractABI,
                userSigner
            );

            const lenderApprovalOperation = daix.approve({
                receiver: employmentLoan.address,
                amount: borrowAmount
            });

            const approveTx = await lenderApprovalOperation.exec(userSigner);
            await approveTx.wait();

            const lendTx = await employmentLoan.connect(userSigner).lend();
            await lendTx.wait();
            res(lendTx);
        } catch(e){
            console.log(e);
            rej(false);
        }
    })
}