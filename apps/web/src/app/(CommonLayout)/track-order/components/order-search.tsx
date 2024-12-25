"use client";
import { Package, Search } from "lucide-react";
import React, { useState } from "react";

interface OrderSearchProps {
  onSearch: (orderId: string) => void;
}

const OrderSearch: React.FC<OrderSearchProps> = ({ onSearch }) => {
  const [orderId, setOrderId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderId.trim()) {
      onSearch(orderId);
    }
  };

  return (
    <div className="mb-12 text-center">
      <div className="mb-4 flex justify-center">
        <Package className="h-12 w-12 text-teal-600" />
      </div>
      <h1 className="mb-6 text-3xl font-bold text-gray-900">Track Your Order</h1>

      <form onSubmit={handleSubmit} className="mx-auto max-w-md">
        <div className="relative">
          <input
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="Enter your order ID (e.g., FKT89562)"
            className="w-full rounded-lg border-2 border-gray-200 px-4 py-3 pl-4 pr-12 text-gray-800 placeholder-gray-400 transition-colors focus:border-teal-500 focus:outline-none"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md bg-teal-500 p-2 text-white transition-colors hover:bg-teal-600"
          >
            <Search className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrderSearch;
