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
//resolverAddress: "0x05eE721BD4D803d6d477Aa7607395452B65373FF"
  //celo resolver:
  //0x05eE721BD4D803d6d477Aa7607395452B65373FF

  //celo daix:
  //0xEC77e13E60847fbCA242A3DFA8d8B3f386Af7593

  //CELOx
  //0x671425ae1f272bc6f79bec3ed5c4b00e9c628240

  //mumbai resolver
  //0x8C54C83FbDe3C59e59dd6E324531FB93d4F504d3

  //mumbai fdaix
  //0x5d8b4c2554aeb7e86f387b4d6c00ac33499ed01f
  const sfSigner = sf.createSigner({ web3Provider: provider });
  const superTokenAddressOrSymbol = network.chainId === 42220 ? "G$" : "fDAIx"; //42220 - celo
  console.log(`superTokenAddressOrSymbol:`)
  console.log(superTokenAddressOrSymbol)
  const daix = await sf.loadSuperToken(superTokenAddressOrSymbol);
  console.log(`SuperToken:`)
  console.log(daix)
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