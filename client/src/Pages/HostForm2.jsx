import  { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation } from "react-router-dom";
import { PlusCircle, User, Users, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { formSchema2 } from "@/utils/FormError";



const HostForm2 = ({ previousFormData = {} }) => {
  const [newCategory, setNewCategory] = useState("");
  const location = useLocation();
  const [participationType, setParticipationType] = useState('individual');
  const { formData } = location.state || {};
console.log(previousFormData);
  const form = useForm({
    resolver: zodResolver(formSchema2),
    defaultValues: {
      registrationFee: "0",
      competitionStartDate: "",
      competitionStartTime: "",
      registrationStartDate: "",
      registrationStartTime: "",
      registrationEndDate: "",
      registrationEndTime: "",
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
      console.log("Form data:", { ...formData, ...data });
      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Submission error:", error);
      alert("An error occurred while submitting the form. Please try again.");
    }
  };

  return (
    <div className="min-h-screen md:p-8">
      <div className="mx-auto max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle>Registration Details</CardTitle>
            <CardDescription>
              Provide additional information about your event
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
                          <Input type="date" {...field} />
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
                          <Input type="time" {...field} />
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
                          <Input type="date" {...field} />
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
                          <Input type="time" {...field} />
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
                          <Input type="date" {...field} />
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
                          <Input type="time" {...field} />
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
                                X
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
                            <FormLabel>NameName</FormLabel>
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
                    Add Prize
                  </Button>
                </div>

                <div className="flex justify-end gap-4">
                  <Button type="button" variant="outline" onClick={() => form.reset()}>Clear</Button>
                  <Button type="submit">Submit</Button>
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

