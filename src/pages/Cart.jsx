import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Cart = ({ user}) => {
  const [loading, setLoading] = useState(false);
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch cart data from the backend when the component mounts
    const fetchCartData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          return;
        }
  
        const response = await axios.get('http://localhost:5000/cart/get', {
          headers: {
            Authorization: `Bearer ${token}`, // Send token with request
          },
        });
        console.log("Cart Response:", response.data);
  
    
        setCartData(response.data.productIds); // Assuming the cart structure is correct
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    };
  
    if (user) {
      fetchCartData(); // Fetch the cart when the user is authenticated
    }
  }, [user]); // Fetch the cart whenever the `user` state changes
  

  // Function to remove an item from the cart
  const removeFromCart = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      // Make the API request to remove the product
      await axios.delete(`http://localhost:5000/cart/remove`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { productId }
      });

      window.location.reload()
    
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  // // Function to update the quantity of an item in the cart
  // const updateQuantity = async (productId, quantity) => {
  //   if (isNaN(quantity) || quantity <= 0) return; // Prevent invalid values

  //   try {
  //     const token = localStorage.getItem('token');
  //     if (!token) return;

  //     // Make the API request to update the quantity
  //     await axios.put(
  //       `http://localhost:5000/cart/update/${productId}`,
  //       { quantity },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     // Update the cart state with the new quantity
  //     setCartData((prevCart) =>
  //       prevCart.map((item) =>
  //         item.productId === productId ? { ...item, quantity: Math.max(1, parseInt(quantity, 10)) } : item
  //       )
  //     );
  //   } catch (error) {
  //     console.error('Error updating quantity:', error);
  //   }
  // };

  // // Calculate total price of all items in the cart
  // const calculateTotal = () => {
  //   return cartData.reduce((total, item) => total + item.product.price * item.quantity, 0);
  // };

  // // Handle checkout
  // const handleCheckout = async () => {
  //   setLoading(true); // Start loading state
  //   const newOrder = {
  //     id: Date.now(), // Generate a unique order ID
  //     date: new Date(),
  //     items: cartData,
  //     total: calculateTotal(),
  //   };

  //   try {
  //     const token = localStorage.getItem('token');
  //     if (!token) return;

  //     // Send the order to the backend
  //     await axios.post('http://localhost:5000/orders', newOrder, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     // Add the new order to the orders state
  //     setOrders((prevOrders) => [...prevOrders, newOrder]);

  //     // Clear the cart
  //     setCartData([]);
  //   } catch (error) {
  //     console.error('Error during checkout:', error);
  //   } finally {
  //     setLoading(false); // End loading state
  //     navigate('/orders'); // Navigate to the Orders page
  //   }
  // };
  return user ? (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartData.length > 0 ? (
        <div className="cart-items">
          {cartData.map((item) => (
            <div key={item.productId._id} className="cart-item">
              {/* Product Image */}
              <img
                src={item.productId.image} // Assuming the product object has an 'image' field
                alt={item.productId.name}
                className="cart-item-image"
              />
              <div className="cart-item-info">
                <h3>{item.productId.name}</h3>
                <p>Product ID: {item.productId._id}</p>
                <p>Price: ${item.productId.price}</p>
                <p>Quantity: {item.quantity}</p>
                <div className="quantity-controls">
                  {/* Decrease Quantity */}
                  <button
                    onClick={() => handleQuantityChange(item.productId._id, 'decrement')}
                    className="quantity-button"
                  >
                    -
                  </button>
                  {/* Increase Quantity */}
                  <button
                    onClick={() => handleQuantityChange(item.productId._id, 'increment')}
                    className="quantity-button"
                  >
                    +
                  </button>
                </div>
                {/* Remove Item Button */}
                <button
                  onClick={() => removeFromCart(item.productId._id)}
                  className="remove-button"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="cart-total">
            <p>Total: ${cartData.reduce((total, item) => total + item.productId.price * item.quantity, 0).toFixed(2)}</p>
          </div>
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  ) : (
    <div className="protected">
      <h3>Oops! You must be signed in to view your cart!</h3>
    </div>
  );
};



export default Cart;
