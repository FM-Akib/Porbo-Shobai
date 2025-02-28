
import { FlipText } from "@/components/magicui/flip-text";
const MentorDashboardTitle = ({title}) => {
  return (
    <div className="inline-block">
      <FlipText
        className="text-4xl font-bold -tracking-widest text-black dark:text-white md:text-7xl md:leading-[5rem]"
        word={title}
      />
    </div>
  );
};

export default MentorDashboardTitle;
