
export default async function employerFlow(type, wallet, loanAddress, flowRate){
    return new Promise(async (res, rej) => {
        const {sf, sfSigner, adress, daix} = wallet;
        const employer = sfSigner;
        const props = type === "deleteFlow" ? {
            sender: adress,
            receiver: loanAddress,
            superToken: daix.address
        } : {
            receiver: loanAddress,
            flowRate: flowRate,
            superToken: daix.address
        }
        const employerFlowOperation = sf.cfaV1[type](props)

        try{
            const tx = await employerFlowOperation.exec(employer);
            res(tx);
        } catch(e){
            console.log(e);
            rej(e);
        }
    })
}