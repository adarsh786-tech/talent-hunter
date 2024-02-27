const Hero = () => {
  return (
    <>
      <div className="bg-purple-800 flex justify-center items-start ">
        <div className="xl:max-w-[1280px] w-full">
          <section id="1" className="flex md:flex-row flex-col sm:py-16 py-6">
            <div className="flex flex-1 justify-center items-start xl:px-0 sm:px-16 px-6">
              <div className="flex flex-row items-center py-[6px] px-4  rounded-[10px] mb-2">
                <span className="text-white">Hello Hunter</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Hero;
