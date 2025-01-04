import assets from "@/assets";
import Container from "@/components/ui/Container";
import { Leaf, Truck } from "lucide-react";
import Image from "next/image";

const AboutHero = () => {
  return (
    <Container className="relative py-12">
      <div className=" ">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          {/* Images Section */}
          <div className=" ">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <Image
                  width={295}
                  height={295} /* Equal width and height */
                  src={assets.images.about_1}
                  alt="Woman washing vegetables"
                  className="aspect-[9/13] h-auto w-full rounded-bl-[2rem] rounded-tr-[2rem] object-cover"
                />
              </div>
              <div className="mt-8">
                <Image
                  width={295}
                  height={295} /* Equal width and height */
                  src={assets.images.about_2}
                  alt="Man washing vegetables"
                  className="aspect-[9/13] h-auto w-full rounded-br-[2rem] rounded-tl-[2rem] object-cover"
                />
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="">
            <div className="space-y-6">
              <div>
                <h2 className="mb-2 text-lg font-medium text-gray-600">About Us</h2>
                <h1 className="text-4xl font-bold text-gray-900">We Make Organic Food In Market</h1>
              </div>

              <p className="leading-relaxed text-gray-600">
                Just a few seconds to measure your body temperature. Up to 5 users! The battery lasts up to 2 years.
                There are many variations of passages of Lorem Ipsum available.We started in 2019 and haven't stopped
                smashing it since. A global brand that doesn't sleep, we are 24/7 and always bringing something new with
                over 100 new products dropping on the monthly, bringing you the latest looks for less.
              </p>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Truck className="text-teal-600" size={24} />
                  <span className="text-gray-700">Free delivery for all orders</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Leaf className="text-teal-600" size={24} />
                  <span className="text-gray-700">Only fresh foods</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Truck className="text-teal-600" size={24} />
                  <span className="text-gray-700">Free delivery for all orders</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Leaf className="text-teal-600" size={24} />
                  <span className="text-gray-700">Only fresh foods</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AboutHero;
