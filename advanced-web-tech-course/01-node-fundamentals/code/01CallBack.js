function orderPizza(callback) {
    console.log("Ordering Back");

    setTimeout(()=>{callback("Pizza Ready")},3000)
}

orderPizza((pizza) => {
    console.log(pizza)
    console.log("Eating Pizza")
});