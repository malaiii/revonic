/**
 * @function setTable
 * @description Create a button element that accepts a text node.
 * @return {data} - `<button>` element.
 */
import { DOM,data } from './util';
import setTotal from  './total';


const createCell = (cell,row,dom) => {
    for (let key in cell) {
        if(key != 'sku'){
            const elem = document.createElement('div');
            elem.classList.add("Cell");

            if (key == 'name') {
                let elemTextNode = document.createTextNode(cell[key]);
                elem.appendChild(elemTextNode);
            }else if (key == 'price') {
                let elemTextNode = document.createTextNode('\u20ac'+cell[key]);
                elem.appendChild(elemTextNode);
            }else if (key == 'qty') {
                let elemContainer = document.createElement('div');
                elemContainer.classList.add("quantity");
                let elemQuantity = document.createElement('div');
                elemQuantity.classList.add("quantity-txt");

                let input = document.createElement('input');
                input.classList.add("quantity-field");
                input.classList.add('sku_'+cell['sku']);
                input.id = "quantity-input";
                input.setAttribute('type', 'text');
                input.setAttribute('value', cell[key]);
                input.setAttribute('disabled', true);

                elemQuantity.appendChild(input);
                elemContainer.appendChild(elemQuantity);
                elemContainer.appendChild(incDecbtn(cell['sku']));
                elem.appendChild(elemContainer);
               // elem.appendChild(incDecbtn);
            }else if(key == 'cost'){
                elem.classList.add('sku_price_'+cell['sku']);
                elem.classList.add('cost');
                let elemTextNode = document.createTextNode('\u20ac' + (cell['price'] * cell['qty']).toFixed(2));
                elem.appendChild(elemTextNode);
            }else if(key == 'delete'){
                let deleteContainer = document.createElement('span');
                let elemTextNodeD = document.createTextNode('delete');
                deleteContainer.classList.add("delete-button");
               // deleteContainer.appendChild(elemTextNodeD);
                elem.appendChild(deleteContainer);
                deleteContainer.setAttribute("sku",cell['sku']);
                deleteContainer.addEventListener('click',onDelete,false);
            }
            row.classList.add("sku-row_" + cell['sku']);
            row.appendChild(elem);
        }
    }
    dom.appendChild(row);
};

const setTable = (dom,data) => {
    data.forEach(function(val,index) { 
        const elem = document.createElement('div');
        elem.classList.add("Row");
        createCell(val,elem,dom);
    }) ;
};

const increMent = (event) => {
    const sku = event.target.getAttribute("sku");
    const input = document.getElementsByClassName('sku_'+sku);
    const input_price = document.getElementsByClassName('sku_price_'+sku);
    let dataSKU = data.filter(val => val.sku == sku);

    input[0].value = dataSKU[0].qty = parseInt(input[0].value) + 1;
    input_price[0].innerHTML = '\u20ac' + (dataSKU[0].qty * dataSKU[0].price).toFixed(2);
    setTotal(DOM,data);
};

const decreMent = (event) => {
    const sku = event.target.getAttribute("sku");
    const input = document.getElementsByClassName('sku_'+sku);
    const input_price = document.getElementsByClassName('sku_price_'+sku);
    let dataSKU = data.filter(val => val.sku == sku);

    if(input[0].value > 1){
        input[0].value = dataSKU[0].qty = parseInt(input[0].value) - 1;
        input_price[0].innerHTML = '\u20ac' + (dataSKU[0].qty * dataSKU[0].price).toFixed(2);
    }else 
        alert("- Minimum Quantity is 1. \r\n - For delete Product please use delete icon.");
    setTotal(DOM,data);
};

const incDecbtn = (sku) => {
    const elem = document.createElement('div');
    const spanPlus = document.createElement('span');
    const spanMin = document.createElement('span');
    const plus = document.createTextNode("+");
    const minus = document.createTextNode("-");

    elem.classList.add("inc-dec-buttons");
    spanPlus.classList.add("inc-btn");
    spanMin.classList.add("dec-btn");
    spanPlus.setAttribute("sku",sku);
    spanMin.setAttribute("sku",sku);

    //spanPlus.setAttribute("increMent")
    spanPlus.addEventListener('click',increMent,false);
    spanMin.addEventListener('click',decreMent,false);
    
    spanPlus.appendChild(plus);
    spanMin.appendChild(minus);
    elem.appendChild(spanPlus);
    elem.appendChild(spanMin);
    
    return elem;
};

const onDelete = (event) => {
    const sku = event.target.getAttribute('sku');
    let deleteIndex;
    data.forEach((val,index) => {
        if(val.sku == sku){
            deleteIndex = index;
        }
    });
    
    if(deleteIndex > -1){
        data.splice(deleteIndex,1);
        document.getElementsByClassName('sku-row_'+sku)[0].remove();
        
    }
    if(data.length == 0){
        document.getElementById('basket').innerHTML = "Products not available in the cart.";
    }
    console.log(data);
    setTotal(DOM,data);
    //setTable(DOM.tableContainer,dataSKU);
    //setTotal(DOM,dataSKU);
    //console.log(dataSKU);
};

export default setTable;
