import Container from "@/components/ui/Container";
import { Carousel } from "antd";
import SectionTitle from "./stats-title";
import TeamMemberCard from "./team-member-card";
const teamMembers = [
  {
    image: "https://themes.pixelstrap.com/fastkart/assets/images/inner-page/user/1.jpg",
    name: "Anna Baranov",
    role: "Marketing",
    description: "Fondue stinking bishop goat. Macaroni cheese croque monsieur cottage cheese.",
  },
  {
    image: "https://themes.pixelstrap.com/fastkart/assets/images/inner-page/user/2.jpg",
    name: "Anna Baranov",
    role: "Marketing",
    description: "squirty cheese cheddar macaroni cheese airedale cheese triangles.",
  },
  {
    image: "https://themes.pixelstrap.com/fastkart/assets/images/inner-page/user/3.jpg",
    name: "Anna Baranov",
    role: "Marketing",
    description: "cheeseburger airedale mozzarella the big cheese fondue.",
  },
  {
    image: "https://themes.pixelstrap.com/fastkart/assets/images/inner-page/user/4.jpg",
    name: "Anna Baranov",
    role: "Marketing",
    description: "Fondue stinking bishop goat. Macaroni cheese croque monsieur cottage cheese.",
  },
];

const TeamSlider = () => {
  return (
    <Container className="py-20">
      <SectionTitle subtitle="Our Creative Team" title="Fastmart Team Member" />
      <div className="mt-12">
        <Carousel
          autoplay
          dots={{ className: "custom-dots" }}
          slidesToShow={3}
          responsive={[
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 2,
              },
            },
            {
              breakpoint: 640,
              settings: {
                slidesToShow: 1,
              },
            },
          ]}
        >
          {teamMembers.map((member, index) => (
            <div key={index}>
              <TeamMemberCard {...member} />
            </div>
          ))}
        </Carousel>
      </div>
    </Container>
  );
};

export default TeamSlider;
