import { Award,  Trophy } from "lucide-react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";

const PrizeSection = ({Aopportunity}) => {
    return (
        <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Trophy className="h-5 w-5" />
          Prizes and Rewards
        </h2>
        <div className="grid gap-4">
          {Aopportunity?.prizes?.map((prize, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="font-medium flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  {/* {index === 0 ? 'Winner' : `${index + 1}nd Runner Up`} */}
                  {prize.prizeName}
                </h3>
                <Badge variant="secondary" className="text-lg">BDT {prize.prizeAmount}</Badge>
              </div>
            </div>
          ))}
          {Aopportunity?.certificate === "true" && (
            <Badge variant="outline" className="w-fit">Certificate of Participation</Badge>
          )}
        </div>
      </Card>
    );
};

export default PrizeSection;