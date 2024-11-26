import host1 from '../../assets/host1.png';
import host2 from '../../assets/host2.png';
import BoxReveal from '../ui/box-reveal';

const HostHeader = () => {
    return (
        <header className="bg-[#fefce8] dark:bg-[#0b152c]  ">
        <div className="max-w-7xl mx-auto h-72 flex items-center justify-between px-3 md:px-0">
        <img src={host1} alt="" className='h-full hidden md:block' />
   
         <div className="size-full max-w-lg items-center justify-center  overflow-hidden pt-5 md:pt-14 mx-auto ">
            <BoxReveal boxColor={"#5046e6"} duration={0.5}>
                <p className="text-[2.7rem] font-bold text-center  md:px-10">
                Host Competitions<span className="text-[#5046e6]">.</span>
                </p>
            </BoxReveal>

    
        <BoxReveal boxColor={"#5046e6"} duration={0.5}>
            <div className="mt-6">
            <p className='text-body text-center text-lg'>
                 Host an oppertunity and be a part of the community and  
                <span className="font-semibold text-[#5046e6]"> enhance</span>
                <span className="font-semibold text-[#5046e6]"> student&apos;s</span>
                <span className="font-semibold text-[#5046e6]"> careers</span>.
                
            </p>
            </div>
        </BoxReveal>
    </div>
        <img src={host2} alt="" className='h-full hidden md:block' />
        </div>
     </header>
    );
};

export default HostHeader;