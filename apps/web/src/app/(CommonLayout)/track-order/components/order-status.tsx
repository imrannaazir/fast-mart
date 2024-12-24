import { Check, Home, Package, Truck } from "lucide-react";
import React from "react";

const steps = [
  {
    icon: Package,
    title: "Order Confirmed",
    date: "March 14, 2024 - 10:30 AM",
    description: "Your order has been confirmed",
    completed: true,
  },
  {
    icon: Check,
    title: "Processing",
    date: "March 14, 2024 - 2:45 PM",
    description: "Your order is being processed",
    completed: true,
  },
  {
    icon: Truck,
    title: "In Transit",
    date: "March 15, 2024 - Expected",
    description: "Your order is on the way",
    completed: false,
    active: true,
  },
  {
    icon: Home,
    title: "Delivered",
    date: "March 16, 2024 - Expected",
    description: "Package will be delivered",
    completed: false,
  },
];

const OrderStatus: React.FC = () => {
  return (
    <div className="mb-8 rounded-xl bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold text-gray-900">Shipping Status</h2>
      <div className="relative">
        {steps.map((step, index) => (
          <div key={index} className="relative pb-8">
            {index !== steps.length - 1 && (
              <div className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
            )}
            <div className="relative flex items-start space-x-4">
              <div>
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full ring-8 ring-white ${step.completed ? "bg-teal-500" : step.active ? "bg-teal-200" : "bg-gray-200"} `}
                >
                  <step.icon className={`h-5 w-5 ${step.completed || step.active ? "text-white" : "text-gray-500"}`} />
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className={`text-lg font-medium ${step.active ? "text-teal-600" : "text-gray-900"}`}>
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-500">{step.date}</p>
                </div>
                <p className="mt-1 text-sm text-gray-500">{step.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderStatus;
