import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { ArrowLeft, ImageUp, PlusCircle, X } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import JoditEditor from "jodit-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { formSchemaMentor } from "@/utils/FormError";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaFemale, FaMale } from "react-icons/fa";
const MentorForm = () => {
  const [content, setContent] = useState("");
  const [bannerPreview, setBannerPreview] = useState(null);
  const [banner, setBanner] = useState(null);
  const [newLanguage, setnewLanguage] = useState("");
  const editor = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { title } = location.state || {};
  console.log(title);
  const form = useForm({
    resolver: zodResolver(formSchemaMentor),
    defaultValues: {
      gender: "male",
    },
    gender: "onBlur",
  });

  const config = useMemo(
    () => ({
      readonly: false, // allow editing
      height: 300,
      placeholder:
        content ||
        "This field helps you to mention the details of the opportunity you are listing. \n\n It is better to include Rules, Eligibility, Process, Format, etc., in order to get the opportunity approved. The more details, the better!", // Placeholder text
      toolbar: [
        "bold",
        "italic",
        "underline",
        "align",
        "orderedlist",
        "unorderedlist",
      ],
      buttons: [
        "bold",
        "italic",
        "underline",
        "align",
        "orderedlist",
        "unorderedlist",
      ],
      image: false, // Disable image tool
      video: false, // Disable video tool
      showCharsCounter: false, // Optional: Disable character counter
      showWordsCounter: false, // Optional: Disable word counter
      disableSpeech: true,
    }),
    [content]
  );


  // Handle banner upload
  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    setBanner(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setBannerPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (value) => {
    console.log(value);
    navigate("/complete-mentor", {
      state: { formData: { ...value, content, banner } },
    });
  };

  const onError = (errors) => {
    console.error("Validation Errors:", errors);
  };

  const {
    fields: languageField,
    append: appendLanguage,
    remove: removeLanguage,
  } = useFieldArray({
    control: form.control,
    name: "languages",
  });

  return (
    <div className="min-h-screen md:p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center gap-4">
          <Link to="/host-competitions">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div className="flex flex-col md:flex-row items-center gap-2">
            <div className="flex h-8 items-center gap-2 rounded-full bg-primary px-4 text-sm text-primary-foreground">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white dark:bg-gray-800 text-xs text-primary">
                1
              </span>
              Basic Details
            </div>
            <div className="flex h-8 items-center gap-2 rounded-full bg-gray-100 px-4 text-sm text-gray-500">
              <span className="flex h-5 w-5 items-center justify-center dark:text-white rounded-full bg-gray-200 dark:bg-slate-400 text-xs">
                2
              </span>
              Registration Details
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Fill in the basic information about yourself </CardTitle>
            <CardDescription className="dark:bg-transparent bg-gradient-to-r from-[hsla(33,100%,53%,1)] to-[#7d7b51] rounded">
              <div
                className="bg-[url('https://res.cloudinary.com/ds0io6msx/image/upload/v1732976554/PorboShobai/bivqyz9exxhzyytqq6ze.png')] 
                        bg-contain md:bg-cover h-[100px] md:h-[200px] flex items-center justify-center bg-center"
              >
                <h1 className="text-2xl  md:text-4xl font-bold text-white text-center">
                  Become <br className="block md:hidden" />a Porbo Shobai
                  Mentor!
                </h1>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Form */}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit, onError)}
                className="space-y-8"
              >
                {/* Banner Upload */}
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="flex h-32 w-72 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100">
                      <ImageUp className="mb-2 h-10 w-10 text-gray-400" />
                      <div className="text-center text-sm text-gray-600">
                        Click here upload your photo
                      </div>
                    </div>
                    <input
                      type="file"
                      className="absolute inset-0 cursor-pointer opacity-0"
                      accept="image/*"
                      onChange={handleBannerChange}
                    />
                  </div>
                </div>
                {bannerPreview && (
                  <div className="mt-4 flex justify-center">
                    <img
                      src={bannerPreview}
                      alt="Banner Preview"
                      className="w-72 h-32 object-cover rounded-lg"
                    />
                  </div>
                )}

                {/* First Name */}
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Your First Name"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Maximum 190 characters</FormDescription>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                {/* Last Name */}
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Your Last Name"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Maximum 190 characters</FormDescription>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                {/*Gender*/}
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Gender</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex gap-4 flex-col md:flex-row"
                        >
                          <div
                            className={cn(
                              "flex flex-1 cursor-pointer items-center gap-2 rounded-lg border p-4 transition-colors",
                              field.value === "male" &&
                                "border-primary bg-primary/5"
                            )}
                          >
                            <RadioGroupItem value="male" id="male" />
                            <div className="flex flex-1 items-center gap-2">
                              <FaMale className="h-4 w-4" />
                              <div>
                                <label htmlFor="male" className="font-medium">
                                  Male{" "}
                                </label>
                              </div>
                            </div>
                          </div>
                          <div
                            className={cn(
                              "flex flex-1 cursor-pointer items-center gap-2 rounded-lg border p-4 transition-colors",
                              field.value === "female" &&
                                "border-primary bg-primary/5"
                            )}
                          >
                            <RadioGroupItem value="female" id="female" />
                            <div className="flex flex-1 items-center gap-2">
                              <FaFemale className="h-4 w-4" />
                              <div>
                                <label htmlFor="female" className="font-medium">
                                  Female
                                </label>
                              </div>
                            </div>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* mobile number */}
                <FormField
                  control={form.control}
                  name="mobileNo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mobile Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter mobile number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Organisation */}
                <FormField
                  control={form.control}
                  name="organisation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Organisation/Institute *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your organisation/institute name"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Domain */}
                <FormField
                  control={form.control}
                  name="domain"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Domain</FormLabel>

                      {/* Using Controller to link react-hook-form with Select component */}
                      <Controller
                        name="domain"
                        control={form.control}
                        defaultValue={field.value} // Set the default value from form state
                        render={({ field: controllerField }) => (
                          <Select
                            onValueChange={(value) => {
                              controllerField.onChange(value);
                              form.setValue("domain", value);
                            }}
                            value={controllerField.value || ""}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select opportunity type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Physics">Physics</SelectItem>
                              <SelectItem value="Math">Math</SelectItem>
                              <SelectItem value="Chemistry">
                                Chemistry
                              </SelectItem>
                              <SelectItem value="Biology">Biology</SelectItem>
                              <SelectItem value="ICT">ICT</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />

                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Work Experience* */}
                <FormField
                  control={form.control}
                  name="workExperience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Work Experience</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Example: Computer Science & Engineering | Institution Study"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Maximum 190 characters</FormDescription>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                {/* Bio/About you */}
                <FormField
                  control={form.control}
                  name="bio"
                  render={() => (
                    <FormItem>
                      <FormLabel>Bio/About You</FormLabel>
                      <JoditEditor
                        ref={editor}
                        value={content}
                        config={config}
                        tabIndex={1} // tabIndex of textarea
                        onBlur={(newContent) => setContent(newContent)} // Update content on blur for performance reasons
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Languages */}

                <FormField
                  control={form.control}
                  name="languages"
                  render={() => (
                    <FormItem>
                      <FormLabel>Languages You Are Fluent In</FormLabel>
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-5">
                          {languageField.map((field, index) => (
                            <div
                              key={field.id}
                              className="flex items-center space-x-1"
                            >
                              <Input
                                {...form.register(`languages.${index}`)}
                                placeholder="Language name"
                                className="w-fit"
                              />
                              <Button
                                type="button"
                                variant="destructive"
                                onClick={() => removeLanguage(index)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center space-x-2">
                          <Input
                            value={newLanguage}
                            onChange={(e) => setnewLanguage(e.target.value)}
                            placeholder="Add a new language"
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault(); // Prevent form submission
                                if (newLanguage.trim()) {
                                  appendLanguage(newLanguage.trim());
                                  setnewLanguage("");
                                }
                              }
                            }}
                          />
                          <Button
                            type="button"
                            onClick={() => {
                              if (newLanguage.trim()) {
                                appendLanguage(newLanguage.trim());
                                setnewLanguage("");
                              }
                            }}
                          >
                            <PlusCircle className="w-4 h-4 mr-1" />
                            Add
                          </Button>
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* LinkedIn URL */}
                <FormField
                  control={form.control}
                  name="linkedinUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>LinkedIn</FormLabel>
                      <FormControl>
                        <Input placeholder="https://" {...field} />
                      </FormControl>
                      <FormDescription>Enter your LinkedIn URL</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Facebook URL */}
                <FormField
                  control={form.control}
                  name="facebookUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Facebook</FormLabel>
                      <FormControl>
                        <Input placeholder="https://" {...field} />
                      </FormControl>
                      <FormDescription>Enter your Facebook URL</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Youtube URL */}
                <FormField
                  control={form.control}
                  name="youtubeUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Youtube</FormLabel>
                      <FormControl>
                        <Input placeholder="https://" {...field} />
                      </FormControl>
                      <FormDescription>Enter your Youtube URL</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Protfolio URL */}
                <FormField
                  control={form.control}
                  name="protfolioUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Protfolio</FormLabel>
                      <FormControl>
                        <Input placeholder="https://" {...field} />
                      </FormControl>
                      <FormDescription>Enter your Protfolio URL</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end gap-4">
                  <Button
                    variant="ghost"
                    className="mt-2"
                    onClick={() => form.reset()}
                  >
                    Clear
                  </Button>
                  <Button type="submit" className="mt-2">
                    Next
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MentorForm;
