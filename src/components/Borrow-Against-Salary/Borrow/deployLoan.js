const ethers = require("ethers")
const LoanFactoryABI = require("../../../artifacts/contracts/LoanFactory.sol/LoanFactory.json").abi

//place deployed address of the loan factory here...
const LoanFactoryAddress = "0x98aee9CF0e7214B2C5596EcbC36779f06afb2DCA";

//enforce goerli provider first

export async function deployLoan(wallet, borrowerAdress, employerAddress, borrowAmount, interestRate, paybackPeriod) {
    return new Promise(async (res, rej) => {
        const {sf, provider} = wallet;
        const borrower = wallet.sfSigner;
        const daix = await sf.loadSuperToken("fDAIx") //get fDAIx on goerli
        const loanFactory = new ethers.Contract(
            LoanFactoryAddress,
            LoanFactoryABI,
            provider
        )
        try{
            const tx = await loanFactory.connect(borrower).createNewLoan(
                ethers.utils.parseEther(`${borrowAmount}`), //borrow amount in dai
                interestRate, // interest rate
                paybackPeriod, //payback period in months
                employerAddress, //address of employer who will be effectively whitelisted in this case
                borrowerAdress, // address of borrower
                daix.address, //daix address - this is the token we'll be using: borrowing in and paying back
                sf.settings.config.hostAddress //address of host
            );
            res(tx);
        }
        catch(e){
            rej(e);
        }
    })
}