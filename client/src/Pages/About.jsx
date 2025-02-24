import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BookOpen,
  Gift,
  Lightbulb,
  Trophy,
  Users,
} from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const features = [
  {
    icon: Trophy,
    title: 'Competitions and Challenges',
    description:
      'Discover and participate in relevant competitions to gain exposure and experience in your field. Compete with peers at regional, national, and international levels.',
    color: 'text-blue-500 dark:text-blue-400',
  },
  {
    icon: BookOpen,
    title: 'One-on-One Mentorship',
    description:
      'Seek guidance from experienced mentors based on your individual needs to improve your skills and make informed career decisions.',
    color: 'text-green-500 dark:text-green-400',
  },
  {
    icon: Lightbulb,
    title: 'Tasks and Challenges',
    description:
      'Complete various tasks and challenges to earn points, fostering continuous learning and engagement. Tasks span a variety of subjects.',
    color: 'text-yellow-500 dark:text-yellow-400',
  },
  {
    icon: Gift,
    title: 'Rewards and Leaderboard',
    description:
      'Redeem points to unlock rewards such as scholarships, gadgets, and educational resources. See your ranking on the global leaderboard.',
    color: 'text-red-500 dark:text-red-400',
  },
];

export default function About() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-background to-muted px-6 py-24 dark:from-background dark:to-background">
      {/* Gradient Orbs */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[800px] w-[800px] animate-pulse rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="mb-6 bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-4xl font-bold text-transparent sm:text-5xl">
            About Porbo Shobai
          </h1>
          <p className="mx-auto mb-12 max-w-3xl text-lg text-muted-foreground">
            In today&apos;s fast-paced academic environment, students often
            struggle to find opportunities to showcase their talents and enhance
            their skills. Porbo Shobai bridges this gap by providing a
            comprehensive platform for growth and success.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mb-20 grid gap-6 md:grid-cols-2"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={item}>
              <Card className="group relative overflow-hidden border-muted-foreground/20 bg-card/50 p-6 backdrop-blur-sm transition-colors hover:bg-card">
                <div className="flex items-start gap-4">
                  <feature.icon
                    className={`h-12 w-12 shrink-0 ${feature.color}`}
                  />
                  <div>
                    <h3 className="mb-2 text-xl font-semibold text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mx-auto max-w-3xl space-y-12 text-center"
        >
          <div>
            <Users className="mx-auto mb-4 h-16 w-16 text-primary" />
            <h2 className="mb-4 text-2xl font-semibold text-foreground">
              Join Our Community
            </h2>
            <p className="text-muted-foreground">
              By integrating learning, mentorship, and gamification, Porbo
              Shobai creates an engaging ecosystem that empowers students to
              grow, compete, and succeed in their academic and professional
              journeys.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">
              Ready to Begin Your Journey?
            </h2>
            <p className="text-muted-foreground">
              Join Porbo Shobai today and become part of a vibrant community of
              learners, mentors, and achievers. Start your journey towards
              excellence!
            </p>
            <Button className="group mt-4" size="lg">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
