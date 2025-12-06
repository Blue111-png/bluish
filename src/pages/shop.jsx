import React, { useEffect, useState } from 'react';
import './Shop.css'; // Optional: for styling
import { Link } from 'react-router-dom';


const Shop = ({}) => {
const [cart, setCart]=useState([])
const [showCart, setShowCart] = useState(false);
const categories=['All','Guns','Machines','Knives', 'Heavy Weapons']
const [selectedCategory, setselectedCategory]=useState('All')
const [searchBar, setSearchBar]=useState('')
const [currentUser, setCurrentUser] = useState(null);

const products = [
  { id: 1, name: 'Dissel', price: 59.99, category: 'Guns', url: '/steve-woods-cD2eM-TkE68-unsplash.jpg', description : 'Hitman level pistol with 0.2kg weight,one round short with deal damage' },
  { id: 2, name: 'Flame Thrower', price: 129.99, category: 'Machines', url: '/tali-despins-DuwtKmVjG28-unsplash.jpg', description : 'blue product' },
  { id: 3, name: 'SMG', price: 39.99, category: 'Guns', url: '/stngr-llc--lWubJa7-co-unsplash.jpg', description : 'blue product' },
  { id: 4, name: 'Plasma Rifle', price: 199.99, category: 'Guns', url: '/close-up-rifle.jpg', description : 'blue product' },
  { id: 5, name: 'Grenade Launcher', price: 149.99, category: 'Heavy Weapons', url: '/vite.svg', description : 'blue product' },
  { id: 6, name: 'Crossbow', price: 89.99, category: 'Guns',url: '/064ba2a3-3bd6-42cc-9456-178b5b3ff827.jpg', description : 'blue product' },
  { id: 7, name: 'Katana', price: 74.99, category: 'Knives', url: '/katana-sword-with-japanese-sun.jpg', description : 'blue product' },
  { id: 8, name: 'Sniper Rifle', price: 179.99, category: 'Guns', url: '/maxim-potkin-WFRBQ94Xhhc-unsplash.jpg', description : 'blue product' },
  { id: 9, name: 'Combat Knife', price: 24.99, category: 'Knives', url: '/overhead-shot-metal-knife-black-gloves-white-surface.jpg', description : 'blue product' },
  { id: 10, name: 'EMP Grenade', price: 49.99, category: 'Heavy Weapons', url: '/hand-grenade-powerful-mass-destroying-weapon-with-brown-lever.jpg', description : 'blue product' },
];

//filter logic
const filteredProducts=selectedCategory === 'All'
 ? products : products.filter(product=>product.category === selectedCategory)



//addcart logic
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };
  //remove logic
  const removeFromCart = (id) => {

  setCart((prevCart) =>{
return prevCart.map((item)=>item.id ===id ? {...item, quantity: item.quantity -1} : item)
 .filter((item)=>item.quantity > 0) })
};
//clear cart logic
const clearCart=()=>{
  setCart([])
}

useEffect(() => {
  const storedUser = localStorage.getItem('currentUser');
  if (storedUser) {
    const parsedUser = JSON.parse(storedUser);
    setCurrentUser(parsedUser)
    setCart(parsedUser.cart || []);
  }
}, []);

useEffect(() => {
  if (!currentUser) return;

  const updatedUser = { ...currentUser, cart };
  localStorage.setItem('currentUser', JSON.stringify(updatedUser));

  const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
  const updatedUsers = storedUsers.map(user =>
    user.email === updatedUser.email ? updatedUser : user
  );
  localStorage.setItem('users', JSON.stringify(updatedUsers));
}, [cart, currentUser]);



const searchByName=filteredProducts.filter(item=>
  item.name.toLowerCase().includes(searchBar.toLowerCase()))


  return (
    <div className="shop-container">
      <button className='showCart-btn' onClick={() => setShowCart(!showCart)}>
  {showCart ? '🛒Hide Cart' : '🛒Show Cart'} <span className={cart.length > 0 ? 'cart-count' : ''}>
    {cart.length > 0 ? cart.length : ''}
  </span>

</button>
<label className='dropdown'>  Category:  
<select value={selectedCategory}
 onChange={e=>setselectedCategory(e.target.value)}>
  {categories.map(cat=>
    <option key={cat} value={cat}>{cat}</option>
  )}
</select>
</label>
<input type='search' 
className='searchBar'
value={searchBar}
onChange={e=>setSearchBar(e.target.value)}
placeholder='search product...'/>
      <h1>Welcome to the Shop</h1>
      <div className="product-list">
        {searchBar.trim() !== '' ? searchByName.map((item) => (
          <div key={item.id} className="product-card">
            <img src={item.url} alt={item.name} />
            <h2>{item.name}</h2>
            <p>${item.price.toFixed(2)}</p>
            <button onClick={()=>addToCart(item)}>Add to Cart</button>
          </div>)) : filteredProducts.map((item) => (
          <div key={item.id} className="product-card">
            <img src={item.url} alt={item.name} />
            <h2>{item.name}</h2>
            <p>${item.price.toFixed(2)}</p>
            <button onClick={()=>addToCart(item)}>Add to Cart</button>
          </div>
        ))}
      </div>
      <div className={`cart-div ${showCart ? '' : 'hidden'}`}>
      <h2>🛒Cart</h2>
      <ul className='cart-added'>
        {cart.map((item) => (
          <li key={item.id}>
            {item.name} x {item.quantity} = ${typeof item.price === 'number' ? (item.price * item.quantity).toFixed(2) : '0.00'}
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
<h3>
  Total: $
  {cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
</h3>
<button onClick={clearCart}>Clear Cart</button>
<Link to="/CheckoutPage" className='checkout-btn' state={{ cart, currentUser}}>
  Check Out
</Link>
</div>
    </div>
  );
};

export default Shop;