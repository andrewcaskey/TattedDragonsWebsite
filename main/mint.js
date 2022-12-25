var account = null;
var cost = null;
var finalPrice = null;
var displayCost = null;
var whitelisted = false;
var presalePrice = 50000000000000000;
var regularPrice = 80000000000000000;
const ADDRESS = "0xCddeC25bDe7cbf66CC2eeE14f24C38BCe504e868";

(async () => {
    if (window.ethereum) {
        await window.ethereum.send('eth_requestAccounts');
        window.web3 = new Web3(window.ethereum);

        var accounts = await web3.eth.getAccounts();
        account = accounts[0];
        document.getElementById('wallet-connected').textContent = "Wallet Connected!";
        document.getElementById('wallet-address').textContent = account;

        var contract = new web3.eth.Contract(ABI, ADDRESS);
        var total = document.getElementById('total');

        contract.methods.presaleCost().call().then(function(receipt) {
            presalePrice = (receipt/1000000000000000000);
        })

        contract.methods.cost().call().then(function(receipt) {
            regularPrice = (receipt/1000000000000000000);
        })

        contract.methods.paused().call().then(function(receipt) {
            if (receipt) {
                document.getElementById('math').textContent = "Minting is currently paused.";
                document.getElementById('mint').disabled = true;
            }
        })

        contract.methods.presaleWallets(account).call().then(function(receipt) {
            whitelisted = receipt;
            cost = ((receipt) ? presalePrice : regularPrice);
            document.getElementById('cost').textContent = cost;
            displayCost = select.value * cost;
            total.textContent = displayCost;
        });

        var select = document.getElementById('quantity')
        
        select.onchange = () => {
            displayCost = select.value * cost;
            total.textContent = displayCost.toFixed(2);
        }
        document.getElementById('mint').onclick = () => {
            finalCost = displayCost *  1000000000000000000;             
            contract.methods.mint(account, select.value).send({from: account, value: finalCost});
        }

        contract.methods.totalSupply().call().then(function(receipt) {
            document.getElementById('minted').textContent = receipt;
        })

        setInterval(() => {
            contract.methods.totalSupply().call().then(function(receipt) {
                document.getElementById('minted').innerHTML = receipt;
            })
        }, 5000);
    }
})();