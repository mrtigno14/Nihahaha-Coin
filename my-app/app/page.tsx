"use client";
import { useEffect, useState } from "react";
import { BrowserProvider } from "ethers";
import { getContract } from "../config";
import Image from "next/image";
import koyukiImage from '/workspaces/Arbitrum-Certificate/koyuki.png';

export default function Home() {
  const [walletKey, setwalletKey] = useState("");

  const [mintingAmount, setMintingAmount] = useState<number>(0);
  const [mintSubmitted, setMintSubmitted] = useState(false);
  const [balance, setBalance] = useState<number>(0);

  const [stakingAmount, setStakingAmount] = useState<number>(0);
  const [stakedAmount, setStakedAmount] = useState<number>(0);
  const [stakeSubmitted, setStakeSubmitted] = useState(false);

  const [withdrawAmount, setWithdrawAmount] = useState<number>(0);
  const [elapsedStakeTime, setElapsedStakeTime] = useState<number>(0);
  const [withdrawSubmitted, setWithdrawSubmitted] = useState(false);

  const mintCoin = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);
    try {
      const tx = await contract.mint(signer, mintingAmount);
      await tx.wait();
      setMintSubmitted(true);
    } catch (e: any) {
      const decodedError = contract.interface.parseError(e.data);
      alert(`Minting failed: ${decodedError?.args}`);
    }
  };

  const mintAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (!isNaN(Number(inputValue))) {
      setMintingAmount(Number(inputValue));
      console.log(inputValue);
    } else {
      setMintingAmount(0);
    }
  };

  const stakeCoin = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);
    try {
      const tx = await contract.stake(stakingAmount);
      await tx.wait();
      setStakeSubmitted(true);
    } catch (e: any) {
      const decodedError = contract.interface.parseError(e.data);
      alert(`Minting failed: ${decodedError?.args}`);
    }
  };

  const stakeAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (!isNaN(Number(inputValue))) {
      setStakingAmount(Number(inputValue));
      console.log(inputValue);
    } else {
      setStakingAmount(0);
    }
  };

  const withdrawCoin = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);
    try {
      const tx = await contract.withdraw();
      await tx.wait();
      setWithdrawSubmitted(true);
    } catch (e: any) {
      const decodedError = contract.interface.parseError(e.data);
      alert(`Minting failed: ${decodedError?.args}`);
    }
  };

  const connectWallet = async () => {
    const { ethereum } = window as any;

    await ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          nativeCurrency: {
            name: "ETH",
            symbol: "ETH",
            decimals: 18,
          },
          rpcUrls: [
            "https://sepolia-rollup.arbitrum.io/rpc",
            "https://arbitrum-sepolia.blockpi.network/v1/rpc/public",
          ],
          chainId: "0x66eee",
          chainName: "Arbitrum Sepolia",
        },
      ],
    });

    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    setwalletKey(accounts[0]);

    await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [
        {
          chainId: "0x66eee",
        },
      ],
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
  <div className="flex justify-center items-center ">
    <div className="w-96 bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-6">
        KoyukiNft Minting
      </h1>

      <img src= {koyukiImage} alt="Mint Image" width={100} height={100} />

      <div className="text-center">
        <button
          onClick={() => {
            connectWallet();
          }}
          className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded mt-2 "
        >
          Connect Wallet
        </button>
      </div>

      <div className="text-center mb-6 mt-10">
        <h2 className="text-lg font-semibold">Mint</h2>
        <input
          type="number"
          className=" border rounded-md p-2 focus:outline-none focus:ring-4 focus:ring-yellow-500 focus:border-transparent"
          value={mintingAmount}
          onChange={(e) => mintAmountChange(e)}
          placeholder="Enter amount to mint"
          style={{ color: "black" }}
        />
        <button
          onClick={() => {
            mintCoin();
          }}
          className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded mt-2"
        >
          Mint Tokens
        </button>
      </div>

      <div className="text-center mb-6">
        <h2 className="text-lg font-semibold">Stake</h2>
        <input
          type="number"
          className="border rounded-md p-2 focus:outline-none focus:ring-4 focus:ring-yellow-500 focus:border-transparent"
          value={stakingAmount}
          onChange={(e) => stakeAmountChange(e)}
          placeholder="Enter amount to stake"
          style={{ color: "black" }}
        />
        <button
          onClick={() => {
            stakeCoin();
          }}
          className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded mt-2"
        >
          Stake Tokens
        </button>
      </div>

      <div className="text-center">
        <h2 className="text-lg font-semibold">Withdraw</h2>
        <button
          onClick={() => {
            withdrawCoin();
          }}
          className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded mt-2"
        >
          Withdraw Tokens
        </button>
      </div>
    </div>
  </div>
</main>

  );
}
