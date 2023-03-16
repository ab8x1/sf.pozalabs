import { useState, useEffect, useContext } from 'react';
import {TableCell, TableHeader, Table, DoubleData, ChainSelector, Chain, LoadingContainer, Frame, IframeContainer} from './SentinelDaoStyles'
import getSentinelsInfo from './helpers/getSentinels';
import { shortenAdress } from '../Navbar/TopNavbar';
import { ActionButton } from '../Borrow-Against-Salary/Offers/offersStyles';
import SentinelAction from './SentinelAction'
import { GlobalCTX } from '../../components/App'
import SnackBar from '../../../modules/SnackBar';
import Accordion from './Accordion'
import faqData from './faqData';
import Image from 'next/image';

const chainScan = {
    Goerli: "https://goerli.etherscan.io",
    Polygon: "https://polygonscan.com/"
}

function SentinelDao(){
    const [chain, setChain] = useState('Goerli');
    const [tokensInfo, setTokensInfo] = useState();
    const [dialog, setDialog] = useState(false);
    const [snackBar, setSnackBar] = useState({isOpened: false, status: "success", message: ""});
    const globalCTX = useContext(GlobalCTX);
    const {wallet, connectWallet} = globalCTX;

    useEffect(() => {
        const getInfo = async () => {
            setTokensInfo(undefined);
            const info = await getSentinelsInfo(chain);
            setTokensInfo(info);
        }
        getInfo();
    }, [chain]);

    const changeChain = chainName => {
        if(tokensInfo !== undefined)
            setChain(chainName)
    }

    return(
        <div className="container">
            <h1>Sentinel Dao</h1>
            <h3 style={{marginTop: '80px'}}>Tap into Sentinel&apos;s profitability in just one click</h3>
            <ChainSelector>
                <Chain $selected={chain==="Polygon"} onClick={() => changeChain("Polygon")}>Polygon</Chain>
                <Chain $selected={chain==="Goerli"} onClick={() => changeChain("Goerli")}>Goerli</Chain>
            </ChainSelector>
            {chain==="Polygon" && <p>State from 15.03.2023</p>}
            <div style={{overflow: 'auto', padding: '5px'}}>
                <Table>
                    <thead>
                        <tr>
                            <TableHeader>Token</TableHeader>
                            <TableHeader>Sentinel</TableHeader>
                            <TableHeader>Stake</TableHeader>
                            <TableHeader>7d APR</TableHeader>
                            <TableHeader>30d APR</TableHeader>
                            <TableHeader>Jackpots</TableHeader>
                            <TableHeader>Unprofitable TXs</TableHeader>
                            <TableHeader>DAO</TableHeader>
                            <TableHeader>DAO funds</TableHeader>
                            <TableHeader>Action</TableHeader>
                        </tr>
                    </thead>
                    {
                        tokensInfo === undefined ?
                        <tbody>
                            <tr>
                                <td colSpan={10}>
                                    <LoadingContainer/>
                                </td>
                            </tr>
                        </tbody>
                        :
                        <tbody>
                            {
                                Object.entries(tokensInfo).map(([key, {transactions, apr, stake, sentinel, daoControlled, daoFunds, name}]) =>
                                <tr key={key}>
                                    <TableCell>
                                        <a className='centerFlex' href={`${chainScan[chain]}/token/${key}`} target="_blank" rel="noreferrer">
                                            {name}
                                            <Image src={`/tokens/${name}.svg`} width={24} height={24} alt="token logo" style={{marginLeft: '5px'}}/>
                                        </a>
                                    </TableCell>
                                    <TableCell>
                                        <a href={`${chainScan[chain]}/address/${sentinel}`} target="_blank" rel="noreferrer">
                                            {shortenAdress(sentinel)}
                                        </a>
                                    </TableCell>
                                    <TableCell>
                                        <div className='centerFlex'>
                                            {stake}
                                            <Image src={`/tokens/${name}.svg`} width={24} height={24} alt="token logo" style={{marginLeft: '5px'}}/>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <span>{Number.isFinite(apr['7d']) ? `${apr['7d']}%` : '-'}</span>
                                    </TableCell>
                                    <TableCell>
                                        <span>{Number.isFinite(apr['30d']) ? `${apr['30d']}%` : '-'}</span>
                                    </TableCell>
                                    <TableCell>
                                            <span style={{color: "#4CAF50"}}>{Math.ceil((transactions.jackPot/transactions.total)*100)}%</span>
                                    </TableCell>
                                    <TableCell>
                                            <span style={{color: "#EF5350"}}>{Math.floor((transactions.unprofitable/transactions.total)*100)}%</span>
                                    </TableCell>
                                    <TableCell>{daoControlled === true ? "✔️" : "❌"}</TableCell>
                                    <TableCell>{daoFunds ? Number(daoFunds).toFixed(2) : "-"}</TableCell>
                                    <TableCell><ActionButton $disabled={chain==="Polygon"} onClick={wallet ? () => setDialog(key) : () => connectWallet(false)}>Manage</ActionButton></TableCell>
                                </tr>

                            )
                            }
                        </tbody>
                    }
                </Table>
            </div>
            {
                dialog && <SentinelAction closeDialog={() => setDialog(false)} wallet={wallet} setSnackBar={setSnackBar} data={tokensInfo?.[dialog]}/>
            }
            <h2 style={{marginTop: '50px'}}>FAQ</h2>
            <div style={{margin: '50px 0 50px 0'}}>
                {
                    faqData.map(({title, content}) =>
                        <Accordion key={title} title={title} content={content}/>
                    )
                }
            </div>
            <Frame>
                <IframeContainer>
                    <iframe
                        title="Harvest 3: The New Beginning"
                        width="100%"
                        height="100%"
                        src={'https://www.youtube.com/embed/N5XpY0fCQbM'}
                        allow='autoplay; encrypted-media'
                    />
                </IframeContainer>
            </Frame>
            {snackBar.isOpened &&
                <SnackBar
                    status={snackBar.status}
                    message={snackBar.message}
                    closeSnackBar={() => setSnackBar(st => ({...st, isOpened: false}))}
                />
            }
        </div>
    )
}
export default SentinelDao;