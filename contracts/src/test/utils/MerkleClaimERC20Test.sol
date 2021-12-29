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
      0x6a0b89fc219e9e72ad683e00d9c152532ec8e5c559600e04160d310936400a00
    );

    // Setup airdrop users
    ALICE = new MerkleClaimERC20User(TOKEN); // 0x109f93893af4c4b0afc7a9e97b59991260f98313
    BOB = new MerkleClaimERC20User(TOKEN); // 0x689856e2a6eb68fc33099eb2ccba0a5a4e8be52f
  }
}