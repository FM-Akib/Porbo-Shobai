import { CircleArrowLeft } from 'lucide-react';
import notFound from '../../assets/notFound.png'

const NotFoundCompetition = ({clearFilters}) => {
    return (
        <div className='flex flex-col justify-center items-center mt-10 '>
           <div className="flex flex-col justify-center max-w-sm">
            <p className='text-2xl flex justify-evenly text-center items-center font-semibold
             mb-5 bg-yellow-100 dark:bg-gray-800 px-1 py-1 rounded'>
             <button onClick={clearFilters}><CircleArrowLeft /></button> 
                No Opportunities Found</p>
            <img src={notFound} alt="notFound" className='w-96 h-96' />
            </div>
        </div>
    );
};

export default NotFoundCompetition;