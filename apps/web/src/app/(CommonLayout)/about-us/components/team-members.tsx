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
    <div className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle subtitle="Our Creative Team" title="Fastkart Team Member" />
        <div className="mt-12">
          <Carousel
            autoplay
            autoplaySpeed={2000}
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
      </div>
    </div>
  );
};

export default TeamSlider;
