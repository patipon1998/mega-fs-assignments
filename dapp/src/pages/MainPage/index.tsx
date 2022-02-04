import React, { useState, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';

import HeaderBar from '../../components/HeaderBar';
import web3Service from '../../services/Web3Service';
import TabPanel from '../../components/TabPanel';
import InfoBox from '../../components/InfoBox';
import ActionCard from '../../components/ActionCard'

const InfoContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 40px;
`

const modalStyle = {
  textAlign: 'center',
  textColor: 'black !important',
  color: 'black',
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '4px solid #000',
  boxShadow: 24,
  p: 4,
}

const MainPage = ({ }): JSX.Element => {

  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [chainId, setChainId] = useState<number | undefined>();
  const [account, setAccount] = useState<string | undefined>();

  const [balance, setBalance] = useState<number | undefined>();
  const [supplied, setSupplied] = useState<number | undefined>();

  const [value, setValue] = React.useState(0);

  const [error, setError] = React.useState<string | undefined>();
  const handleCloseError = () => setError(undefined);

  const [transaction, setTransaction] = React.useState<string | undefined>();
  const handleCloseTransaction = () => setTransaction(undefined);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const reCalBalance = async () => {
    try {
      web3Service.getAccountBalance().then(a => setBalance(a))
      web3Service.getSuppliedBalance().then(s => setSupplied(s))
    } catch {
      setError('Cannot connect to the contract, check your network.')
    }

  }

  const init = async () => {
    try {
      await web3Service.connect()
      setChainId(await web3Service.getChainId())
      setAccount((await web3Service.getAccounts())[0])
      reCalBalance()

      web3Service.onEvent("connect", (info: { chainId: number }) => {
        setChainId(info.chainId)
        reCalBalance()
      })
      web3Service.onEvent("chainChanged", (newChainId: number) => {
        setChainId(newChainId)
        reCalBalance()
      });
      web3Service.onEvent("accountsChanged", (accounts: string[]) => {
        console.log(accounts);
        setAccount(accounts[0])
        reCalBalance()
      });
      web3Service.onEvent("disconnect", (error: { code: number; message: string }) => {
        reCalBalance()
      });
    } catch (_) {
      setError('Cannot connect to the contract, check your network.')
    }
  }

  const handleSupply = async (eth: number) => {
    const { transactionHash, error } = await web3Service.mint(eth).catch(e => {
      console.log(e)
      setError(e.message)
    })
    if (transactionHash) setTransaction(transactionHash)
    if (error) setError(error.message)

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
            <InfoBox title='Your Supplied' detail={`${supplied ? Math.round(supplied * 1e+5) / 1e+5 : '-'} eth`} />
            <InfoBox title='Your Supplied' detail='eth' />
            <InfoBox title='Your Supplied' detail='eth' />
          </InfoContainer>
          <ActionCard
            onSubmit={handleSupply}
            actionType={1}
            accountBalance={balance}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ActionCard
            onSubmit={handleSupply}
            actionType={2}
            accountBalance={supplied}
          />
        </TabPanel>
      </Box>


      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={!!error}
        onClose={handleCloseError}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={!!error}>
          <Box sx={modalStyle}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              An Error Occurs.
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              {error && error.toString()}
            </Typography>
            <br />
            <Button
              style={{ marginLeft: 'auto', marginRight: 'auto' }}
              variant="contained"
              onClick={handleCloseError}
            >ok</Button>
          </Box>
        </Fade>
      </Modal>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={!!transaction}
        onClose={handleCloseTransaction}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={!!transaction}>
          <Box sx={modalStyle}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Transaction submitted
            </Typography>
            <br />
            <a href={`https://rinkeby.etherscan.io/tx/${transaction}`} target="_blank">
              View on Etherscan
            </a>
            <br />
            <br />
            <Button
              style={{ marginLeft: 'auto', marginRight: 'auto' }}
              variant="contained"
              onClick={handleCloseTransaction}
            >ok</Button>
          </Box>
        </Fade>
      </Modal>
    </>
  )
}

export default MainPage