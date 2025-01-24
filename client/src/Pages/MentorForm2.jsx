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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ArrowLeft, PlusCircle, X } from "lucide-react";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { formSchemaMentor } from "@/utils/FormError";
import { zodResolver } from "@hookform/resolvers/zod";

const MentorForm = () => {
  const [newSkill, setNewSkill] = useState("");
  const [newTopic, setNewTopic] = useState("");
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchemaMentor),
    defaultValues: {
      gender: "male",
    },
  });

  const onSubmit = (value) => {
    navigate("/complete-mentor", {
      state: { formData: value },
    });
  };

  const { fields: skillField, append: appendSkill, remove: removeSkill } = useFieldArray({
    control: form.control,
    name: "skills",
  });

  const { fields: topicField, append: appendTopic, remove: removeTopic } = useFieldArray({
    control: form.control,
    name: "topics",
  });

  return (
    <div className="min-h-screen md:p-8">
      <div className="mx-auto max-w-4xl">
      <div className="mb-6 flex items-center gap-4">
          <Link to="/create-mentor">
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
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* School Name */}
                <FormField
                  control={form.control}
                  name="schoolName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>School</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Your School Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* College Name */}
                <FormField
                  control={form.control}
                  name="collegeName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>College</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Your College Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* University Name */}
                <FormField
                  control={form.control}
                  name="universityName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>University</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Your University Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Skills */}
                <FormField
                  control={form.control}
                  name="skills"
                  render={() => (
                    <FormItem>
                      <FormLabel>Skills</FormLabel>
                      <div className="space-y-2">
                        {skillField.map((field, index) => (
                          <div key={field.id} className="flex items-center space-x-2">
                            <Input
                              {...form.register(`skills.${index}`)}
                              placeholder="Skill name"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              onClick={() => removeSkill(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        <div className="flex items-center space-x-2">
                          <Input
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            placeholder="Add a new skill"
                          />
                          <Button
                            type="button"
                            onClick={() => {
                              if (newSkill.trim()) {
                                appendSkill(newSkill.trim());
                                setNewSkill("");
                              }
                            }}
                          >
                            <PlusCircle className="w-4 h-4 mr-1" /> Add
                          </Button>
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Topics */}
                <FormField
                  control={form.control}
                  name="topics"
                  render={() => (
                    <FormItem>
                      <FormLabel>Topics</FormLabel>
                      <div className="space-y-2">
                        {topicField.map((field, index) => (
                          <div key={field.id} className="flex items-center space-x-2">
                            <Input
                              {...form.register(`topics.${index}`)}
                              placeholder="Topic name"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              onClick={() => removeTopic(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        <div className="flex items-center space-x-2">
                          <Input
                            value={newTopic}
                            onChange={(e) => setNewTopic(e.target.value)}
                            placeholder="Add a new topic"
                          />
                          <Button
                            type="button"
                            onClick={() => {
                              if (newTopic.trim()) {
                                appendTopic(newTopic.trim());
                                setNewTopic("");
                              }
                            }}
                          >
                            <PlusCircle className="w-4 h-4 mr-1" /> Add
                          </Button>
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end gap-4">
                  <Button
                    variant="ghost"
                    onClick={() => form.reset()}
                  >
                    Clear
                  </Button>
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

export default MentorForm;
