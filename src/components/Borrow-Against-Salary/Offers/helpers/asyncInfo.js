const ethers = require("ethers")
import getDefaultProvider from '../../../../utils/getDefaultProvider'

export async function getFlow(employerAddress, loanAddress, setCurrentFlowRate){
    const {customHttpProvider, sf} = await getDefaultProvider(); //wallet not necessary

    let employerNetFlowRate = await sf.cfaV1.getFlow({
        superToken: "0xF2d68898557cCb2Cf4C10c3Ef2B034b2a69DAD00",
        sender: employerAddress,
        receiver: loanAddress,
        providerOrSigner: customHttpProvider
    })
    const monthlyAmount = Number((ethers.utils.formatEther(employerNetFlowRate?.flowRate) * 3600 * 24 * 30).toFixed(2));

    setCurrentFlowRate(monthlyAmount);
}