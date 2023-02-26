import { useState, useEffect } from 'react';
import {TableCell, TableHeader, Table, DoubleData, ChainSelector, Chain, LoadingContainer} from './SentinelDaoStyles'
import getSentinelsInfo, {tokensNames} from './helpers/getSentinels';
import { shortenAdress } from '../Navbar/TopNavbar';
import { ActionButton } from '../Borrow-Against-Salary/Offers/offersStyles';
import SentinelAction from './SentinelAction'

function SentinelDao(){
    const [chain, setChain] = useState('Polygon');
    const [tokensInfo, setTokensInfo] = useState();
    const [dialog, setDialog] = useState(false);

    useEffect(() => {
        const getInfo = async () => {
            const info = await getSentinelsInfo();
            setTokensInfo(info);
        }
        getInfo();
    }, [chain])
    console.log(tokensInfo);
    return(
        <div className="container">
            <h1>Sentinel Dao</h1>
            <h2 style={{marginTop: '100px'}}>Sentinel profitability</h2>
            <ChainSelector>
                {/* <Chain $selected={chain==="Polygon"} onClick={() => setChain("Polygon")}>Polygon</Chain> */}
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
                            <DoubleData style={{marginTop: '5px'}}>
                                <span>7d</span>
                                <span>30d</span>
                            </DoubleData>
                        </TableHeader>
                        <TableHeader>
                            TXs
                            <DoubleData style={{marginTop: '5px'}}>
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
                    <>
                        {
                            Object.entries(tokensInfo).map(([key, {transactions, apr, stake, sentinel, daoControlled, daoFunds}]) =>
                            <tr key={key}>
                                <TableCell>{tokensNames[key]}</TableCell>
                                <TableCell>{shortenAdress(sentinel)}</TableCell>
                                <TableCell>{stake} <span style={{fontSize: '0.8rem'}}>{tokensNames[key]}</span></TableCell>
                                <TableCell>
                                    <DoubleData>
                                        <span>{apr['7d']}%</span>
                                        <span>{apr['30d']}%</span>
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
                                <TableCell><ActionButton onClick={() => setDialog(true)}>Manage</ActionButton></TableCell>
                            </tr>

                        )
                        }
                    </>
                }
            </Table>
            {
                dialog && <SentinelAction closeDialog={() => setDialog(false)}/>
            }
        </div>
    )
}
export default SentinelDao;