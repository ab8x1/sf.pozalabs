import React, {useMemo, createContext, useState, useEffect} from 'react'
import connectToMetamask from '../../helpers/metamaskConnection'
import {ChildrenProps, WalletProps, GlobalContextProps} from './appTypes'

export const GlobalCTX = createContext<GlobalContextProps | null>(null);



function App({children}: ChildrenProps)  {
    const [wallet, setWallet] = useState<WalletProps>(undefined);

    const connectWallet = (initialization: boolean): void => {
      connectToMetamask(setWallet, initialization);
    }

    useEffect(() => {
      const initialization: boolean = true;
      connectWallet(initialization);
    }, [])

    const globalProvider = useMemo(() => ({wallet, connectWallet}), [wallet]);

    return (
      <GlobalCTX.Provider value={globalProvider}>
          {children}
      </GlobalCTX.Provider>
    )
  }

  export default App;
