import SparklesText from "../ui/sparkles-text";

const TitleDashboard = ({title}) => {
    return (
        <div className="my-5 md:my-10 flex items-center justify-center">
        <SparklesText text={title} 
        className={`text-3xl font-semibold text-gray-700 dark:text-white`}
        />
        </div>
    );
};

export default TitleDashboard;