# MerkleClaimERC20

ERC20 token claimable by members of a [Merkle tree](https://en.wikipedia.org/wiki/Merkle_tree). Useful for conducting Airdrops. Utilizes [Solmate ERC20](https://github.com/Rari-Capital/solmate/blob/main/src/tokens/ERC20.sol) for modern ERC20 token implementation.

## Test

Tests use [Foundry: Forge](https://github.com/gakonst/foundry).

Install Foundry using the installation steps in the README of the linked repo.

### Run tests

```bash
# Go to contracts directory, if not already there
cd contracts/

# Get dependencies
forge update

# Run tests
forge test --root .
# Run tests with stack traces
forge test --root . -vvvv
```

## Deploy

Follow the `forge create` instructions ([CLI README](https://github.com/gakonst/foundry/blob/master/cli/README.md#build)) to deploy your contracts or use [Remix](https://remix.ethereum.org/).

You can specify the token `name`, `symbol`, `decimals`, and airdrop `merkleRoot` upon deploy.

## Credits

- [@brockelmore](https://github.com/Anish-Agnihotri/merkle-airdrop-starter/issues?q=is%3Apr+author%3Abrockelmore) for [#1](https://github.com/Anish-Agnihotri/merkle-airdrop-starter/pull/1)
- [@transmissions11](https://github.com/Anish-Agnihotri/merkle-airdrop-starter/issues?q=is%3Apr+author%3Atransmissions11) for [#2](https://github.com/Anish-Agnihotri/merkle-airdrop-starter/pull/2)
- [@devanonon](https://github.com/Anish-Agnihotri/merkle-airdrop-starter/issues?q=is%3Apr+author%3Adevanonon) for [#3](https://github.com/Anish-Agnihotri/merkle-airdrop-starter/pull/8)
