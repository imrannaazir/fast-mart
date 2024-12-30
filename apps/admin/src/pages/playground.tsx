/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import * as LucideIcons from "lucide-react";

export default function Playground() {
  const categories = [
    {
      _id: "1",
      name: "Electronics",
      icon: "Volume2",
      createdAt: new Date("2023-01-01"),
      updatedAt: new Date("2023-01-01"),
    },
    { _id: "2", name: "Clothing", icon: "Shirt", createdAt: new Date("2023-01-02"), updatedAt: new Date("2023-01-02") },
    { _id: "3", name: "Books", icon: "BookOpen", createdAt: new Date("2023-01-03"), updatedAt: new Date("2023-01-03") },
    {
      _id: "4",
      name: "Sports",
      icon: "Dumbbell",
      createdAt: new Date("2023-01-04"),
      updatedAt: new Date("2023-01-04"),
    },
    {
      _id: "5",
      name: "Home & Garden",
      icon: "Home",
      createdAt: new Date("2023-01-05"),
      updatedAt: new Date("2023-01-05"),
    },
    {
      _id: "6",
      name: "Beauty",
      icon: "Sparkles",
      createdAt: new Date("2023-01-06"),
      updatedAt: new Date("2023-01-06"),
    },
    { _id: "7", name: "Toys", icon: "Gamepad2", createdAt: new Date("2023-01-07"), updatedAt: new Date("2023-01-07") },
    {
      _id: "8",
      name: "Food & Beverages",
      icon: "UtensilsCrossed",
      createdAt: new Date("2023-01-08"),
      updatedAt: new Date("2023-01-08"),
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {categories.map((category) => {
        const IconComponent = LucideIcons[category.icon as keyof typeof LucideIcons] as any;
        return (
          <Card key={category._id}>
            <CardHeader className="flex flex-row items-center space-x-4 pb-2">
              {IconComponent && <IconComponent className="h-6 w-6" />}
              <CardTitle>{category.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">Created: {new Date(category.createdAt).toLocaleDateString()}</p>
              <p className="text-sm text-gray-500">Updated: {new Date(category.updatedAt).toLocaleDateString()}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
