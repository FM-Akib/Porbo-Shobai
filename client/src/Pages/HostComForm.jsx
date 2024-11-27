import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { ArrowLeft, Cloud, Globe, Lock } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import JoditEditor from 'jodit-react';
import { Link } from "react-router-dom";

const HostComForm = () => {
    const [about, setAbout] = useState('');
    const [bannerPreview, setBannerPreview] = useState(null);
    const form = useForm({
        defaultValues: {
            visibility: "public",
            mode: "online",
            opportunityType: "",
            title: "",
            organization: "",
            websiteUrl: "",
        },
        mode: "onBlur", // Validation will trigger on blur
    });

    const config = {
        readonly: false,
        height: 300,
        placeholder: `This field helps you to mention the details of the opportunity you are listing. \n\n It is better to include Rules, Eligibility, Process, Format, etc., in order to get the opportunity approved. The more details, the better!`,
    };

    // Handle banner upload
    const handleBannerChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setBannerPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = (values) => {
        console.log({ ...values, about });
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
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs text-primary">1</span>
                            Basic Details
                        </div>
                        <div className="flex h-8 items-center gap-2 rounded-full bg-gray-100 px-4 text-sm text-gray-500">
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-200 text-xs">2</span>
                            Registration Details
                        </div>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Basic Details</CardTitle>
                        <CardDescription>
                            Fill in the basic information about your opportunity
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {/* Form */}
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                                {/* Banner Upload */}
                                <div className="flex justify-center">
                                    <div className="relative">
                                        <div className="flex h-32 w-72 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100">
                                            <Cloud className="mb-2 h-10 w-10 text-gray-400" />
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
                                        <img src={bannerPreview} alt="Banner Preview" className="w-72 h-32 object-cover rounded-lg" />
                                    </div>
                                )}

                                {/* Opportunity Type */}
                                <FormField
                                    control={form.control}
                                    name="opportunityType"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Opportunity Type</FormLabel>
                                            <Select {...field} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select opportunity type" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="general">General & Case Competitions</SelectItem>
                                                    <SelectItem value="hackathon">Hackathon</SelectItem>
                                                    <SelectItem value="workshop">Workshop</SelectItem>
                                                </SelectContent>
                                            </Select>
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
                                                    <div className={cn(
                                                        "flex flex-1 cursor-pointer items-center gap-2 rounded-lg border p-4 transition-colors",
                                                        field.value === "public" && "border-primary bg-primary/5"
                                                    )}>
                                                        <RadioGroupItem value="public" id="public" />
                                                        <div className="flex flex-1 items-center gap-2">
                                                            <Globe className="h-4 w-4" />
                                                            <div>
                                                                <label htmlFor="public" className="font-medium">Open publicly on Unstop</label>
                                                                <p className="text-sm text-muted-foreground">Will be visible to all users.</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className={cn(
                                                        "flex flex-1 cursor-pointer items-center gap-2 rounded-lg border p-4 transition-colors",
                                                        field.value === "private" && "border-primary bg-primary/5"
                                                    )}>
                                                        <RadioGroupItem value="private" id="private" />
                                                        <div className="flex flex-1 items-center gap-2">
                                                            <Lock className="h-4 w-4" />
                                                            <div>
                                                                <label htmlFor="private" className="font-medium">Invite Only</label>
                                                                <p className="text-sm text-muted-foreground">Will be accessible only via link.</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Title */}
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Opportunity Title</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter opportunity title" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                Maximum 190 characters
                                            </FormDescription>
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
                                            <FormLabel>Organization Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter your organization name" {...field} />
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
                                                The URL can be your organization&apos;s website or an opportunity-related URL
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
                                                    className="flex gap-4"
                                                >
                                                    <div className={cn(
                                                        "flex flex-1 cursor-pointer items-center gap-2 rounded-lg border p-4 transition-colors",
                                                        field.value === "online" && "border-primary bg-primary/5"
                                                    )}>
                                                        <RadioGroupItem value="online" id="online" />
                                                        <div className="flex flex-1 items-center gap-2">
                                                            <Globe className="h-4 w-4" />
                                                            <div>
                                                                <label htmlFor="online" className="font-medium">Online</label>
                                                                <p className="text-sm text-muted-foreground">The event will take place online.</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className={cn(
                                                        "flex flex-1 cursor-pointer items-center gap-2 rounded-lg border p-4 transition-colors",
                                                        field.value === "offline" && "border-primary bg-primary/5"
                                                    )}>
                                                        <RadioGroupItem value="offline" id="offline" />
                                                        <div className="flex flex-1 items-center gap-2">
                                                            <Globe className="h-4 w-4" />
                                                            <div>
                                                                <label htmlFor="offline" className="font-medium">Offline</label>
                                                                <p className="text-sm text-muted-foreground">The event will take place offline.</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Event Description */}
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={() => (
                                        <FormItem>
                                            <FormLabel>Event Description</FormLabel>
                                            <JoditEditor
                                                value={about}
                                                config={config}
                                                onChange={setAbout}
                                            />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="flex justify-end gap-4">
                                    <Button variant="ghost" className="mt-2" onClick={() => form.reset()}>Clear</Button>
                                    <Button type="submit" className="mt-2">Save</Button>
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default HostComForm;
