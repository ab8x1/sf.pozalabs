import { ethers } from "ethers"
const { Framework } = require("@superfluid-finance/sdk-core")

//check if user is logged to Metamask
const isMetaMaskConnected = async provider => {
  const accounts = await provider.listAccounts();
  return accounts.length > 0;
}

//update wallet state with data from Metamask
const updateWallet = async (provider, setWallet) => {
  const signer = provider.getSigner();
  const adress = await signer.getAddress();
  const balance = await provider.getBalance(adress);
  const network = await provider.getNetwork();
  const balanceInEth = ethers.utils.formatEther(balance);
  const sf = await Framework.create({
    chainId: network.chainId,
    provider: provider
  })

  const sfSigner = sf.createSigner({ web3Provider: provider });
  const superTokenAddressOrSymbol = network.chainId === 42220 ? "G$" : "fDAIx"; //42220 - celo
  const daix = await sf.loadSuperToken(superTokenAddressOrSymbol);
  setWallet({
    adress,
    balanceInEth,
    network,
    provider,
    sf,
    sfSigner,
    daix
  });
}

// do when account has changed
const synchronizeWallet = async (provider, setAccount) => {
  await provider.send("eth_requestAccounts", []);
  updateWallet(provider, setAccount);
}

const connectToMetamask =  async (setWallet, initialization) => {
  if(window.ethereum){  //if there is Metamask installed
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    const isLogged = await isMetaMaskConnected(provider);
    if(isLogged || !initialization){  //auto login on initialization when user is already logged in or force login with button(init=false)
      // if(!isLogged && !initialization) alert('Open Metamask and sign in');  //sometimes metamask will not open automatically so infrom user
      synchronizeWallet(provider, setWallet);
    }
    else { //if not logged on initialization
      setWallet(null);
    }
    if(initialization){ //add event listeners on initialization
      window.ethereum.on('accountsChanged', function (accounts) {
        if(accounts[0]) synchronizeWallet(provider, setWallet);
        else setWallet(null);
      })
      window.ethereum.on('chainChanged', function(networkId){
        updateWallet(provider, setWallet);
      });
      window.ethereum.on('message', function(message){
        console.log(message);
      });
    }
  }
  else if(!initialization){ //if there is no Metamask and user clikced connect button redirect to download page in new tab
    window.open('https://metamask.io/download/', '_blank').focus();
  }
  else{ //
    setWallet(null);
  }
}

export default connectToMetamask;