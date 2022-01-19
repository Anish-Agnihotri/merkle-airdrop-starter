// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity >=0.8.0;

/// ============ Imports ============

import { DSTest } from "ds-test/test.sol"; // DSTest
import { MerkleClaimERC20 } from "../../MerkleClaimERC20.sol"; // MerkleClaimERC20
import { MerkleClaimERC20User } from "./MerkleClaimERC20User.sol"; // MerkleClaimERC20 user

/// @title MerkleClaimERC20Test
/// @notice Scaffolding for MerkleClaimERC20 tests
/// @author Anish Agnihotri <contact@anishagnihotri.com>
contract MerkleClaimERC20Test is DSTest {

  /// ============ Storage ============

  /// @dev MerkleClaimERC20 contract
  MerkleClaimERC20 internal TOKEN;
  /// @dev User: Alice (in merkle tree)
  MerkleClaimERC20User internal ALICE;
  /// @dev User: Bob (not in merkle tree)
  MerkleClaimERC20User internal BOB;

  /// ============ Setup test suite ============

  function setUp() public virtual {
    // Create airdrop token
    TOKEN = new MerkleClaimERC20(
      "My Token", 
      "MT", 
      18, 
      // Merkle root containing ALICE with 100e18 tokens but no BOB
      0xd0aa6a4e5b4e13462921d7518eebdb7b297a7877d6cfe078b0c318827392fb55
    );

    // Setup airdrop users
    ALICE = new MerkleClaimERC20User(TOKEN); // 0x185a4dc360ce69bdccee33b3784b0282f7961aea
    BOB = new MerkleClaimERC20User(TOKEN); // 0xefc56627233b02ea95bae7e19f648d7dcd5bb132
  }
}
