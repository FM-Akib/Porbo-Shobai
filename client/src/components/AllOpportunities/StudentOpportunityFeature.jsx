'use client';

import {
  ArrowRight,
  Brain,
  Code2,
  Lightbulb,
  Medal,
  Puzzle,
  Trophy,
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function StudentOpportunities() {
  const opportunities = [
    {
      icon: <Code2 className="h-10 w-10" />,
      title: 'Hackathons',
      description:
        '48-hour intensive coding challenges where students collaborate to solve real-world problems',
      benefits: [
        'Hands-on coding experience',
        'Team collaboration skills',
        'Industry exposure',
        'Project portfolio building',
      ],
      stats: '80% of participants report improved coding skills',
    },
    {
      icon: <Trophy className="h-10 w-10" />,
      title: 'Competitions',
      description:
        'Academic and skill-based competitions across various disciplines',
      benefits: [
        'Recognition and awards',
        'Resume enhancement',
        'Competitive experience',
        'Performance under pressure',
      ],
      stats: '65% higher chance of internship placement',
    },
    {
      icon: <Lightbulb className="h-10 w-10" />,
      title: 'Idea Generation',
      description:
        'Workshops and sessions focused on innovation and creative problem-solving',
      benefits: [
        'Creative thinking skills',
        'Problem-solving abilities',
        'Innovation mindset',
        'Startup potential',
      ],
      stats: '90% developed new project ideas',
    },
    {
      icon: <Brain className="h-10 w-10" />,
      title: 'Quiz Competitions',
      description:
        'Knowledge-testing events covering academic and general topics',
      benefits: [
        'Knowledge enhancement',
        'Quick thinking',
        'Confidence building',
        'Learning motivation',
      ],
      stats: '75% improved academic performance',
    },
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 transition-colors duration-300 bg-gradient-to-b from-background to-muted dark:from-gray-950 dark:to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground dark:text-white mb-4 md:mb-6">
            Unlock Your Potential Through Opportunities
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground dark:text-gray-300">
            Discover how participating in various events and competitions can
            accelerate your growth and open new doors for your future.
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10 mb-16">
          {opportunities.map((item, index) => (
            <div
              key={index}
              className="bg-card dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900/30 p-6 md:p-8 transition-all duration-300 hover:shadow-lg dark:hover:shadow-gray-900/50 hover:-translate-y-1 border border-border dark:border-gray-700"
            >
              <div className="mb-5 inline-block p-3 md:p-4 bg-primary/10 dark:bg-primary/20 rounded-lg text-primary dark:text-primary-foreground">
                {item.icon}
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-foreground dark:text-white mb-3">
                {item.title}
              </h3>
              <p className="text-muted-foreground dark:text-gray-300 mb-4">
                {item.description}
              </p>
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground dark:text-white">
                  Key Benefits:
                </h4>
                <ul className="space-y-2">
                  {item.benefits.map((benefit, idx) => (
                    <li
                      key={idx}
                      className="flex items-center text-muted-foreground dark:text-gray-300"
                    >
                      <ArrowRight className="h-4 w-4 mr-2 text-primary dark:text-primary-foreground" />
                      {benefit}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 pt-4 border-t border-border dark:border-gray-700">
                  <p className="text-sm font-medium text-primary dark:text-primary-foreground">
                    {item.stats}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Success Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-card dark:bg-gray-800 p-6 rounded-xl border border-border dark:border-gray-700 text-center">
            <Trophy className="h-8 w-8 mb-3 mx-auto text-primary dark:text-primary-foreground" />
            <div className="text-2xl font-bold text-foreground dark:text-white mb-1">
              5000+
            </div>
            <p className="text-sm text-muted-foreground dark:text-gray-300">
              Students Participated
            </p>
          </div>
          <div className="bg-card dark:bg-gray-800 p-6 rounded-xl border border-border dark:border-gray-700 text-center">
            <Medal className="h-8 w-8 mb-3 mx-auto text-primary dark:text-primary-foreground" />
            <div className="text-2xl font-bold text-foreground dark:text-white mb-1">
              250+
            </div>
            <p className="text-sm text-muted-foreground dark:text-gray-300">
              Awards Won
            </p>
          </div>
          <div className="bg-card dark:bg-gray-800 p-6 rounded-xl border border-border dark:border-gray-700 text-center">
            <Users className="h-8 w-8 mb-3 mx-auto text-primary dark:text-primary-foreground" />
            <div className="text-2xl font-bold text-foreground dark:text-white mb-1">
              1000+
            </div>
            <p className="text-sm text-muted-foreground dark:text-gray-300">
              Teams Formed
            </p>
          </div>
          <div className="bg-card dark:bg-gray-800 p-6 rounded-xl border border-border dark:border-gray-700 text-center">
            <Puzzle className="h-8 w-8 mb-3 mx-auto text-primary dark:text-primary-foreground" />
            <div className="text-2xl font-bold text-foreground dark:text-white mb-1">
              150+
            </div>
            <p className="text-sm text-muted-foreground dark:text-gray-300">
              Projects Launched
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h3 className="text-xl md:text-2xl font-bold text-foreground dark:text-white mb-4">
            Ready to Start Your Journey?
          </h3>
          <p className="text-muted-foreground dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            Join thousands of students who have transformed their careers
            through these opportunities. Don&apos;t miss out on your chance to
            grow and succeed.
          </p>
          <Link
            to="/all-opportunities"
            className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium shadow-lg hover:bg-primary/90 dark:hover:bg-primary/80 transition-colors"
          >
            Explore Opportunities
          </Link>
          {/* <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium shadow-lg hover:bg-primary/90 dark:hover:bg-primary/80 transition-colors">
            Explore Opportunities
          </button> */}
        </div>
      </div>
    </section>
  );
}
