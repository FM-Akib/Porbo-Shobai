import { Clock, Trophy, User2, Users, Wallet } from 'lucide-react';
import { Card } from '../ui/card';

const Stats = ({Aopportunity}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-4 p-6">
         
        <div className={`${Aopportunity?.participationType==="team" ? "block" : "hidden"}`}>
        <Card className={`p-4`}>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Team Size</p>
              <p className="text-sm">{Aopportunity?.teamSize?.minSize} - {Aopportunity?.teamSize?.maxSize} Members</p>
            </div>
          </div>
        </Card>
        </div>
       
        <div className={`${Aopportunity?.participationType!=="team" ? "block" : "hidden"}`}>
        <Card className={`p-4`}>
          <div className="flex items-center gap-2">
            <User2 className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Team Size</p>
              <p className="text-sm">Individual</p>
            </div>
          </div>
        </Card>
        </div>


        <Card className="p-4">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Registration Ends</p>
              <p className="text-sm">{new Date(Aopportunity?.registrationEndDate).toLocaleDateString()}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2">
            <Wallet className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Registration Fee</p>
              <p className="text-sm">BDT {Aopportunity?.registrationFee}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2">
            <Trophy className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Total Prize Pool</p>
              <p className="text-sm">BDT {Aopportunity?.prizes?.reduce((sum, prize) => sum + prize.prizeAmount, 0)}</p>
            </div>
          </div>
        </Card>
      </div>
    );
};

export default Stats;