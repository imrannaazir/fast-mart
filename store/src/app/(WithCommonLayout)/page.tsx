import { AppButton } from "@/components/ui/AppButton";

const HomePage = () => {
  return (
    <div>
      <AppButton>Hello world</AppButton>
      <section>
        <div className="flex flex-wrap justify-center py-20 text-gray-300 my-5">
          <a
            href="!"
            className="button button--aylen px-5 py-3 bg-gray-800 hover:bg-gray-700 hover:text-white relative block focus:outline-none border-2 border-solid rounded-lg text-sm text-center font-semibold uppercase tracking-widest overflow-hidden"
          >
            Read More
          </a>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
