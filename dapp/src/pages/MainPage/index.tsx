import React, { useState, useEffect } from 'react';

import HeaderBar from '../../components/HeaderBar';

import web3Service from '../../services/Web3Service'

const MainPage = ({ }): JSX.Element => {

    const [isConnected, setIsConnected] = useState<boolean>(false);
    const [chainId, setChainId] = useState<number | undefined>();
    const [account, setAccount] = useState<string | undefined>();

    const init = async () => {
        try {
            await web3Service.connect()
            console.log(await web3Service.getChainId())
            setChainId(await web3Service.getChainId())
            console.log(await web3Service.getAccounts())
            setAccount((await web3Service.getAccounts())[0])
            web3Service.onEvent("connect", (info: { chainId: number }) => {
                setChainId(info.chainId)
            })
            web3Service.onEvent("chainChanged", (newChainId: number) => {
                setChainId(newChainId)
            });
            web3Service.onEvent("accountsChanged", (accounts: string[]) => {
                console.log(accounts);
                setAccount(accounts[0])
            });
            web3Service.onEvent("disconnect", (error: { code: number; message: string }) => {
                console.log(error);
            });
        } catch (_) {
            console.log('cannot connect to the wallet')
        }

    }

    useEffect(() => {
        init()
    }, [])

    return (
        <>
            <HeaderBar
                walletAddress={account}
                connectWallet={init} />
        </>
    )
}

export default MainPage