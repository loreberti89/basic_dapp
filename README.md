# basic_dapp
First test of DAPP on ethereum and solidity with Truffle

<h1>How install</h1>

<h3>Clone repo:</h3>
git clone https://github.com/loreberti89/basic_dapp.git

<h3>How start:</h3>
First You have to install <b>truffle</b>.
Truffle is a development framework for ethereum.

You can see the doc at the official site:
http://truffleframework.com/

And see the repo at:
https://github.com/trufflesuite/truffle


You can install truffle with npm but require NodeJS 5.0+. Works on Linux, macOS, or Windows.:

<code>npm install -g truffle</code>

Once time installed truffle I have to install a ethereum client.
I use, for convenience, <b>Ganache</b>, that you can find and install from the truffle site: 

http://truffleframework.com/ganache/
 
Once time download Ganache, you have to start it.
If you have a Linux You can download AppImage and exec with

<code>./ganache.AppImage</code>

<i>"Ganache is a personal Ethereum blockchain which you can use to run tests, execute commands, and inspect state while controlling how the chain operates."</i>

When you start ganache you have to see the rpc server, default is: 
<code>HTTP://127.0.0.1:7545</code>

Now You have to configure your <b>truffle.js</b>.

My configuration for truffle is:
```js
module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    }
  }
};
```

<b>Where host: 127.0.0.1 and port 7545 is Ganache configuration.</b>

Now You can Compile and Migrate your contracts. (See the truffle doc.)

For do this you can do:

<code>
truffle compile

truffle truffle migrate --reset
</code>

Now the Smart Contract is deployed on your Ethereum blockchain on Ganache and you can see the ethereum amount of first ganache wallet that is decreased 

<h3>Interface with web App</h3>

For interface your contract with webApp, You have to use Web3.js

For Doc:
https://github.com/ethereum/web3.js/

I have included it in index.html all the js library with cdn so You can avoid to install for now.

I have used jquery for this base app, but you can try to use new framework Drizzle, that you can find on truffle page.

Drizzle is a new framework base on Redux store that help you with contract interface.
http://truffleframework.com/docs/drizzle/getting-started

In <b>index.js</b> you have to configure with your ganache configuration and your contract:

```js
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
abi = JSON.parse('......');
```

The abi can be retrieve from migration <b>build/contracs/CryptoUser.json</b>.

You have to put all json in one row.

I use this tool https://www.freeformatter.com/json-formatter.html.

Copy entire abi property in json and put in one row then copy on 

<code>
JSON.parse('..');
</code>

Now you have to find contract address for create and Instance:

<code>
contractInstance = UserCrypto.at('....');
</code>

You find in <b>CryptoUser.json</b>
```json
"networks": {
    "5777": {
      "events": {},
      "links": {},
      "address": "0x345ca3e014aaf5dca488057592ee47305d9b3e10"
    }
  }, 
```

you can copy the address property an pase on contractInstance.

In index.js I have created an variable for convenience:

<code>
address = web3.eth.accounts[1];
</code>

That is the address (on ganache) that will interface with contract deployed so you can change this value.

<b>NOTE!</b>

Usally when you migrate your contract, ganache use the first contract, so the owner of contract will be:
<code>
web3.eth.accounts[0];
</code>

<b>NOTE!</b>

I say this to you because I implemented one function that only owner of contract can call : 
<code>withdraw()</code>

Now, if the operation is all complete and correct you can use the web interface for use your first DAPP.

For use:

1) Set a web3.eth.accounts[1];
2) go in web interface 
3) create new user with Name and Nick and the jquery assign a identity to user starting to <code>$.now();</code>
4) you have created your first transaction and it return event that write the data on frontende
5) try to change nickname 2/3 times, (it is a payable function so it will get the ethereum for the operation) that will drecrease the amout of web3.eth.accounts[1].
6) Set the address to web3.eth.accounts[0] (or owner of contract), Open new tab and open index.html, so try to click on withdraw and if operation succesful you can see that the web3.eth.accounts[0] increase his amount.
