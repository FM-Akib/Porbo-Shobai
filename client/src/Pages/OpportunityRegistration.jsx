import { RegistrationForm } from "@/components/OpportunityRegistration/RegistrationForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Toaster } from "@/components/ui/sonner";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function OpportunityRegistration() {
    const {id} = useParams();
    const [Aopportunity, setAopportunity] = useState({});
    useEffect(() =>{
        fetch(`${import.meta.env.VITE_server_url}/opportunities/${id}`)
        .then(res => res.json())
        .then(data =>{
            setAopportunity(data)
        })
    },[id])
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="max-w-3xl mx-auto py-5">
        <Card className="shadow-xl">
          <CardHeader className="space-y-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
            <CardTitle className="text-2xl font-bold text-center">Register for {Aopportunity?.title}</CardTitle>
            <p className="text-blue-100 text-center">Please fill in your details to continue</p>
          </CardHeader>
          <CardContent className="p-6">
            <RegistrationForm Aopportunity={Aopportunity} />
          </CardContent>
        </Card>
      </div>
      <Toaster />
    </div>
  );
}

export default OpportunityRegistration;