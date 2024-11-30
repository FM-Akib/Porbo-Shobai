import  { useState } from "react";
import PropTypes from "prop-types";
import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useLocation } from "react-router-dom";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { PlusCircle, User, Users, X } from "lucide-react";

const HostForm2 = ({ previousFormData = {} }) => {
  const [newCategory, setNewCategory] = useState("");
  const location = useLocation();
  const [participationType, setParticipationType] = useState('individual')
  const { formData } = location.state || {};
   console.log(formData);
  const form = useForm({
    defaultValues: {
      registrationFee: "",
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
      teamSize: { min: 1, max: 1 },
      hideHost: false,
      contacts: [{ name: "", email: "", phone: "" }],
      certificate: false,
      numOfParticipantsAllowed: 1,
      prices: [{ position: "", prize: "" }],
      ...previousFormData, // Merge previousFormData with default values
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

  const { fields: priceFields, append: appendPrice, remove: removePrice } = useFieldArray({
    control: form.control,
    name: "prices",
  });

  const onSubmit = (data) => {
    console.log({ ...previousFormData, ...data });
    // Handle form submission here
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
                      <div className="space-y-2 ">
                        <div className="flex flex-wrap items-center justify-center gap-5">
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
                            Add Category
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
                            field.onChange(value)
                            setParticipationType(value)
                        }}
                        defaultValue={field.value}
                        className="flex items-center gap-5 space-y-1"
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
                    name="teamSize.min"
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
                    name="teamSize.max"
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

                {/* <div>
                  <FormLabel>Contacts</FormLabel>
                  {contactFields.map((field, index) => (
                    <div key={field.id} className="space-y-4 mb-4 p-3 border rounded-lg flex items-center flex-wrap">
                      <FormField
                        control={form.control}
                        name={`contacts.${index}.name`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
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
                              <Input {...field} type="email" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`contacts.${index}.phone`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                              <Input {...field} type="tel" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="button" variant="destructive" onClick={() => removeContact(index)}>
                        X
                      </Button>
                    </div>
                  ))}
                  <Button type="button" onClick={() => appendContact({ name: "", email: "", phone: "" })}>
                    Add Contact
                  </Button>
                </div> */}

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
                        name={`contacts.${index}.phone`}
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone</FormLabel>
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
                    <X className="w-4 h-4 mr-2" />
                    Remove
                    </Button>
                </div>
                ))}
                <Button
                type="button"
                onClick={() => appendContact({ name: "", email: "", phone: "" })}
                className="mt-4"
                >
                <PlusCircle className="w-4 h-4 mr-2" />
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
                  <FormLabel>Prices</FormLabel>
                  {priceFields.map((field, index) => (
                    <div key={field.id} className="space-y-4 mb-4">
                      <FormField
                        control={form.control}
                        name={`prices.${index}.position`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Position</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="e.g., 1st, 2nd, 3rd" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`prices.${index}.prize`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Prize</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Enter prize details" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="button" variant="destructive" onClick={() => removePrice(index)}>
                        Remove Price
                      </Button>
                    </div>
                  ))}
                  <Button type="button" onClick={() => appendPrice({ position: "", prize: "" })}>
                    Add Price
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

HostForm2.propTypes = {
  previousFormData: PropTypes.object.isRequired,
};

export default HostForm2;

