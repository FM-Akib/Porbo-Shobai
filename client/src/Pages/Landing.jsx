import HyperText from "@/components/ui/hyper-text";
import { Link } from "react-router-dom";

const Landing = () => {
    return (
        <div>
            <h1 className="mb-4">This is the Landing Page</h1>
            <Link to="/register" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded " > Register</Link>
            <HyperText
            className="text-4xl font-bold text-black dark:text-white"
            text="Porbo Shobai"
            />
           
        </div>
    );
};

export default Landing;