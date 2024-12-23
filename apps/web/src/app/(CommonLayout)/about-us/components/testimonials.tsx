import Container from "@/components/ui/Container";
import { Carousel } from "antd";
import SectionTitle from "./stats-title";
import TestimonialCard from "./testimonial-card";

export const testimonialData = [
  {
    rating: 4,
    title: "Top Quality, Beautiful Location",
    content:
      "\"Good man. Nixon's pro-war and pro-family. Hey, tell me something. You've got all this money. How come you always dress like you're doing your laundry? So, how 'bout them Knicks? What kind of a father would I be if I said no?\"",
    author: {
      name: "Eileen R. Chu",
      role: "Marketing Director",
      image: "https://themes.pixelstrap.com/fastkart/assets/images/inner-page/user/1.jpg",
    },
  },
  {
    rating: 4,
    title: "Top Quality, Beautiful Location",
    content:
      "I usually try to keep my sadness pent up inside where it can fester quietly as a mental illness. There, now he's trapped in a book I wrote: a crummy world of plot holes and spelling errors! As an interesting side note.",
    author: {
      name: "Betty J. Turner",
      role: "CTO, Company",
      image: "https://themes.pixelstrap.com/fastkart/assets/images/inner-page/user/2.jpg",
    },
  },
  {
    rating: 4,
    title: "Top Quality, Beautiful Location",
    content:
      '"My busy schedule leaves little, if any, time for blogging and social media. The Lorem Ipsum Company has been a huge part of helping me grow my business through organic search and content marketing."',
    author: {
      name: "Alfredo S. Rocha",
      role: "Project Manager",
      image: "https://themes.pixelstrap.com/fastkart/assets/images/inner-page/user/3.jpg",
    },
  },
  {
    rating: 4,
    title: "Top Quality, Beautiful Location",
    content:
      '"Professional, responsive, and able to keep up with ever-changing demand and tight deadlines: That\'s how I would describe Jeramy and his team at Lorem Ipsum Company. When it comes to content marketing."',
    author: {
      name: "Donald C. Spurr",
      role: "Sale Agent",
      image: "https://themes.pixelstrap.com/fastkart/assets/images/inner-page/user/4.jpg",
    },
  },
];
const Testimonial = () => {
  return (
    <div className="bg-gray-50 py-20">
      <Container className="">
        <SectionTitle subtitle="Latest Testimonials" title="What People Say" />
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
            {testimonialData.map((testimonial, index) => (
              <div key={index} className="px-4">
                <TestimonialCard {...testimonial} />
              </div>
            ))}
          </Carousel>
        </div>
      </Container>
    </div>
  );
};

export default Testimonial;
