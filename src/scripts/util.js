/**
 * @function getData
 * @description Create a button element that accepts a text node.
 * @return {data} - `<button>` element.
 */

export const data = [
        {
            sku : 1,
            name : "Cotton T-Shirt, Medium",
            price : "1.99",
            qty : 4,
            cost:'',
            delete:''
        },
        {
            sku : 2,
            name : "Baseball Cap,One size",
            price : "2.99",
            qty : 2,
            cost:'',
            delete:''
        },
        {
            sku : 3,
            name : "Swim short, Medium",
            price : "3.99",
            qty : 5,
            cost:'',
            delete:''
        }
    ];
    

export const DOM = {
    tableContainer: document.getElementById('table-container'),
    subTotal:document.getElementById('sub-total'),
    vatTax:document.getElementById('vat-tax'),
    total:document.getElementById('total')
};

const link = document.querySelector('#buy-now-btn');
    link.addEventListener('click', () => {
        console.log(data);
        fetch("/", { 
                headers: { "Content-Type": "application/json; charset=utf-8" },
                method: "POST",
                body: JSON.stringify(data)      
            })
        .then(res => res.json()) // parse response as JSON (can be res.text() for plain response)
        .then(response => {
            // here you do what you want with response
    })
    .catch(err => {
        alert("sorry, Cannot post the data. Please check URL");
    });
});
