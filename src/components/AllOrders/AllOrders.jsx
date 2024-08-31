import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { CartContext } from '../../Context/CartContext';
import style from './AllOrders.module.css';

export default function AllOrders() {
  const { cartId } = useContext(CartContext); 
  const [orders, setOrders] = useState([]);

  async function getOrder(id) {
    try {
      const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/${id}`);
      console.log(response.data); 

      setOrders(response.data.orders || []); 
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  }

  useEffect(() => {
    if (cartId) {
      getOrder(cartId);
    }
  }, [cartId]); 

  return (
    <>
      <h2 className={style.title}>All Orders</h2>
      <div className={style.ordersList}>
        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order.id} className={style.orderItem}>
              <p>Order ID: {order.id}</p>
              <h2>{order.products.map(product => product.title).join(', ')}</h2> 
            </div>
          ))
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </>
  );
}
