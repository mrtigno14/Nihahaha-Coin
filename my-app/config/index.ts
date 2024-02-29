import { Contract, ContractRunner } from "ethers";
import abi from "./abi.json";

export function getContract(signer: ContractRunner) {
  return new Contract(
    "0x0479BEAB510019d0cF3B0f9c6d0f34C2d4f30F4f" /* address of the deployed contract */,
    abi as any,
    signer
  );
}