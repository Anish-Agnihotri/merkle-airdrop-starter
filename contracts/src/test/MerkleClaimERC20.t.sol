// SPDX-License-Identifier: Unlicense
pragma solidity >=0.8.0;

/// ============ Imports ============

import { MerkleClaimERC20Test } from "./utils/MerkleClaimERC20Test.sol"; // Test scaffolding

/// @title Tests
/// @notice MerkleClaimERC20 tests
/// @author Anish Agnihotri <contact@anishagnihotri.com>
contract Tests is MerkleClaimERC20Test {
  /// @notice Allow Alice to claim 100e18 tokens
  function testAliceClaim() public {
    // Setup correct proof for Alice
    bytes32[] memory aliceProof = new bytes32[](1);
    aliceProof[0] = 0xceeae64152a2deaf8c661fccd5645458ba20261b16d2f6e090fe908b0ac9ca88;

    // Collect Alice balance of tokens before claim
    uint256 alicePreBalance = ALICE.tokenBalance();

    // Claim tokens
    ALICE.claim(
      // Claiming for Alice
      address(ALICE),
      // 100 tokens
      100e18,
      // With valid proof
      aliceProof
    );

    // Collect Alice balance of tokens after claim
    uint256 alicePostBalance = ALICE.tokenBalance();

    // Assert Alice balance before + 100 tokens = after balance
    assertEq(alicePostBalance, alicePreBalance + 100e18);
  }

  /// @notice Prevent Alice from claiming twice
  function testFailAliceClaimTwice() public {
    // Setup correct proof for Alice
    bytes32[] memory aliceProof = new bytes32[](1);
    aliceProof[0] = 0xceeae64152a2deaf8c661fccd5645458ba20261b16d2f6e090fe908b0ac9ca88;

    // Claim tokens
    ALICE.claim(
      // Claiming for Alice
      address(ALICE),
      // 100 tokens
      100e18,
      // With valid proof
      aliceProof
    );

    // Claim tokens again
    ALICE.claim(
      // Claiming for Alice
      address(ALICE),
      // 100 tokens
      100e18,
      // With valid proof
      aliceProof
    );
  }

  /// @notice Prevent Alice from claiming with invalid proof
  function testFailAliceClaimInvalidProof() public {
    // Setup incorrect proof for Alice
    bytes32[] memory aliceProof = new bytes32[](1);
    aliceProof[0] = 0xc11ae64152a2deaf8c661fccd5645458ba20261b16d2f6e090fe908b0ac9ca88;

    // Claim tokens
    ALICE.claim(
      // Claiming for Alice
      address(ALICE),
      // 100 tokens
      100e18,
      // With valid proof
      aliceProof
    );
  }

  /// @notice Prevent Alice from claiming with invalid amount
  function testFailAliceClaimInvalidAmount() public {
    // Setup correct proof for Alice
    bytes32[] memory aliceProof = new bytes32[](1);
    aliceProof[0] = 0xceeae64152a2deaf8c661fccd5645458ba20261b16d2f6e090fe908b0ac9ca88;

    // Claim tokens
    ALICE.claim(
      // Claiming for Alice
      address(ALICE),
      // Incorrect: 1000 tokens
      1000e18,
      // With valid proof (for 100 tokens)
      aliceProof
    );
  }

  /// @notice Prevent Bob from claiming
  function testFailBobClaim() public {
    // Setup correct proof for Alice
    bytes32[] memory aliceProof = new bytes32[](1);
    aliceProof[0] = 0xceeae64152a2deaf8c661fccd5645458ba20261b16d2f6e090fe908b0ac9ca88;

    // Claim tokens
    BOB.claim(
      // Claiming for Bob
      address(BOB),
      // 100 tokens
      100e18,
      // With valid proof (for Alice)
      aliceProof
    );
  }

  /// @notice Let Bob claim on behalf of Alice
  function testBobClaimForAlice() public {
    // Setup correct proof for Alice
    bytes32[] memory aliceProof = new bytes32[](1);
    aliceProof[0] = 0xceeae64152a2deaf8c661fccd5645458ba20261b16d2f6e090fe908b0ac9ca88;

    // Collect Alice balance of tokens before claim
    uint256 alicePreBalance = ALICE.tokenBalance();

    // Claim tokens
    BOB.claim(
      // Claiming for Alice
      address(ALICE),
      // 100 tokens
      100e18,
      // With valid proof (for Alice)
      aliceProof
    );

    // Collect Alice balance of tokens after claim
    uint256 alicePostBalance = ALICE.tokenBalance();

    // Assert Alice balance before + 100 tokens = after balance
    assertEq(alicePostBalance, alicePreBalance + 100e18);
  }
}
