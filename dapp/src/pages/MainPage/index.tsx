import React, { useState, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import HeaderBar from '../../components/HeaderBar';
import web3Service from '../../services/Web3Service';
import TabPanel from '../../components/TabPanel';
import InfoBox from '../../components/InfoBox';
import styled from 'styled-components';

const InfoContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
`

const MainPage = ({ }): JSX.Element => {

  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [chainId, setChainId] = useState<number | undefined>();
  const [account, setAccount] = useState<string | undefined>();

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

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
        connectWallet={init}
      />
      <Box sx={{ width: '100%', maxWidth: 1400, marginLeft: 'auto', marginRight: 'auto', marginTop: '40px' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Supply" />
            <Tab label="Withdraw" />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <InfoContainer>
            <InfoBox title='Your Supplied' detail='eth' />
            <InfoBox title='Your Supplied' detail='eth' />
            <InfoBox title='Your Supplied' detail='eth' />
          </InfoContainer>
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
      </Box>
    </>
  )
}

export default MainPage