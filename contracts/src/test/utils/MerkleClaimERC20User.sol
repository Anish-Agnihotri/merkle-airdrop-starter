// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity >=0.8.0;

/// ============ Imports ============

import { MerkleClaimERC20 } from "../../MerkleClaimERC20.sol"; // MerkleClaimERC20

/// @title MerkleClaimERC20User
/// @notice Mock MerkleClaimERC20 user
/// @author Anish Agnihotri <contact@anishagnihotri.com>
contract MerkleClaimERC20User {

  /// ============ Immutable storage ============

  /// @dev MerkleClaimERC20 contract
  MerkleClaimERC20 immutable internal TOKEN;

  /// ============ Constructor ============

  /// @notice Creates a new MerkleClaimERC20User
  /// @param _TOKEN MerkleClaimERC20 contract
  constructor(MerkleClaimERC20 _TOKEN) {
    TOKEN = _TOKEN;
  }

  /// ============ Helper functions ============

  /// @notice Returns users' token balance
  function tokenBalance() public view returns (uint256) {
    return TOKEN.balanceOf(address(this));
  }

  /// ============ Inherited functionality ============

  /// @notice Allows user to claim tokens from contract
  /// @param to address of claimee
  /// @param amount of tokens owed to claimee
  /// @param proof merkle proof to prove address and amount are in tree
  function claim(address to, uint256 amount, bytes32[] calldata proof) public {
    TOKEN.claim(to, amount, proof);
  }
}