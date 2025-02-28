import {
  Award,
  BookOpen,
  Compass,
  Heart,
  Lightbulb,
  Target,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MentorImpactFeatures() {
  // Toggle dark mode

  const features = [
    {
      icon: <BookOpen className="h-10 w-10" />,
      title: 'Academic Guidance',
      description:
        'Mentors provide personalized academic support, helping students navigate challenging subjects and develop effective study strategies that lead to improved performance.',
    },
    {
      icon: <Target className="h-10 w-10" />,
      title: 'Goal Setting & Achievement',
      description:
        'Through regular check-ins and accountability, mentors help students set meaningful goals, create actionable plans, and celebrate milestones along their educational journey.',
    },
    {
      icon: <Compass className="h-10 w-10" />,
      title: 'Career Direction',
      description:
        'Mentors offer valuable insights into potential career paths, connecting academic learning to real-world applications and helping students make informed decisions about their future.',
    },

    {
      icon: <Award className="h-10 w-10" />,
      title: 'Skill Development',
      description:
        'Beyond academics, mentors foster critical soft skills like communication, time management, leadership, and problem-solving that are essential for success in any field.',
    },
    {
      icon: <Lightbulb className="h-10 w-10" />,
      title: 'Confidence Building',
      description:
        'Through consistent encouragement and constructive feedback, mentors help students overcome self-doubt, develop resilience, and build the confidence needed to pursue ambitious goals.',
    },
    {
      icon: <Heart className="h-10 w-10" />,
      title: 'Emotional Support',
      description:
        'Mentors provide a safe space for students to express concerns, navigate challenges, and develop emotional intelligence, serving as a trusted ally during difficult times.',
    },
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 transition-colors duration-300 bg-gradient-to-b from-background to-muted dark:from-gray-950 dark:to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading Section */}
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground dark:text-white mb-4 md:mb-6">
            Transforming Lives Through Mentorship
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground dark:text-gray-300">
            A dedicated mentor can be the difference between a student simply
            passing classes and truly thriving in their educational journey.
            Discover how mentorship creates lasting impact.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-card dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900/30 p-6 md:p-8 transition-all duration-300 hover:shadow-lg dark:hover:shadow-gray-900/50 hover:-translate-y-1 border border-border dark:border-gray-700"
            >
              <div className="mb-5 inline-block p-3 md:p-4 bg-primary/10 dark:bg-primary/20 rounded-lg text-primary dark:text-primary-foreground">
                {feature.icon}
              </div>
              <h3 className="text-lg md:text-xl font-bold text-foreground dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground dark:text-gray-300 text-sm md:text-base">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Testimonial Section */}
        <div className="mt-16 md:mt-20 bg-accent/10 dark:bg-gray-800/50 rounded-2xl p-6 sm:p-8 md:p-12 relative">
          <div className="absolute -top-5 left-10 text-5xl md:text-6xl text-primary dark:text-primary-foreground opacity-30">
            &quot;
          </div>
          <blockquote className="text-lg sm:text-xl md:text-2xl text-foreground dark:text-white italic text-center max-w-4xl mx-auto mb-6 md:mb-8">
            My mentor didn&apos;t just help me pass my exams; they helped me
            discover my passion and purpose. The guidance I received transformed
            not just my grades, but my entire outlook on education and my
            future.
          </blockquote>
          <div className="absolute -bottom-5 right-10 text-5xl md:text-6xl text-primary dark:text-primary-foreground opacity-30">
            &quot;
          </div>
          {/* <div className="flex items-center justify-center">
            <div className="w-12 h-12 bg-muted dark:bg-gray-700 rounded-full overflow-hidden mr-4">
              <img
                src="/placeholder.svg?height=48&width=48"
                alt="Student"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-bold text-foreground dark:text-white">
                Sarah Johnson
              </p>
              <p className="text-muted-foreground dark:text-gray-400 text-sm">
                Computer Science Graduate
              </p>
            </div>
          </div> */}
        </div>

        {/* CTA Section */}
        <div className="mt-12 md:mt-16 text-center">
          <h3 className="text-xl md:text-2xl font-bold text-foreground dark:text-white mb-4 md:mb-6">
            Ready to make a difference in a student&apos;s life?
          </h3>
          <Link
            to="/create-mentor"
            className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium shadow-lg hover:bg-primary/90 dark:hover:bg-primary/80 transition-colors text-sm md:text-base"
          >
            Become a Mentor Today
          </Link>
        </div>
      </div>
    </section>
  );
}
