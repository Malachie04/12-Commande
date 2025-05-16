
//Components
const nom=[productName,procuctpric,productQuantity]=document.querySelectorAll('.input');
const addOrderbutton=document.querySelector('.ajouter');
const commandeListDiv=document.querySelector('.commande-bottom');
const totalPriceDiv=document.querySelector('.totalprice');

//Global variables
let commandeList = [];
let total_price=0;
let temp_total_price=0;
let message='';

//Les classes
class commande{
  constructor(item_name, item_price,item_quantity){
    this.item_name = item_name;
    this.item_price = item_price;
    this.item_quantity = item_quantity;
  }
  totalprice(){
    return this.item_price * this.item_quantity;
  }
  display(){
    return(`${this.item_quantity}X ${this.item_name} - Total ${this.totalprice()} €`);
  }
}



//Functions
const addOrder = (item_name, item_price, item_quantity) => {

  if (isNaN(item_price) || isNaN(item_quantity) || item_price <= 0 || item_quantity <= 0 || item_name === '') {
   return false;
  }else{
    const newOrder = new commande(item_name, item_price, item_quantity);
    commandeList.push(newOrder);
    return true;
  }
  
}

const removeOrder = (index) => {  
  if (index >= 0 && index < commandeList.length) {
    commandeList.splice(index, 1);
    return true;
  } else {
    return false;
  }
}

const global_price=()=>{
  return commandeList.reduce((accumilateur, order) => {
    return accumilateur + order.totalprice();
  }, 0);  
}

const displayOrder=()=>{
  commandeListDiv.innerHTML = '';

  const commande_detail=document.createElement('div');
  commande_detail.classList.add('commande-detail');
  commandeList.forEach((order,index) => {
    commande_detail.innerHTML += `<p>${index+1}. ${order.display()} Le ${new Date().toLocaleString('fr-FR')}<span value='${index}' class="delete"></span></p>`;

    commande_detail.querySelectorAll('.delete').forEach((deleteButton, index) => {
      deleteButton.classList.add('delete');
      deleteButton.setAttribute('value', index);
    });
  });


  commandeListDiv.append(commande_detail);
  total_price=global_price();
  totalPriceDiv.innerHTML = `<p>General Total: ${total_price} €</p>`;
  nom.forEach(input => input.value = '');
  document.querySelector('.Msg').innerHTML = message;
  setTimeout(() => {
    document.querySelector('.Msg').innerHTML = '';
  }, 1000);
}

//Events
productQuantity.addEventListener('input',(e)=>{
  const value = e.target.value;
  if (isNaN(value) || value <= 0) {
    e.target.value = '';
  } 
});




procuctpric.addEventListener('input',(e)=>{
  const value = e.target.value;
  if (isNaN(value) || value <= 0) {
    e.target.value = '';
  } 
});

productName.addEventListener('input',(e)=>{
  e.target.value = e.target.value.replace(/[0-9]/g, '');
});

addOrderbutton.addEventListener('click', (e) => {
  e.preventDefault();
  const item_name = productName.value;
  const item_price = parseFloat(procuctpric.value);
  const item_quantity = parseFloat(productQuantity.value);
  
  if (addOrder(item_name, item_price, item_quantity)) {
    message='Well done, you added a new order! 🎉';
    displayOrder();

  } else {
    message='Invalid data hahahaha 🙈';
    displayOrder();
  }
});