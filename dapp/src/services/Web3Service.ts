import Web3 from "web3";
import { Contract } from 'web3-eth-contract/types'
import Web3Modal, { themesList } from "web3modal";

class Web3Service {

  private readonly web3Modal: Web3Modal;
  private web3?: Web3;
  private provider: any
  // private contract?: Contract;

  constructor(web3Modal: Web3Modal) {
    console.log(web3Modal)
    this.web3Modal = web3Modal
  }

  private requireProvider() {
    if (!this.provider) throw new Error('Wallet is not connected')
  }

  private requireWeb3() {
    if (!this.web3) throw new Error('Wallet is not connected')
  }
  // private requireWeb3() {
  //   if(!this.)
  // }

  // private initContract() {
  //   this.web3
  //   this.contract
  // }

  public async connect() {
    const provider = await this.web3Modal.connect();
    this.provider = provider;
    this.web3 = new Web3(provider);
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

}

const web3Modal = new Web3Modal({
  network: "rinkeby", // optional
  cacheProvider: false, // optional
  providerOptions: {} // required
});

export default new Web3Service(web3Modal)