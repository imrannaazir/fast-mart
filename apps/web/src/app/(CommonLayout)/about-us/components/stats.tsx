import Container from "@/components/ui/Container";
import { Briefcase, ShoppingCart, Users } from "lucide-react";
import StatsCard from "./stats-card";
import SectionTitle from "./stats-title";

const Stats = () => {
  const stats = [
    {
      icon: Briefcase,
      number: "10",
      title: "Business Years",
      description:
        "A coffee shop is a small business that sells coffee, pastries, and other morning goods. There are many different types of coffee shops around the world.",
    },
    {
      icon: ShoppingCart,
      number: "80K+",
      title: "Products Sales",
      description:
        "Some coffee shops have a seating area, while some just have a spot to order and then go somewhere else to sit down. The coffee shop that I am going to.",
    },
    {
      icon: Users,
      number: "60+",
      title: "Happy Customers",
      description:
        "My goal for this coffee shop is to be able to get a coffee and get on with my day. It's a Thursday morning and I am rushing between meetings.",
    },
  ];

  return (
    <div className="bg-gray-100 py-20">
      <Container className="mx-auto">
        <SectionTitle subtitle="What We Do" title="We Are Trusted By Clients" />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {stats.map((stat, index) => (
            <StatsCard
              key={index}
              icon={stat.icon}
              title={stat.title}
              description={stat.description}
              number={stat.number}
            />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Stats;
