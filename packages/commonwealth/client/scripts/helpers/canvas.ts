import { ethers } from 'ethers';
import createHash from "create-hash"
import * as cbor from "microcbor"

import { bech32 } from "bech32"
import { encodeAddress as encodeSS58Address, decodeAddress as decodeSS58Address } from "@polkadot/util-crypto"

// Extracted from @canvas-js/core in src/encoding.ts, src/chains/index.ts.
// TODO: Export these functions as a common library when possible.

export function encodeAddress(chain, chainId, address): Uint8Array {
	if (chain === "eth") {
		return ethers.utils.arrayify(address)
	} else if (chain === "cosmos") {
		if (chainId in bech32Prefixes) {
			const { prefix, words } = bech32.decode(address)
			if (prefix !== bech32Prefixes[chainId]) {
				throw new Error(`cosmos address ${address} does not match the provided chainId ${chainId}`)
			}

			return new Uint8Array(bech32.fromWords(words))
		} else {
			throw new Error(`unknown cosmos chainId: ${chainId}`)
		}
	} else if (chain === "solana") {
		return base58.decode(address)
	} else if (chain === "substrate") {
		return decodeSS58Address(address)
	} else if (chain === "near") {
		throw Error("The NEAR chain is not supported")
	} else {
		signalInvalidType(chain)
	}
}

export function decodeAddress(chain, chainId, address: Uint8Array): string {
	if (chain === "eth") {
		return getAddress(ethers.utils.hexlify(address))
	} else if (chain === "cosmos") {
		if (chainId in bech32Prefixes) {
			return bech32.encode(bech32Prefixes[chainId], bech32.toWords(address))
		} else {
			throw new Error(`unknown cosmos chainId ${chainId}`)
		}
	} else if (chain === "solana") {
		return base58.encode(address)
	} else if (chain === "substrate") {
		return encodeSS58Address(address)
	} else if (chain === "near") {
		throw Error("The NEAR chain is not supported")
	} else {
		signalInvalidType(chain)
	}
}

export function encodeBlockhash(chain: Chain, chainId: ChainId, blockhash: string): Uint8Array {
	if (chain === "eth") {
		return ethers.utils.arrayify(blockhash)
	} else if (chain === "cosmos") {
		return ethers.utils.arrayify(blockhash)
	} else if (chain === "solana") {
		return base58.decode(blockhash)
	} else if (chain === "substrate") {
		return ethers.utils.arrayify(blockhash)
	} else if (chain === "near") {
		throw Error("The NEAR chain is not supported")
	} else {
		signalInvalidType(chain)
	}
}

export function decodeBlockhash(chain: Chain, chainId: ChainId, blockhash: Uint8Array): string {
	if (chain === "eth") {
		return ethers.utils.hexlify(blockhash)
	} else if (chain === "cosmos") {
		return ethers.utils.hexlify(blockhash)
	} else if (chain === "solana") {
		return base58.encode(blockhash)
	} else if (chain === "substrate") {
		return ethers.utils.hexlify(blockhash)
	} else if (chain === "near") {
		throw Error("The NEAR chain is not supported")
	} else {
		signalInvalidType(chain)
	}
}

export function fromBinarySession(session: BinarySession): Session {
	const { chain, chainId, from, address, blockhash } = session.payload

	return {
		type: "session",
		signature: ethers.utils.hexlify(session.signature),
		payload: {
			...session.payload,
			from: decodeAddress(chain, chainId, from),
			address: decodeAddress(chain, chainId, address),
			blockhash: blockhash ? decodeBlockhash(chain, chainId, blockhash) : null,
		},
	}
}

export function toBinaryAction(action: Action): BinaryAction {
	const { chain, chainId, from, blockhash } = action.payload

	return {
		type: "action",
		signature: ethers.utils.arrayify(action.signature),
		session: action.session ? encodeAddress(chain, chainId, action.session) : null,
		payload: {
			...action.payload,
			from: encodeAddress(chain, chainId, from),
			blockhash: blockhash ? encodeBlockhash(chain, chainId, blockhash) : null,
		},
	}
}

export function actionToHash(action: Action): Buffer {
	const binaryAction = toBinaryAction(action)
	const data = cbor.encode(binaryAction)
	const hash = createHash("sha256").update(data).digest()
	return hash
}

export function sessionToHash(session: Session): Buffer {
	const binarySession = toBinarySession(session)
	const data = cbor.encode(binarySession)
	const hash = createHash("sha256").update(data).digest()
	return hash
}
