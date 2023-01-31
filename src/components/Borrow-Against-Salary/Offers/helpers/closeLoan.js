const ethers = require("ethers")
const LoanContract = require("../../../../artifacts/contracts/EmploymentLoan.sol/EmploymentLoan.json")
const LoanContractABI = LoanContract.abi

export default async function main(wallet, loanAddress, userIs) {
    return new Promise(async(res, rej) => {
        try{
            const {sfSigner, daix} = wallet; console.log(userIs);
            const userSigner = sfSigner;
            let amountLeft;

            const employmentLoan = new ethers.Contract(
                loanAddress,
                LoanContractABI,
                userSigner
            );

            if(userIs === "Borrower"){
                try{
                    amountLeft = await employmentLoan.connect(userSigner).getTotalAmountRemaining();
                    const approveTx = await daix.approve({receiver: loanAddress, amount: amountLeft}).exec(userSigner);
                    await approveTx.wait();

                } catch(e){
                    console.log(e);
                    rej(false);
                }
            }
            const tx = userIs === "Borrower" ? await employmentLoan.connect(userSigner).closeOpenLoan(amountLeft) : await employmentLoan.connect(userSigner).closeOpenLoan(0);
            await tx.wait();
            res(tx);
        } catch(e){
            console.log(e);
            rej(false);
        }
    })
}