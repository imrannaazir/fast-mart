import { MapPin, Phone, Truck } from "lucide-react";
import React from "react";

const OrderDetails: React.FC = () => {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold text-gray-900">Delivery Details</h2>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Delivery Address */}
        <div className="space-y-3 rounded-lg bg-gray-50 p-4">
          <div className="flex items-center gap-2 text-teal-600">
            <MapPin className="h-5 w-5" />
            <h3 className="font-medium">Delivery Address</h3>
          </div>
          <div className="text-sm text-gray-600">
            <p className="font-medium">John Doe</p>
            <p>123 Main Street</p>
            <p>Apt 4B</p>
            <p>New York, NY 10001</p>
          </div>
        </div>

        {/* Courier Details */}
        <div className="space-y-3 rounded-lg bg-gray-50 p-4">
          <div className="flex items-center gap-2 text-teal-600">
            <Truck className="h-5 w-5" />
            <h3 className="font-medium">Courier Details</h3>
          </div>
          <div className="text-sm text-gray-600">
            <p className="font-medium">FastExpress Delivery</p>
            <p>Tracking ID: FE789562341</p>
            <div className="mt-2 flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <a href="tel:+1234567890" className="text-teal-600 hover:underline">
                +1 (234) 567-890
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
