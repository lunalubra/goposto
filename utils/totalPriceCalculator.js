const totalPriceCalculator = (arr) => {
    const helperArray = [];
    arr.forEach((el) => {
        helperArray.push(el.qty * el.price);
    });
    return helperArray.reduce(
        (accumulator, currentValue) => accumulator + currentValue
    );
};

export default totalPriceCalculator;
