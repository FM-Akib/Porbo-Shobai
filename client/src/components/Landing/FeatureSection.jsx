import { motion } from 'framer-motion';
import { Award, BarChart3, Target, Trophy, Users } from 'lucide-react';

const features = [
  {
    icon: Trophy,
    title: 'Competition Platform',
    description:
      'Discover and participate in various competitions to showcase your talents and gain valuable exposure in your field of interest.',
    color: 'from-purple-500 to-indigo-500',
  },
  {
    icon: Users,
    title: 'One-on-One Mentorship',
    description:
      'Connect with experienced mentors who provide personalized guidance to help you achieve your academic and career goals.',
    color: 'from-pink-500 to-rose-500',
  },
  {
    icon: Target,
    title: 'Tasks & Challenges',
    description:
      'Engage in exciting tasks and challenges designed to enhance your skills while earning points for your achievements.',
    color: 'from-orange-500 to-amber-500',
  },
  {
    icon: Award,
    title: 'Reward System',
    description:
      'Earn points through active participation and redeem them for valuable rewards that support your learning journey.',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: BarChart3,
    title: 'Global Leaderboard',
    description:
      'Compete with students worldwide and track your progress on our global leaderboard to stay motivated and inspired.',
    color: 'from-blue-500 to-cyan-500',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export default function FeatureSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold tracking-tight mb-4"
          >
            Empowering Students to Excel
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-muted-foreground"
          >
            Discover a world of opportunities to learn, compete, and grow with
            our comprehensive platform
          </motion.p>
        </div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="relative group"
            >
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.color} opacity-75 blur-xl group-hover:opacity-100 transition duration-500`}
              />
              <div className="relative p-8 rounded-2xl bg-background/90 border border-border h-full">
                <feature.icon className="w-12 h-12 mb-6 text-primary" />
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="mt-16 text-center"
        >
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of students who are already benefiting from our
            platform and taking their academic journey to new heights.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
