const products = require('./products')
const user = require('./user')
const order = require('./order')
function routes(app){
    app.use('/api/v1/product',products)
    app.use('/api/v1/user',user)
    app.use('/api/v1/order',order)

}
module.exports = routes