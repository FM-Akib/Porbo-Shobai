import ContactSection from "@/components/Aopportunity/ContactSection";
import OpportunityHeader from "@/components/Aopportunity/OppertunityHeader";
import PrizeSection from "@/components/Aopportunity/PrizeSection";
import Stats from "@/components/Aopportunity/Stats";
import Timeline from "@/components/Aopportunity/Timeline";
import QuizBrowser from "@/components/Quiz/QuizBrowser";
import { Button } from "@/components/ui/button";
import useUserInfo from "@/Hooks/useUserInfo";
import { Bookmark } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Aopportunity = () => {
    const {id} = useParams();
    const [Aopportunity, setAopportunity] = useState({});
    const [isRegistered, setIsRegistered] = useState(false);
    const {userInfo} = useUserInfo();
    useEffect(() =>{
        fetch(`${import.meta.env.VITE_server_url}/opportunities/${id}`)
        .then(res => res.json())
        .then(data =>{
            setAopportunity(data)
        })
    },[id])
    console.log(Aopportunity);

    useEffect(() => {
        if (userInfo && Aopportunity) {
          setIsRegistered(userInfo?.participations?.includes(Aopportunity._id));
        }
      }, [userInfo, Aopportunity]);
    return (
        <div className="min-h-screen ">
        <div className="max-w-4xl mx-auto py-8 px-4">
          <div className=" rounded-xl shadow-sm overflow-hidden">
            <OpportunityHeader Aopportunity={Aopportunity} />
            <div className="flex justify-between items-center px-6 py-4 border-y">
              <div className="flex items-center gap-4">
                <span className=" text-xl md:text-2xl font-bold">BDT {Aopportunity.registrationFee}</span>
                <Button variant="outline" size="icon">
                <Bookmark />
                </Button>
              </div>
              {
                isRegistered ?(
                  <Button size="lg" className="bg-green-600 dark:text-white">Already Registered</Button>
                ):(<Link to={`/opportunity-registration/${Aopportunity._id}`}>
                  <Button size="lg">Register Now</Button>
                  </Link>)
              }
            </div>

              {
                isRegistered && (
                  <QuizBrowser quiz={Aopportunity.task} />
                )
              }

            <Stats Aopportunity={Aopportunity} />
            <div className="grid gap-6 p-6">
              <div className="prose max-w-none text-justify" dangerouslySetInnerHTML={{ __html: Aopportunity.description }} />
              <Timeline Aopportunity={Aopportunity} />
              <PrizeSection Aopportunity={Aopportunity} />
              <ContactSection Aopportunity={Aopportunity} />
            </div>
          </div>
        </div>
      </div>
    );
};

export default Aopportunity;