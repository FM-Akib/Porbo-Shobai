import { NumberTicker } from "../magicui/number-ticker";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const BookingCard = ({ number, title, textColor }) => {
  return (
    <div>
      <Card className="w-80 shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">
            <NumberTicker
              value={number}
              decimalPlaces={title === "Average Rating" ? 1 : 0}
              className={`whitespace-pre-wrap text-3xl font-medium tracking-tighter dark:text-white text-${textColor}-500`}
            />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">{title}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingCard;
