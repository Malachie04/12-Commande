
//Components
const nom=[productName,procuctpric,productQuantity]=document.querySelectorAll('.input');
const addOrderbutton=document.querySelector('.ajouter');
const commandeListDiv=document.querySelector('.commande-detail');
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
    return(`${this.item_quantity}X ${this.item_name} - Total $${this.totalprice()}`);
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
    commande_detail.innerHTML += `<p>${index+1}. ${order.display()}</p>`;
  });

  commandeListDiv.append(commande_detail);
  total_price=global_price();

  totalPriceDiv.innerHTML = `<p>Total Price: ${total_price} Euro</p>`;
  nom.forEach(input => input.value = '');
  document.querySelector('.Msg').innerHTML = message;

  setTimeout(() => {
    document.querySelector('.Msg').innerHTML = '';
  }, 1000);
}

//Events

addOrderbutton.addEventListener('click', (e) => {
  e.preventDefault();
  const item_name = productName.value;
  const item_price = parseFloat(procuctpric.value);
  const item_quantity = parseInt(productQuantity.value);
  
  if (addOrder(item_name, item_price, item_quantity)) {
    message='Well done, you added a new order! 🎉';
    displayOrder();
    
  } else {
    message='Invalid data hahahaha 🙈';
    displayOrder();
  }
});