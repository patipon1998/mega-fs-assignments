import React from 'react';
import styled from 'styled-components';
import Web3Service from '../../services/Web3Service';

const Header = styled.header`
    padding: 12px 24px;
    background: rgba(9, 15, 31, 0.9);
    box-shadow: none;
    backdrop-filter: blur(10px);
`
const Container = styled.div`
    width: 100%;
    display: block;
    box-sizing: border-box;
    margin-left: auto;
    margin-right: auto;
    padding-left: 16px;
    padding-right: 16px;

    @media (min-width: 600px) {
        padding-left: 24px;
        padding-right: 24px;
    }

    @media (min-width: 1280px) {
        max-width: 1280px;
    }
`

const MultiBlock = styled.div`
    display: flex;
    flex-grow: 1;
    align-items: center;
    justify-content: space-between;
`

const WalletBtn = styled.div`
    max-width: 172px;
`

type propType = {
    walletAddress?: string
    connectWallet: () => void
}

const HeaderBar = ({ walletAddress, connectWallet }: propType): JSX.Element => {
    return (
        <Header>
            <Container>
                <MultiBlock>
                    <img src='/images/compound-logo.svg' />
                    <WalletBtn>
                        <button className="MuiButtonBase-root MuiButton-root MuiButton-contained jss38 jss39 MuiButton-containedPrimary" tabIndex={0} type="button" onClick={connectWallet}>
                            {
                                walletAddress ?
                                    <span><img src="/images/metamask-icon.png" width="21" height="21" style={{ marginRight: '12px' }} />{walletAddress.slice(0, 4) + "..." + walletAddress.slice(walletAddress.length - 4, walletAddress.length)}</span>
                                    :
                                    "Connect Wallet"
                            }
                            <span className="MuiTouchRipple-root"></span>
                        </button>
                    </WalletBtn>
                </MultiBlock>
            </Container>
        </Header >

    )
}

export default HeaderBar