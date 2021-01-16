//
// Add package imports and setup here
//
const ContractKit = require('@celo/contractkit');
const kit = ContractKit.newKit(`https://alfajores-forno.celo-testnet.org`);

// 1. Import ContractKit

// 2. Init a new kit, connected to the alfajores testnet

//
// Read Accounts
//

async function readAccount(){
    // 3. Get the Gold Token contract
    let goldtoken = await kit.contracts.getGoldToken();
    // 4. Address to look up
    const anAddress = `0x6D8df2A24aF4C1BBccA52c40272687223b30Bb8A`;
    // 5. Get Gold Token Balance
    let balance = await goldtoken.balanceOf(anAddress)
    // Print balance
    console.log(`${anAddress} balance: ${balance.toString()}`)
}

//
// Create an Account
//

// 6. Import the getAccount function
const getAccount = require('./getAccount').getAccount

async function createAccount(){
    // 7. Get your account
    let account = await getAccount()

    // 8. Get the Gold Token contract wrapper
    let goldtoken = await kit.contracts.getGoldToken()

    // 9. Get your CELO balance
    let balance = await goldtoken.balanceOf(account.address)

    // Print your account info
    console.log(`Your account address: ${account.address}`)
    console.log(`Your account balance: ${balance.toString()}`)
}

//
// Send Gold
//

async function send(){
    // 10. Get your account
    let account = await getAccount()

    // 11. Add your account to ContractKit to sign transactions
    kit.addAccount(account.privateKey)

    // 12. Specify recipient Address
    let anAddress = '0xeaBF95A4EDE464FEe82C144E6DF87076ab209fd5'

    // 13. Specify an amount to send
    let amount = 100000

    // 14. Get the Gold Token contract wrapper    
    let goldtoken = await kit.contracts.getGoldToken()

    // 15. Transfer gold from your account to anAddress
    let tx = await goldtoken.transfer(anAddress, amount).send({from: account.address})

    // 16. Wait for the transaction to be processed
    let receipt = await tx.waitReceipt()

    // 17. Print receipt
    console.log('Transaction receipt: %o', receipt)

    // 18. Get your new balance
    let balance = await goldtoken.balanceOf(account.address)

    // 19. Print new balance
    console.log(`Your new account balance: ${balance.toString()}`)
}

readAccount()
createAccount()
send()
