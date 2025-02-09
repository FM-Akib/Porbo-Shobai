import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
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
import useAxiosSecure from '@/Hooks/useAxiosSecure';
import useUserInfo from '@/Hooks/useUserInfo';
import {
  registrationSchema,
  registrationSchemaIndividual,
} from '@/utils/FormError';
import { zodResolver } from '@hookform/resolvers/zod';
import confetti from 'canvas-confetti';
import {
  Building2,
  CircleArrowLeft,
  CreditCard,
  LoaderPinwheel,
  Mail,
  Phone,
  SendHorizontal,
  User,
  UserPlus,
  Users,
} from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import sound from '../../assets/Audio/ps1.wav';
import { AddMemberSheet } from './AddMemberSheet';
import { TeamPreview } from './TeamPreview';

export function RegistrationForm({ Aopportunity }) {
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const axioSecure = useAxiosSecure();
  const { userInfo } = useUserInfo();
  const navigate = useNavigate();
  let zodresolver =
    Aopportunity?.participationType === 'team'
      ? registrationSchema
      : registrationSchemaIndividual;
  const form = useForm({
    resolver: zodResolver(zodresolver),
    defaultValues: {
      email: '',
      mobile: '',
      firstName: '',
      lastName: '',
      gender: 'male',
      organization: '',
      trxid: '',
      type: '',
      teamName: '',
    },
  });

  function palySound() {
    const audio = new Audio(sound);
    audio.play();
  }

  async function onSubmit(data) {
    setLoading(true);
    let formData = {};

    if (Aopportunity?.participationType === 'team') {
      formData = {
        teamName: data?.teamName,
        teamLeader: data?.email,
        organization: data?.organization,
        trxid: data?.trxid,
        type: data?.type,
        members: [
          ...teamMembers,
          {
            email: data?.email,
            mobile: data?.mobile,
            firstName: data?.firstName,
            lastName: data?.lastName,
            gender: data?.gender,
          },
        ],
      };
    } else {
      formData = data;
    }
    const userResult = await axioSecure.patch(
      `/users/participation/${userInfo?.email}`,
      { opportunityId: Aopportunity?._id },
    );

    const result = await axioSecure.patch(
      `/opportunities/participants/${Aopportunity?._id}`,
      { formData },
    );
    // console.log(result);

    if (result?.data?.modifiedCount && userResult?.data?.modifiedCount) {
      setLoading(false);
      navigate(`/a-opportunity/${Aopportunity?._id}`);
      toast.success('Registration submitted successfully!');
      palySound();
      const end = Date.now() + 4 * 1000; // 3 seconds
      const colors = ['#a786ff', '#fd8bbc', '#eca184', '#f8deb1'];
      const frame = () => {
        if (Date.now() > end) return;

        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          startVelocity: 60,
          origin: { x: 0, y: 0.5 },
          colors: colors,
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          startVelocity: 60,
          origin: { x: 1, y: 0.5 },
          colors: colors,
        });

        requestAnimationFrame(frame);
      };

      frame();
    }
  }

  function handleAddMember(memberData) {
    if (teamMembers.length + 1 >= Aopportunity?.teamSize?.maxSize) {
      toast.error(
        `You can only add ${Aopportunity?.teamSize?.maxSize} team members!`,
      );
      return;
    }
    setTeamMembers([...teamMembers, memberData]);
    toast.success('Team member added successfully!', {
      autoClose: 3000,
      hideProgressBar: false,
      closeButton: true,
    });
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Mail className="w-4 h-4" /> Email
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="mobile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Phone className="w-4 h-4" /> Mobile
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your mobile number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <User className="w-4 h-4" /> First Name
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your first name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <User className="w-4 h-4" /> Last Name
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your last name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex space-x-4 border border-gray-200 rounded-md p-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="male" />
                      <FormLabel htmlFor="male">Male</FormLabel>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="female" />
                      <FormLabel htmlFor="female">Female</FormLabel>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="organization"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Building2 className="w-4 h-4" /> Organization Name
                </FormLabel>
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

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="college">College Student</SelectItem>
                    <SelectItem value="university">University</SelectItem>
                    <SelectItem value="school">School Student</SelectItem>
                    <SelectItem value="fresher">Fresher</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {Aopportunity?.registrationFee > 0 && (
            <FormField
              control={form.control}
              name="trxid"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4" /> Transaction ID (BDT{' '}
                    {Aopportunity?.registrationFee})
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="After successful payment" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {Aopportunity?.participationType === 'team' && (
            <FormField
              control={form.control}
              name="teamName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Users className="w-4 h-4" /> Team Name
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your team name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {teamMembers.length + 1 < Aopportunity?.teamSize?.maxSize &&
            Aopportunity?.participationType === 'team' && (
              <Button
                type="button"
                variant="outline"
                className="w-full py-6"
                onClick={() => setIsAddMemberOpen(true)}
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Add Other Team Member ({teamMembers.length + 1}/
                {Aopportunity?.teamSize?.maxSize})
              </Button>
            )}

          {teamMembers.length > 0 && <TeamPreview teamMembers={teamMembers} />}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link to={`/a-opportunity/${Aopportunity?._id}`}>
              <Button className="w-full bg-gradient-to-r  text-white py-6 flex items-center justify-center">
                <CircleArrowLeft /> Cancel
              </Button>
            </Link>

            <Button
              type="submit"
              className={`${
                loading ? 'hidden' : ''
              } w-full bg-gradient-to-r from-green-600 to-green-600 hover:from-green-700
             hover:to-green-700 text-white py-6 flex items-center justify-center`}
              disabled={loading} // Disable the button when loading
            >
              {loading ? (
                <>
                  Loading <LoaderPinwheel className="animate-spin" />
                </>
              ) : (
                <>
                  Submit <SendHorizontal />
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>

      <AddMemberSheet
        isOpen={isAddMemberOpen}
        onClose={() => setIsAddMemberOpen(false)}
        onAddMember={handleAddMember}
      />
    </>
  );
}
