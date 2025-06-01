import React from 'react';
import { ShoppingCartIcon, CreditCardIcon, TruckIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

const Cart = () => {
  // Placeholder for cart items - replace with actual state/data later
  const cartItems = []; 

  // Placeholder for order summary - replace with actual calculations later
  const subtotal = 0.00;
  const shipping = 0.00; // Example fixed shipping
  const tax = 0.00; // Example fixed tax
  const total = subtotal + shipping + tax;

  return (
    <div className="container mx-auto mt-10">
      <div className="flex shadow-md my-10">
        <div className="w-3/4 bg-white px-10 py-10">
          <div className="flex justify-between border-b pb-8">
            <h1 className="font-semibold text-2xl text-dark flex items-center">
              <ShoppingCartIcon className="h-7 w-7 mr-2" />
              Shopping Cart
            </h1>
            <h2 className="font-semibold text-2xl text-dark">{cartItems.length} Items</h2>
          </div>
          <div className="flex mt-10 mb-5">
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Quantity</h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Price</h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Total</h3>
          </div>

          {cartItems.length === 0 ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center text-gray-500">
                 <ShoppingCartIcon className="h-16 w-16 mx-auto mb-4" />
                Your cart is empty.
              </div>
            </div>
          ) : (
            {/* Cart items go here */}
            // Example Cart Item Structure:
            // <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
            //   <div className="flex w-2/5">
            //     {/* Product Image */}
            //     <div className="w-20">
            //       <img className="h-24" src="product-image-url.jpg" alt="Product" />
            //     </div>
            //     {/* Product Details */}
            //     <div className="flex flex-col justify-between ml-4 flex-grow">
            //       <span className="font-bold text-sm">Product Name</span>
            //       <span className="text-red-500 text-xs">Category</span>
            //       <button className="font-semibold hover:text-red-500 text-gray-500 text-xs text-left flex items-center">
            //         <TrashIcon className="h-4 w-4 mr-1" />Remove
            //       </button>
            //     </div>
            //   </div>
            //   {/* Quantity Input */}
            //   <div className="flex justify-center w-1/5">
            //     <input className="mx-2 border text-center w-8" type="text" value="1" />
            //   </div>
            //   {/* Price */}
            //   <span className="text-center w-1/5 font-semibold text-sm">$XX.XX</span>
            //   {/* Total */} 
            //   <span className="text-center w-1/5 font-semibold text-sm">$XX.XX</span>
            // </div>
          )}

          <a href="#" className="flex font-semibold text-primary text-sm mt-10">
            <svg className="fill-current mr-2 text-primary w-4" viewBox="0 0 448 512">
              <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941L93.088 331.03c15.12 15.12 40.971 4.411 40.971-16.971V296z"/>
            </svg>
            Continue Shopping
          </a>
        </div>

        <div id="summary" className="w-1/4 px-8 py-10 bg-gray-100">
          <h1 className="font-semibold text-2xl border-b pb-8 text-dark flex items-center">
             <CreditCardIcon className="h-7 w-7 mr-2" />Order Summary
          </h1>
          <div className="flex justify-between mt-10 mb-5">
            <span className="font-semibold text-sm uppercase">Items {cartItems.length}</span>
            <span className="font-semibold text-sm">${subtotal.toFixed(2)}</span>
          </div>
          <div>
            <label className="font-medium inline-block mb-3 text-sm uppercase flex items-center">
               <TruckIcon className="h-5 w-5 mr-2" />Shipping
            </label>
            {/* Shipping options would go here */}
            <select className="block p-2 text-gray-600 w-full text-sm">
              <option>Standard shipping - $0.00</option>
            </select>
          </div>
          <div className="py-10">
            <label htmlFor="promo" className="font-semibold inline-block mb-3 text-sm uppercase">Promo Code</label>
            <input type="text" id="promo" placeholder="Enter your code" className="p-2 text-sm w-full" />
          </div>
          <button className="bg-primary hover:bg-secondary px-5 py-2 text-sm text-white uppercase">Apply</button>
          <div className="border-t mt-8">
            <div className="flex font-semibold justify-between py-6 text-sm uppercase">
              <span>Total cost</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button className="bg-primary font-semibold hover:bg-secondary py-3 text-sm text-white uppercase w-full flex items-center justify-center">
              <CreditCardIcon className="h-5 w-5 mr-2" />
              Proceed to Checkout
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Cart; 