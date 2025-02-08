import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { formSchema } from '@/utils/FormError';
import { zodResolver } from '@hookform/resolvers/zod';
import JoditEditor from 'jodit-react';
import { ArrowLeft, Globe, ImageUp, Lock } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

const UpdateAopportunityForm1 = ({ Aopportunity }) => {
  const [content, setContent] = useState(Aopportunity?.description || '');
  const [bannerPreview, setBannerPreview] = useState(null);
  const [banner, setBanner] = useState(null);
  const [mode, setMode] = useState(false);
  const editor = useRef(null);
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      visibility: Aopportunity?.visibility || 'public',
      mode: Aopportunity?.mode || 'online',
      opportunityType:
        Aopportunity?.opportunityType || 'General & Case Competitions',
      title: Aopportunity?.title,
      organization: Aopportunity?.organization,
      websiteUrl: Aopportunity?.websiteUrl,
      city: Aopportunity?.city,
      location: Aopportunity?.location,
      subtitle: Aopportunity?.subtitle,
    },
    mode: 'onBlur',
  });

  const config = useMemo(
    () => ({
      readonly: false, // allow editing
      height: 300,
      placeholder:
        content ||
        'This field helps you to mention the details of the opportunity you are listing. \n\n It is better to include Rules, Eligibility, Process, Format, etc., in order to get the opportunity approved. The more details, the better!', // Placeholder text
      toolbar: [
        'bold',
        'italic',
        'underline',
        'align',
        'orderedlist',
        'unorderedlist',
      ],
      buttons: [
        'bold',
        'italic',
        'underline',
        'align',
        'orderedlist',
        'unorderedlist',
      ],
      image: false, // Disable image tool
      video: false, // Disable video tool
      showCharsCounter: false, // Optional: Disable character counter
      showWordsCounter: false, // Optional: Disable word counter
      disableSpeech: true,
    }),
    [content],
  );

  useEffect(() => {
    const subscription = form.watch(value => {
      setMode(value.mode === 'offline');
    });
    return () => subscription.unsubscribe();
  }, [form]);

  // Handle banner upload
  const handleBannerChange = e => {
    const file = e.target.files[0];
    setBanner(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setBannerPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = value => {
    console.log({ ...value, content, banner });
    navigate(`/dashboard/update-a-opportuinity-final/${Aopportunity._id}`, {
      state: { formData: { ...value, content, banner } },
    });
  };

  const onError = errors => {
    console.error('Validation Errors:', errors);
  };

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
            <CardTitle>
              Fill in the basic information about your opportunity
            </CardTitle>
            <CardDescription className="dark:bg-transparent bg-gradient-to-r from-[hsla(33,100%,53%,1)] to-[#7d7b51] rounded">
              <div
                className="bg-[url('https://res.cloudinary.com/ds0io6msx/image/upload/v1732976554/PorboShobai/bivqyz9exxhzyytqq6ze.png')]
                        bg-contain md:bg-cover h-[100px] md:h-[200px] flex items-center justify-center bg-center"
              >
                <h1 className="text-xl  md:text-2xl font-bold text-white text-center">
                  Update <br className="block md:hidden" />
                  {Aopportunity?.title}
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
                        Click here to banner upload
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

                {/* Opportunity Title */}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Opportunity Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter opportunity title"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Maximum 190 characters</FormDescription>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                {/* Opportunity subtitle */}
                <FormField
                  control={form.control}
                  name="subtitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Opportunity Subtitle</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter opportunity subtitle"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Maximum 190 characters</FormDescription>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                {/* Opportunity Type */}
                <FormField
                  control={form.control}
                  name="opportunityType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Opportunity Type</FormLabel>

                      {/* Using Controller to link react-hook-form with Select component */}
                      <Controller
                        name="opportunityType"
                        control={form.control}
                        defaultValue={field.value} // Set the default value from form state
                        render={({ field: controllerField }) => (
                          <Select
                            onValueChange={value => {
                              controllerField.onChange(value);
                              form.setValue('opportunityType', value);
                            }}
                            value={controllerField.value || ''}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select opportunity type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="General & Case Competitions">
                                General & Case Competitions
                              </SelectItem>
                              <SelectItem value="Hackathons">
                                Hackathon
                              </SelectItem>
                              <SelectItem value="Webinars & Workshops">
                                Webinar & Workshop
                              </SelectItem>
                              <SelectItem value="Quizzes">
                                Quiz Competition
                              </SelectItem>
                              <SelectItem value="Innovation Challenges">
                                Innovation Challenge
                              </SelectItem>
                              <SelectItem value="Scholarships">
                                Scholarships
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />

                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Visibility */}
                <FormField
                  control={form.control}
                  name="visibility"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Visibility</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex gap-4 flex-col md:flex-row"
                        >
                          <div
                            className={cn(
                              'flex flex-1 cursor-pointer items-center gap-2 rounded-lg border p-4 transition-colors',
                              field.value === 'public' &&
                                'border-primary bg-primary/5',
                            )}
                          >
                            <RadioGroupItem value="public" id="public" />
                            <div className="flex flex-1 items-center gap-2">
                              <Globe className="h-4 w-4" />
                              <div>
                                <label htmlFor="public" className="font-medium">
                                  Open publicly{' '}
                                </label>
                                <p className="text-sm text-muted-foreground">
                                  Will be visible to all users.
                                </p>
                              </div>
                            </div>
                          </div>
                          <div
                            className={cn(
                              'flex flex-1 cursor-pointer items-center gap-2 rounded-lg border p-4 transition-colors',
                              field.value === 'private' &&
                                'border-primary bg-primary/5',
                            )}
                          >
                            <RadioGroupItem value="private" id="private" />
                            <div className="flex flex-1 items-center gap-2">
                              <Lock className="h-4 w-4" />
                              <div>
                                <label
                                  htmlFor="private"
                                  className="font-medium"
                                >
                                  Invite Only
                                </label>
                                <p className="text-sm text-muted-foreground">
                                  Will be accessible only via link.
                                </p>
                              </div>
                            </div>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Organization */}
                <FormField
                  control={form.control}
                  name="organization"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Host Organization Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your organization name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Website URL */}
                <FormField
                  control={form.control}
                  name="websiteUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://" {...field} />
                      </FormControl>
                      <FormDescription>
                        The URL can be your organization&apos;s website or an
                        opportunity-related URL
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Mode of Event */}
                <FormField
                  control={form.control}
                  name="mode"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Mode of Event</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex gap-4 flex-col md:flex-row"
                        >
                          <div
                            className={cn(
                              'flex flex-1 cursor-pointer items-center gap-2 rounded-lg border p-4 transition-colors',
                              field.value === 'online' &&
                                'border-primary bg-primary/5',
                            )}
                          >
                            <RadioGroupItem value="online" id="online" />
                            <div className="flex flex-1 items-center gap-2">
                              <Globe className="h-4 w-4" />
                              <div>
                                <label htmlFor="online" className="font-medium">
                                  Online
                                </label>
                                <p className="text-sm text-muted-foreground">
                                  The event will take place online.
                                </p>
                              </div>
                            </div>
                          </div>
                          <div
                            className={cn(
                              'flex flex-1 cursor-pointer items-center gap-2 rounded-lg border p-4 transition-colors',
                              field.value === 'offline' &&
                                'border-primary bg-primary/5',
                            )}
                          >
                            <RadioGroupItem value="offline" id="offline" />
                            <div className="flex flex-1 items-center gap-2">
                              <Globe className="h-4 w-4" />
                              <div>
                                <label
                                  htmlFor="offline"
                                  className="font-medium"
                                >
                                  Offline
                                </label>
                                <p className="text-sm text-muted-foreground">
                                  The event will take place offline.
                                </p>
                              </div>
                            </div>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Location */}
                <div className={`${mode ? 'block ' : 'hidden'}`}>
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter which city held the event"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Write specific location"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Event Description */}
                <FormField
                  control={form.control}
                  name="description"
                  render={() => (
                    <FormItem>
                      <FormLabel>Opportunity Description</FormLabel>
                      <JoditEditor
                        ref={editor}
                        value={content}
                        config={config}
                        tabIndex={1} // tabIndex of textarea
                        onBlur={newContent => setContent(newContent)} // Update content on blur for performance reasons
                      />
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

export default UpdateAopportunityForm1;
