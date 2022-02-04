import Web3 from "web3";
import { Contract } from 'web3-eth-contract/types'
import Web3Modal, { themesList } from "web3modal";
import { AbiItem } from 'web3-utils/types';

import { rinkebyAbi, rinkebyAddr } from '../abi'
import { goerliAbi, goerliContractAddr } from '../abiGoerli'

class Web3Service {

  private readonly web3Modal: Web3Modal;
  private web3?: Web3;
  private provider: any
  private contract?: Contract;

  constructor(web3Modal: Web3Modal) {
    this.web3Modal = web3Modal
  }

  private requireProvider() {
    if (!this.provider) throw new Error('Wallet is not connected')
  }

  private requireWeb3() {
    if (!this.web3) throw new Error('Wallet is not connected')
  }

  private requireContract() {
    if (!this.contract) throw new Error('Wallet is not connected')
  }

  public async connect() {
    const provider = await this.web3Modal.connect();
    this.provider = provider;
    this.web3 = new Web3(provider);
    this.contract = new this.web3!.eth.Contract(rinkebyAbi as any, rinkebyAddr)
  }


  public onEvent(eventName: string, callback: ({ }: any) => void) {
    this.requireProvider()
    this.provider.on(eventName, callback)
  }

  public getChainId() {
    this.requireWeb3()
    return this.web3!.eth.getChainId()
  }

  public getAccounts() {
    this.requireWeb3()
    return this.web3!.eth.getAccounts()
  }

  public getCurrentAccount() {
    return this.getAccounts().then(r => r[0])
  }

  public async getAccountBalance() {
    this.requireWeb3()

    const balance = Number(await this.web3!.eth.getBalance((await this.getAccounts())[0])) / Math.pow(10, 18);
    return balance
  }

  public async getSuppliedBalance() {
    this.requireWeb3()

    const balanceOfUnderlying = Number(this.web3!.utils.toBN(await this.contract!.methods.balanceOfUnderlying(await this.getCurrentAccount()).call())) / Math.pow(10, 18);
    return balanceOfUnderlying
  }

  public async mint(eth: number) {
    this.requireContract()
    this.requireWeb3()

    return this.contract!.methods.mint().send({
      from: await this.getCurrentAccount(),
      value: this.web3!.utils.toWei(`${eth}`, 'ether')
    });
  }

  public async getBlockPerSecRate() {
    this.requireWeb3()

    const nowBlockNumber = await this.web3!.eth.getBlockNumber()
    const nowBlock = await this.web3!.eth.getBlock(nowBlockNumber)
    const thenBlock = await this.web3!.eth.getBlock(nowBlockNumber - nowBlockNumber)
    return nowBlockNumber / (Number(nowBlock.timestamp) - Number(thenBlock.timestamp));
  }

  public async redeemUnderlying(eth: number) {
    this.requireContract()
    this.requireWeb3()

    return this.contract!.methods.redeemUnderlying(this.web3!.utils.toWei(`${eth}`, 'ether')).send({
      from: await this.getCurrentAccount(),
    });
  }

  public async getSupplyRatePerBlock() {
    this.requireContract()
    return (await this.contract!.methods.supplyRatePerBlock().call()) / Math.pow(10, 18);
  }

  public async getExchangeRate() {
    this.requireContract()
    return (await this.contract!.methods.exchangeRateCurrent().call()) / Math.pow(10, 18 + 18 - 8);
  }

  public async getTotalSupply() {
    this.requireContract()
    return (await this.contract!.methods.totalSupply().call());
  }

  public async getCash() {
    this.requireContract()
    return (await this.contract!.methods.getCash().call()) / Math.pow(10, 18);
  }
}

const web3Modal = new Web3Modal({
  network: "rinkeby", // optional
  cacheProvider: false, // optional
  providerOptions: {} // required
});

export default new Web3Service(web3Modal)