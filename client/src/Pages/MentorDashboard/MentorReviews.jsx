import BookingCard from "@/components/DashboardMentor/BookingCard";
import MentorDashboardTitle from "@/components/DashboardMentor/MentorDashboardTitle";

const MentorReviews = () => {
    return (
        <div className="p-4">
            
            <MentorDashboardTitle title="Reviews" />

            <hr className="my-8"/>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <BookingCard number="100" title="Total Reviews" textColor="green" />
                <BookingCard number="4.5" title="Average Rating" textColor="yellow" />
            </div>

            <hr className="my-8"/>


        </div>
    );
};

export default MentorReviews;