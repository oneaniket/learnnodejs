function orderProduct(callback){
    console.log("Checking for the product")

    setTimeout(() =>{
        callback("Order has been placed!")
    }, 1000)
}

orderProduct((product) => {
    console.log(product)
    
    setTimeout(() => {
        console.log("Product has been delivered")
    }, 1000)
})