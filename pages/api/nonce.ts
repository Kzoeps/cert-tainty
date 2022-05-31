import type {NextApiRequest, NextApiResponse} from 'next';
import { ethers } from 'ethers';


/**
 * Generate byte32 hash from user wallet and nonce
 *
 * @param wallet_address The wallet address of the user
 *
 * { wallet_address: '0x.....' }
 *
 * @returns Byte32 Hash after packing the wallet and nonce with solidityKeccak256
 *
 */
async function GenerateNonce(req: NextApiRequest, res: NextApiResponse) {
	const { wallet_address } = req.body;
	const nonce = ethers.utils.hexlify(new Date().getTime());
	const hash = ethers.utils.solidityKeccak256(
		['string', 'string'],
		[nonce, wallet_address]
	);
	res.status(200).json({
		data: {
			hash
		}
	})
}

export default GenerateNonce;
