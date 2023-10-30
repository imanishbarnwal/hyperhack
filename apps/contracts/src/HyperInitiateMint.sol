// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Strings.sol";

interface IMailbox {
    function localDomain() external view returns (uint32);

    function dispatch(
        uint32 _destinationDomain,
        bytes32 _recipientAddress,
        bytes calldata _messageBody
    ) external returns (bytes32);

    function process(
        bytes calldata _metadata,
        bytes calldata _message
    ) external;

    function count() external view returns (uint32);

    function root() external view returns (bytes32);

    function latestCheckpoint() external view returns (bytes32, uint32);
}

interface IInterchainGasPaymaster {
    event GasPayment(
        bytes32 indexed messageId,
        uint256 gasAmount,
        uint256 payment
    );

    function payForGas(
        bytes32 _messageId,
        uint32 _destinationDomain,
        uint256 _gasAmount,
        address _refundAddress
    ) external payable;

    function quoteGasPayment(
        uint32 _destinationDomain,
        uint256 _gasAmount
    ) external view returns (uint256);
}

contract HyperInitiateMint {
    IMailbox mailbox;
    IInterchainGasPaymaster igp;
    uint private mintCost;
    uint256 gasAmount = 100000;

    event Executed(address indexed _from, bytes _value);

    constructor(address _mailbox, address _igp, uint _mintCost) {
        mailbox = IMailbox(_mailbox);
        igp = IInterchainGasPaymaster(_igp);
        mintCost = _mintCost;
    }

    function addressToBytes32(address _addr) internal pure returns (bytes32) {
        return bytes32(uint256(uint160(_addr)));
    }

    // To send message to Hyperlane
    function sendMessage(
        uint32 _destinationDomain,
        address _recipient,
        bytes memory _message
    ) private returns (bytes32) {
        bytes32 messageId = mailbox.dispatch(
            _destinationDomain,
            addressToBytes32(_recipient),
            _message
        );
        igp.payForGas{value: msg.value}(
            messageId, // The ID of the message that was just dispatched
            _destinationDomain, // The destination domain of the message
            gasAmount, // 100k gas to use in the recipient's handle function
            msg.sender // refunds go to msg.sender, who paid the msg.value
        );

        return messageId;
    }

    function initiateMint(
        uint32 _destinationDomain,
        address _recipient
    ) public payable {
        require(msg.value >= mintCost, "Pay the mint cost!!");

        bytes memory message = abi.encode(msg.sender);

        sendMessage(_destinationDomain, _recipient, message);
    }
}