import { useState, useEffect, useContext } from 'react';
import {TableCell, TableHeader, Table, DoubleData, ChainSelector, Chain, LoadingContainer} from './SentinelDaoStyles'
import getSentinelsInfo from './helpers/getSentinels';
import { shortenAdress } from '../Navbar/TopNavbar';
import { ActionButton } from '../Borrow-Against-Salary/Offers/offersStyles';
import SentinelAction from './SentinelAction'
import { GlobalCTX } from '../../components/App'
import SnackBar from '../../../modules/SnackBar';
import Accordion from './Accordion'
import faqData from './faqData';

function SentinelDao(){
    const [chain, setChain] = useState('Goerli');
    const [tokensInfo, setTokensInfo] = useState();
    const [dialog, setDialog] = useState(false);
    const [snackBar, setSnackBar] = useState({isOpened: false, status: "success", message: ""});
    const globalCTX = useContext(GlobalCTX);
    const {wallet, connectWallet} = globalCTX;

    useEffect(() => {
        const getInfo = async () => {
            const info = await getSentinelsInfo(chain);
            setTokensInfo(info);
        }
        getInfo();
    }, [chain])
console.log(tokensInfo);
    return(
        <div className="container">
            <h1>Sentinel Dao</h1>
            <h2 style={{marginTop: '80px'}}>Sentinel profitability</h2>
            <ChainSelector>
                <Chain $selected={chain==="Polygon"} onClick={() => setChain("Polygon")}>Polygon</Chain>
                <Chain $selected={chain==="Goerli"} onClick={() => setChain("Goerli")}>Goerli</Chain>
            </ChainSelector>
            <Table>
                <thead>
                    <tr>
                        <TableHeader>Token</TableHeader>
                        <TableHeader>Current <br/> sentinel</TableHeader>
                        <TableHeader>Stake</TableHeader>
                        <TableHeader>
                            APR
                            <DoubleData style={{marginTop: '10px'}}>
                                <span>7d</span>
                                <span>30d</span>
                            </DoubleData>
                        </TableHeader>
                        <TableHeader>
                            TXs
                            <DoubleData style={{marginTop: '10px'}}>
                                <span>JackPots</span>
                                <span>Unprofitable</span>
                            </DoubleData>
                        </TableHeader>
                        <TableHeader>DAO <br/> controlled</TableHeader>
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
                                <TableCell>{name}</TableCell>
                                <TableCell>{shortenAdress(sentinel)}</TableCell>
                                <TableCell>{stake} <span style={{fontSize: '0.8rem'}}>{name}</span></TableCell>
                                <TableCell>
                                    <DoubleData>
                                        <span>{Number.isFinite(apr['7d']) ? `${apr['7d']}%` : '-'}</span>
                                        <span>{Number.isFinite(apr['30d']) ? `${apr['30d']}%` : '-'}</span>
                                    </DoubleData>
                                </TableCell>
                                <TableCell>
                                    <DoubleData>
                                        <span style={{color: "#4CAF50"}}>{Math.ceil((transactions.jackPot/transactions.total)*100)}%</span>
                                        <span style={{color: "#EF5350"}}>{Math.floor((transactions.unprofitable/transactions.total)*100)}%</span>
                                    </DoubleData>
                                </TableCell>
                                <TableCell>{daoControlled === true ? "✔️" : "❌"}</TableCell>
                                <TableCell>{Number(daoFunds).toFixed(2)}</TableCell>
                                <TableCell><ActionButton onClick={wallet ? () => setDialog(key) : () => connectWallet(false)}>Manage</ActionButton></TableCell>
                            </tr>

                        )
                        }
                    </tbody>
                }
            </Table>
            {
                dialog && <SentinelAction closeDialog={() => setDialog(false)} wallet={wallet} setSnackBar={setSnackBar} data={tokensInfo[dialog]}/>
            }
            {snackBar.isOpened &&
                <SnackBar
                    status={snackBar.status}
                    message={snackBar.message}
                    closeSnackBar={() => setSnackBar(st => ({...st, isOpened: false}))}
                />
            }
            <h2 style={{marginTop: '50px'}}>FAQ</h2>
            <div style={{margin: '50px 0 100px 0'}}>
                {
                    faqData.map(({title, content}) =>
                        <Accordion key={title} title={title} content={content}/>
                    )
                }
            </div>
        </div>
    )
}
export default SentinelDao;