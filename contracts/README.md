# MerkleClaimERC20

ERC20 token claimable by members of a [Merkle tree](https://en.wikipedia.org/wiki/Merkle_tree). Useful for conducting Airdrops. Utilizes [Solmate ERC20](https://github.com/Rari-Capital/solmate/blob/main/src/tokens/ERC20.sol) for modern ERC20 token implementation.

## Test

Tests use [Foundry: Forge](https://github.com/gakonst/foundry).

### Install Forge

```bash
cargo install --git https://github.com/gakonst/foundry --bin forge --locked
```

### Run tests

```bash
# Go to contracts directory, if not already there
cd contracts/

# Get dependencies
forge update

# Run tests
forge test --root . --verbosity 4
```

## Deploy

Follow the `forge create` instructions ([CLI README](https://github.com/gakonst/foundry/blob/master/cli/README.md#build)) to deploy your contracts or use [Remix](https://remix.ethereum.org/).

You can specify the token `name`, `symbol`, `decimals`, and airdrop `merkleRoot` upon deploy.
