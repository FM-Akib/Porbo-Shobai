import { Contact, Mail, Phone, User } from "lucide-react";
import { Card } from "../ui/card";

const ContactSection = ({Aopportunity}) => {
    return (
        <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><Contact className="h-5 w-5" />Contact Information</h2>
        <div className="space-y-4">
          {Aopportunity?.contacts?.map((contact, index) => (
            <div key={index} className="space-y-2 flex flex-col md:flex-row md:items-center justify-around">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span>{contact?.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <a href={`mailto:${contact?.email}`} className="text-primary hover:underline">
                  {contact?.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{contact?.mobile ? contact?.mobile : contact?.phone}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
};

export default ContactSection;