export default async function manageFlow(type, wallet, flowSplitterAddress, flowRate){
    return new Promise(async (res, rej) => {
        const {sf, sfSigner, adress, daix} = wallet;
        let tx;
        try{
            if (type === 'createFlow') {
                tx = daix.createFlow({
                    sender: adress,
                    receiver: flowSplitterAddress,
                    flowRate: flowRate,
                });
            }
            if (type === 'updateFlow') {
                tx = daix.updateFlow({
                    sender: adress,
                    receiver: flowSplitterAddress,
                    flowRate: flowRate,
                });
            }
            if (type === 'deleteFlow') {
                tx = daix.deleteFlow({
                    sender: adress,
                    receiver: flowSplitterAddress
                });
            }
            const txRes = await tx.exec(sfSigner);
            res(txRes);
        } catch(e){
            console.log(e);
            rej(e);
        }
    })
}