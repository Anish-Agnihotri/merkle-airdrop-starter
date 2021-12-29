// SPDX-License-Identifier: Unlicense
pragma solidity >=0.8.0;

/// ============ Imports ============

import { MerkleClaimERC20Test } from "./utils/MerkleClaimERC20Test.sol"; // Test scaffolding

/// @title Tests
/// @notice MerkleClaimERC20 tests
/// @author Anish Agnihotri <contact@anishagnihotri.com>
contract Tests is MerkleClaimERC20Test {
    /// @notice 
    function testExample() public {
        console.logAddress(address(ALICE));
        console.logAddress(address(BOB));
        assertTrue(true);
    }
}
