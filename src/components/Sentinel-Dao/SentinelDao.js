import { useState, useEffect } from 'react';
import {TableCell, TableHeader, Table, DoubleData, ChainSelector, Chain, LoadingContainer} from './SentinelDaoStyles'
import getSentinelsInfo, {tokensNames} from './helpers/getSentinels';
import { shortenAdress } from '../Navbar/TopNavbar';

function SentinelDao(){
    const [chain, setChain] = useState('Polygon');
    const [tokensInfo, setTokensInfo] = useState();

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
                            <DoubleData>
                                <span>7d</span>
                                <span>30d</span>
                            </DoubleData>
                        </TableHeader>
                        <TableHeader>
                            TXs
                            <DoubleData>
                                <span>JackPots</span>
                                <span>Unprofitable</span>
                            </DoubleData>
                        </TableHeader>
                        <TableHeader>DAO <br/> controlled</TableHeader>
                        <TableHeader>DAO funds</TableHeader>
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
                                <TableCell>{stake}</TableCell>
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
                                <TableCell>{daoControlled === true ? "Yes" : "No"}</TableCell>
                                <TableCell>{daoFunds}</TableCell>
                            </tr>

                        )
                        }
                    </>
                }
            </Table>
        </div>
    )
}
export default SentinelDao;