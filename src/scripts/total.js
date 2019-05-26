/**
 * @function setTotal
 * @description Create a button element that accepts a text node.
 * @return {data} - `<button>` element.
 */

const setTotal = (dom,data) => {
    const totalAndTax = {
        subTotal:0,
        total : 0,
        tax :0
    };

    data.forEach(function(val) { 
        totalAndTax.subTotal += (val.price * val.qty);
    });
    totalAndTax.tax = 0.2 * totalAndTax.subTotal;
    totalAndTax.total = totalAndTax.subTotal + totalAndTax.tax;
   
    dom.subTotal.innerHTML = '\u20ac'+totalAndTax.subTotal.toFixed(2);
    dom.total.innerHTML = '\u20ac'+totalAndTax.total.toFixed(2);
    dom.vatTax.innerHTML = '\u20ac'+totalAndTax.tax.toFixed(2);
   
};

export default setTotal;