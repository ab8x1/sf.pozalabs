import { useState, useEffect } from 'react';
import {TableCell, TableHeader, Table, TripleData, ChainSelector, Chain, LoadingContainer} from './SentinelDaoStyles'

function SentinelDao(){
    const [loading, setLoading] = useState(true);
    const [chain, setChain] = useState('Arbitrum');

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000)
    }, [chain])

    return(
        <div className="container">
            <h1>Sentinel Dao</h1>
            <h2 style={{marginTop: '100px'}}>Sentinel profitability</h2>
            <ChainSelector>
                <Chain $selected={chain==="Arbitrum"} onClick={() => setChain("Arbitrum")}>Arbitrum</Chain>
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
                            <TripleData>
                                <span>7d</span>
                                <span>30d</span>
                                <span>1y</span>
                            </TripleData>
                        </TableHeader>
                        <TableHeader>DAO <br/> controlled</TableHeader>
                        <TableHeader>DAO funds</TableHeader>
                    </tr>
                </thead>
                <tbody>
                    {
                        loading ?
                            <tr>
                                <td colSpan={10}>
                                    <LoadingContainer/>
                                </td>
                            </tr>
                        :
                        <>
                            <tr>
                                <TableCell>1.1</TableCell>
                                <TableCell>1.2</TableCell>
                                <TableCell>1.3</TableCell>
                                <TableCell>
                                    <TripleData>
                                        <span>1%</span>
                                        <span>2%</span>
                                        <span>3%</span>
                                    </TripleData>
                                </TableCell>
                                <TableCell>1.5</TableCell>
                                <TableCell>1.6</TableCell>
                            </tr>
                            <tr>
                                <TableCell>2.1</TableCell>
                                <TableCell>2.2</TableCell>
                                <TableCell>2.3</TableCell>
                                <TableCell>
                                    <TripleData>
                                        <span>11%</span>
                                        <span>26%</span>
                                        <span>73%</span>
                                    </TripleData>
                                </TableCell>
                                <TableCell>2.5</TableCell>
                                <TableCell>2.6</TableCell>
                            </tr>
                            <tr>
                                <TableCell>2.1</TableCell>
                                <TableCell>2.2</TableCell>
                                <TableCell>2.3</TableCell>
                                <TableCell>
                                    <TripleData>
                                        <span>11%</span>
                                        <span>26%</span>
                                        <span>73%</span>
                                    </TripleData>
                                </TableCell>
                                <TableCell>2.5</TableCell>
                                <TableCell>2.6</TableCell>
                            </tr>
                            <tr>
                                <TableCell>2.1</TableCell>
                                <TableCell>2.2</TableCell>
                                <TableCell>2.3</TableCell>
                                <TableCell>
                                    <TripleData>
                                        <span>11%</span>
                                        <span>26%</span>
                                        <span>73%</span>
                                    </TripleData>
                                </TableCell>
                                <TableCell>2.5</TableCell>
                                <TableCell>2.6</TableCell>
                            </tr>
                        </>
                    }
                </tbody>
            </Table>
        </div>
    )
}
export default SentinelDao;