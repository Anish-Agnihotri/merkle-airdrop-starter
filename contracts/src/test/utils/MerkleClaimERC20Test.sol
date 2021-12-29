// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity 0.8.10;

/// ============ Imports ============

import { DSTest } from "ds-test/test.sol"; // DSTest
import { MerkleClaimERC20 } from "../../MerkleClaimERC20.sol"; // MerkleClaimERC20

/// @title MerkleClaimERC20Test
/// @notice Scaffolding for MerkleClaimERC20 tests
/// @author Anish Agnihotri <contact@anishagnihotri.com>
contract MerkleClaimERC20Test is DSTest {

  /// ============ Storage ============

  /// @dev MerkleClaimERC20 contract
  MerkleClaimERC20 internal TOKEN;
  /// @dev User: Alice (in merkle tree)
  /// @dev User: Bob (not in merkle tree)
}