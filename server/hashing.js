const { SHA256 } = require('crypto-js')
const jwt = require('jsonwebtoken')

let data = { id: 4 }


let token = jwt.sign(data, 'secret')
// console.log(token);


let decoded = jwt.verify(token, 'secret')
console.log(decoded);



// let message = 'Sumanth Maddirala'
// let hash = SHA256(message)
// console.log(hash.toString());

// let data = { id: 4 }
// let token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'secret').toString()
// }

// let resultHash = SHA256(JSON.stringify(token.data + 'secret')).toString()


