import host1 from '../../assets/host1.png';
import host2 from '../../assets/host2.png';
import BoxReveal from '../ui/box-reveal';

const HostHeader = () => {
  return (
    <header className="bg-[#fefce8] dark:bg-[#0b152c]">
      <div className="max-w-7xl mx-auto h-52 md:h-72 flex items-center justify-between px-3 md:px-0 relative">
        {/* Left Image */}
        <img src={host1} alt="" className="h-full hidden md:block" />
        
        {/* Centered Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-5">
          <BoxReveal boxColor={"#5046e6"} duration={0.5}>
            <p className="text-[1.7rem] md:text-[2.7rem] font-bold">
              Host Competitions<span className="text-[#5046e6]">.</span>
            </p>
          </BoxReveal>
          <BoxReveal boxColor={"#5046e6"} duration={0.5}>
            <div className="mt-3 md:mt-4">
              <p className="text-body text-lg ">
                Host an opportunity and be a part of the community and <br /> 
                <span className="font-semibold text-[#5046e6]"> enhance</span>
                <span className="font-semibold text-[#5046e6]"> student&apos;s</span>
                <span className="font-semibold text-[#5046e6]"> careers</span>.
              </p>
            </div>
          </BoxReveal>
        </div>

        {/* Right Image */}
        <img src={host2} alt="" className="h-full hidden md:block" />
      </div>
    </header>
  );
};

export default HostHeader;
