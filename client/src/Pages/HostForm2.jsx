import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/Hooks/use-toast";
// import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { usePostOpportunityMutation } from "@/redux/api/api";
import { formSchema2 } from "@/utils/FormError";
import { zodResolver } from "@hookform/resolvers/zod";
import confetti from "canvas-confetti";
import { ArrowLeft, Calendar, Clock, Eraser, LoaderPinwheel, PlusCircle, SendHorizontal, User, Users, X } from 'lucide-react';
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Link, useLocation } from "react-router-dom";



const HostForm2 = () => {
  const [newCategory, setNewCategory] = useState("");
  const location = useLocation();
  const [participationType, setParticipationType] = useState('individual');
  const { formData } = location.state || {};
  // const axioSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const [postOpportunity, { isLoading }] = usePostOpportunityMutation();


  const form = useForm({
    resolver: zodResolver(formSchema2),
    defaultValues: {
      registrationFee: "0",
      competitionStartDate: null,
      competitionStartTime: null,
      registrationStartDate: null,
      registrationStartTime: null,
      registrationEndDate: null,
      registrationEndTime: null,
      eligibility: "",
      categories: [],
      festival: "",
      participationType: "individual",
      teamSize: { minSize: 1, maxSize: 1 },
      hideHost: false,
      contacts: [{ name: "", email: "", mobile: "" }],
      certificate: false,
      numOfParticipantsAllowed: 1,
      prizes: [{ prizeName: "", prizeAmount: 0 }],
      ...formData,
    },
  });

  const { fields: categoryFields, append: appendCategory, remove: removeCategory } = useFieldArray({
    control: form.control,
    name: "categories",
  });
  const { fields: contactFields, append: appendContact, remove: removeContact } = useFieldArray({
    control: form.control,
    name: "contacts",
  });
  const { fields: prizeFields, append: appendPrize, remove: removePrize } = useFieldArray({
    control: form.control,
    name: "prizes",
  });

  const onSubmit = async (data) => {
    try {
      // console.log("Form data:", { ...formData, ...data });
      setLoading(true);
      const file = formData.banner;
      if(!file) return alert("Please upload a banner image");
      const formDataToSend = new FormData();
      formDataToSend.append("file", file);
      formDataToSend.append("upload_preset", "porboshobai");
      formDataToSend.append("cloud_name", "ds0io6msx");
      const response = await fetch("https://api.cloudinary.com/v1_1/ds0io6msx/image/upload", {
        method: "POST",
        body: formDataToSend,
      });
      const imageData = await response.json();
      if(!imageData) return alert("Image upload failed");

      const opportunityData = {
        banner: imageData.url,
        title: formData.title,
        status: "Live",
        visibility: formData.visibility,
        mode: formData.mode,
        opportunityType: formData.opportunityType,
        organization: formData.organization,
        websiteUrl: formData.websiteUrl,
        city: formData.city,
        location: formData.location,
        subtitle: formData.subtitle,
        description: formData.content,
        ...data,
        participants: [],
      }
      // console.log("Opportunity data:", opportunityData);
      // const response2 = await axioSecure.post("/opportunities", opportunityData);
      // console.log("Response:", response2.data);
      const response2 = await postOpportunity(opportunityData).unwrap();
      // console.log("Response:", response2);
      if(response2.acknowledged){
      setLoading(false);
      toast({
        variant: "default",
        title: "Congratulations! 🎉",
        description: "Form submitted successfully!",
        action: <ToastAction altText="Try again">OK!</ToastAction>,
        className: "bg-green-500 text-white",
      })
      const defaults = {
        spread: 360,
        ticks: 50,
        gravity: 0,
        decay: 0.94,
        startVelocity: 30,
        colors: ["#FFE400", "#FFBD00", "#E89400", "#FFCA6C", "#FDFFB8"],
      };
   
      const shoot = () => {
        confetti({
          ...defaults,
          particleCount: 40,
          scalar: 1.2,
          shapes: ["star"],
        });
   
        confetti({
          ...defaults,
          particleCount: 10,
          scalar: 0.75,
          shapes: ["circle"],
        });
      };
   
      setTimeout(shoot, 0);
      setTimeout(shoot, 100);
      setTimeout(shoot, 200);
    }
    } catch (error) {
      console.error("Submission error:", error);
      alert("An error occurred while submitting the form. Please try again.");
    }
  };

  if ( isLoading) {
    setLoading(true);
  }

  return (
    <div className="min-h-screen md:p-8 mb-10 md:mb-20">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center gap-4">
          <Link to="/create-competition">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div className="flex flex-col md:flex-row items-center gap-2">
            <div className="flex h-8 items-center gap-2 rounded-full bg-secondary px-4 text-sm text-secondary-foreground">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white dark:bg-gray-300 text-xs text-gray-800">1</span>
              Basic Details
            </div>
            <div className="flex h-8 items-center gap-2 rounded-full bg-primary px-4 text-sm text-white dark:text-gray-800">
              <span className="flex h-5 w-5 items-center justify-center dark:text-white rounded-full bg-white text-gray-800 dark:bg-slate-700 text-xs">2</span>
              Registration Details
            </div>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Registration Details</CardTitle>
            <CardDescription className="bg-gradient-to-r from-[rgb(131,58,180)] via-[rgb(253,29,29)] to-[rgb(252,176,69)] dark:bg-transparent rounded">
              <div className="bg-[url('https://res.cloudinary.com/ds0io6msx/image/upload/v1732976554/PorboShobai/bivqyz9exxhzyytqq6ze.png')] 
              bg-contain md:bg-cover h-[200px] flex items-center justify-center bg-center">
                <h1 className="text-4xl font-bold text-white">Host <br className="block md:hidden"/> An Opportunity</h1>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="registrationFee"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Registration Fee</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter registration fee" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="competitionStartDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Competition Start Date</FormLabel>
                        <FormControl>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="outline" className="w-full justify-start text-left font-normal">
                                <Calendar className="mr-2 h-4 w-4" />
                                {field.value ? field.value.toDateString() : <span>Pick a date</span>}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Controller
                                control={form.control}
                                name="competitionStartDate"
                                render={({ field }) => (
                                  <DatePicker
                                    selected={field.value}
                                    onChange={(date) => field.onChange(date)}
                                    dateFormat="MMMM d, yyyy"
                                    inline
                                  />
                                )}
                              />
                            </PopoverContent>
                          </Popover>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="competitionStartTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Competition Start Time</FormLabel>
                        <FormControl>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="outline" className="w-full justify-start text-left font-normal">
                                <Clock className="mr-2 h-4 w-4" />
                                {field.value ? field.value.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : <span>Pick a time</span>}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Controller
                                control={form.control}
                                name="competitionStartTime"
                                render={({ field }) => (
                                  <DatePicker
                                    selected={field.value}
                                    onChange={(date) => field.onChange(date)}
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={15}
                                    timeCaption="Time"
                                    dateFormat="h:mm aa"
                                    inline
                                  />
                                )}
                              />
                            </PopoverContent>
                          </Popover>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="registrationStartDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Registration Start Date</FormLabel>
                        <FormControl>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="outline" className="w-full justify-start text-left font-normal">
                                <Calendar className="mr-2 h-4 w-4" />
                                {field.value ? field.value.toDateString() : <span>Pick a date</span>}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Controller
                                control={form.control}
                                name="registrationStartDate"
                                render={({ field }) => (
                                  <DatePicker
                                    selected={field.value}
                                    onChange={(date) => field.onChange(date)}
                                    dateFormat="MMMM d, yyyy"
                                    inline
                                  />
                                )}
                              />
                            </PopoverContent>
                          </Popover>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="registrationStartTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Registration Start Time</FormLabel>
                        <FormControl>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="outline" className="w-full justify-start text-left font-normal">
                                <Clock className="mr-2 h-4 w-4" />
                                {field.value ? field.value.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : <span>Pick a time</span>}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Controller
                                control={form.control}
                                name="registrationStartTime"
                                render={({ field }) => (
                                  <DatePicker
                                    selected={field.value}
                                    onChange={(date) => field.onChange(date)}
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={15}
                                    timeCaption="Time"
                                    dateFormat="h:mm aa"
                                    inline
                                  />
                                )}
                              />
                            </PopoverContent>
                          </Popover>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="registrationEndDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Registration End Date</FormLabel>
                        <FormControl>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="outline" className="w-full justify-start text-left font-normal">
                                <Calendar className="mr-2 h-4 w-4" />
                                {field.value ? field.value.toDateString() : <span>Pick a date</span>}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Controller
                                control={form.control}
                                name="registrationEndDate"
                                render={({ field }) => (
                                  <DatePicker
                                    selected={field.value}
                                    onChange={(date) => field.onChange(date)}
                                    dateFormat="MMMM d, yyyy"
                                    inline
                                  />
                                )}
                              />
                            </PopoverContent>
                          </Popover>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="registrationEndTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Registration End Time</FormLabel>
                        <FormControl>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="outline" className="w-full justify-start text-left font-normal">
                                <Clock className="mr-2 h-4 w-4" />
                                {field.value ? field.value.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : <span>Pick a time</span>}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Controller
                                control={form.control}
                                name="registrationEndTime"
                                render={({ field }) => (
                                  <DatePicker
                                    selected={field.value}
                                    onChange={(date) => field.onChange(date)}
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={15}
                                    timeCaption="Time"
                                    dateFormat="h:mm aa"
                                    inline
                                  />
                                )}
                              />
                            </PopoverContent>
                          </Popover>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="eligibility"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Eligibility</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter eligibility criteria" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="categories"
                  render={() => (
                    <FormItem>
                      <FormLabel>Categories</FormLabel>
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-5">
                          {categoryFields.map((field, index) => (
                            <div key={field.id} className="flex items-center space-x-1">
                              <Input
                                {...form.register(`categories.${index}`)}
                                placeholder="Category name"
                                className="w-fit"
                              />
                              <Button type="button" variant="destructive" onClick={() => removeCategory(index)}>
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center space-x-2">
                          <Input
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                            placeholder="New category name"
                          />
                          <Button type="button" onClick={() => {
                            if (newCategory) {
                              appendCategory(newCategory);
                              setNewCategory("");
                            }
                          }}>
                            <PlusCircle className="w-4 h-4 mr-1" />
                            Add
                          </Button>
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="festival"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Festival (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter festival name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="participationType"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Participation Type</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={(value) => {
                            field.onChange(value);
                            setParticipationType(value);
                          }}
                          defaultValue={field.value}
                          className="md:flex items-center md:gap-5 space-y-1"
                        >
                          <div className={`${participationType === 'individual' ? 'border-primary bg-primary/5' : ''} flex flex-1 cursor-pointer items-center gap-2 rounded-lg border p-4 transition-colors`}>
                            <RadioGroupItem value="individual" id="individual" />
                            <div className="flex flex-1 items-center gap-2">
                              <User className="h-4 w-4" />
                              <div className="">
                                <Label htmlFor="individual">Individual</Label>
                                <p className="text-sm text-muted-foreground">Participant participates individually.</p>
                              </div>
                            </div>
                          </div>
                          <div className={`${participationType === 'team' ? 'border-primary bg-primary/5' : ''} flex flex-1 cursor-pointer items-center gap-2 rounded-lg border p-4 transition-colors`}>
                            <RadioGroupItem value="team" id="team" />
                            <div className="flex flex-1 items-center gap-2">
                              <Users className="h-4 w-4" />
                              <div className="">
                                <Label htmlFor="team">Team</Label>
                                <p className="text-sm text-muted-foreground">Participant participates in a team.</p>
                              </div>
                            </div>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {participationType === 'team' && (
                  <div className="border p-4 rounded-md md:grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="teamSize.minSize"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Minimum Team Size</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              {...field} 
                              onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value, 10) : '')}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="teamSize.maxSize"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Maximum Team Size</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              {...field} 
                              onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value, 10) : '')}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                <FormField
                  control={form.control}
                  name="hideHost"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Hide Host</FormLabel>
                        <FormDescription>
                          Hide the host information from participants
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <h2 className="text-2xl font-bold mb-4">Contacts</h2>
                {contactFields.map((field, index) => (
                  <div key={field.id} className="mb-6 p-4 border rounded-lg shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name={`contacts.${index}.name`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input {...field} className="w-full" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`contacts.${index}.email`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input {...field} type="email" className="w-full" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`contacts.${index}.mobile`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Mobile</FormLabel>
                            <FormControl>
                              <Input {...field} type="tel" className="w-full" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => removeContact(index)}
                      className="mt-4"
                    >
                      <X className="w-4 h-4 mr-1" />
                      Remove
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  onClick={() => appendContact({ name: "", email: "", mobile: "" })}
                  className="mt-4"
                >
                  <PlusCircle className="w-4 h-4 mr-1" />
                  Add Contact
                </Button>

                <FormField
                  control={form.control}
                  name="certificate"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Certificate</FormLabel>
                        <FormDescription>
                          Will certificates be provided to participants?
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="numOfParticipantsAllowed"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Participants Allowed</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} onChange={(e) => field.onChange(+e.target.value)} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div>
                  <FormLabel>Prizes</FormLabel>
                  {prizeFields.map((field, index) => (
                    <div key={field.id} className="space-y-4 mb-4 border px-4 py-2 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name={`prizes.${index}.prizeName`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Prize Name</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="e.g., First Place, Runner Up" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`prizes.${index}.prizeAmount`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Prize Amount</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  {...field} 
                                  onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value, 10) : '')}
                                  placeholder="Enter prize amount" 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <Button type="button" variant="destructive" onClick={() => removePrize(index)}>
                        <X className="w-4 h-4 mr-1" />Remove
                      </Button>
                    </div>
                  ))}
                  <Button type="button" onClick={() => appendPrize({ prizeName: "", prizeAmount: 0 })}>
                    <PlusCircle className="w-4 h-4 mr-1" />
                    Add Prize
                  </Button>
                </div>

                <div className="flex justify-end gap-4">
                  <Button type="button" variant="outline" onClick={() => form.reset()}>Clear <Eraser className="w-4 h-4 " /></Button>
                 {
                  loading?<Button type="submit" className="flex items-center" disabled>Loading <LoaderPinwheel className="animate-spin" /></Button>:<Button type="submit" className="flex items-center">Submit <SendHorizontal className="w-4 h-4 " /></Button>
                 }
                 
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HostForm2;

