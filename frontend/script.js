var ethers = require("ethers"); // Ethers
var keccak256 = require("keccak256"); // Keccak256 hashing
var merkletree = require("merkletreejs"); // MerkleTree.js

const config = {
  "decimals": 4,
  "airdrop": {
    "0xB01EB4D6E95aD2dE71943182ECa65Eb4552440cc": [2000, 0],
    "0xE0D832F5015373138f12B19cEf946fb3c204c053": [400, 0],
    "0xff6b702a6b8032014Aeb97A5b8E3D70d4C59a43a": [100, 0],
    "0xAC6D19D67B6AA2af9019d66e44dE6a9E7175f76E": [2000, 0],
    "0x4EBfDE288aCeFB85a344B74d7b9E98c689476334": [400, 0],
    "0xd5AC64E995cC221fBeCc10bDAB33FB1fc5485a3b": [100, 0],
    "0xabe04E0CD1c981740bA9f63c33Bc4983039D9f3c": [2000, 0],
    "0x7826DE79AdB9CdE8de050d0fb702F5A5BA062709": [400, 0],
    "0x6AF8E0EcFD9C76047F2482156672660A25306C63": [100, 0],
    "0xe9723be82e91c89a5AFEBF9FdFe98309B0Cf9184": [200, 0],
    "0x6475C0b26cb957628044b2249e88dA5Ec145153D": [2000, 0],
    "0x146076eDcA452C60A83d07588c1da82C31e374D7": [400, 0],
    "0x3c88760C6B01DF30DA215242172f735852E29035": [100, 0]
  }
}

/**
 * Generate Merkle Tree leaf from address and value
 * @param {string} address of airdrop claimee
 * @param {string} value of airdrop tokens to claimee
 * @returns {Buffer} Merkle Tree node
 */
function generateLeaf(address, value) {
  return Buffer.from(
    // Hash in appropriate Merkle format
    ethers.utils
      .solidityKeccak256(["address", "uint256"], [address, value])
      .slice(2),
    "hex"
  );
}

// Setup merkle tree
const merkleTree = new merkletree.MerkleTree(
  // Generate leafs
  Object.entries(config.airdrop).map(([address, tokens]) =>
    generateLeaf(
      ethers.utils.getAddress(address),
      ethers.utils.parseUnits(tokens.toString(), config.decimals).toString()
    )
  ),
  // Hashing function
  keccak256,
  { sortPairs: true }
);

/**
 * Collects number of tokens claimable by a user from Merkle tree
 * @param {string} address to check
 * @returns {number} of tokens claimable
 */
const getAirdropAmount = (address) => {
  // If address is in airdrop
  if (address in config.airdrop) {
    // Return number of tokens available
    return config.airdrop[address];
  }

  // Else, return 0 tokens
  return 0;
};

const checkAirdrop = async (address) => {
  // If not authenticated throw
  if (!address) {
    throw new Error("Not Authenticated");
  }

  // Get properly formatted address
  const formattedAddress = ethers.utils.getAddress(address);
  // Get tokens for address
  const numTokens = ethers.utils
    .parseUnits(config.airdrop[address].toString(), config.decimals)
    .toString();

  // Generate hashed leaf from address
  const leaf = generateLeaf(formattedAddress, numTokens);
  // Generate airdrop proof
  const proof = merkleTree.getHexProof(leaf);

  console.log(`formattedAddress: ${formattedAddress}; numTokens: ${numTokens}; proof: ${proof}`);
};

const verifyInclusion = () => {

}

console.log('MERKLE TREE', merkleTree);
console.log('AIRDROP AMOUNT', getAirdropAmount('0xB01EB4D6E95aD2dE71943182ECa65Eb4552440cc'));
console.log('CHECK AIRDROP', checkAirdrop('0xB01EB4D6E95aD2dE71943182ECa65Eb4552440cc'));
