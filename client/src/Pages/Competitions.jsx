import StudentOpportunities from '@/components/AllOpportunities/StudentOpportunityFeature';
import CompetitionsFeature from '@/components/Competitions/CompetitionsFeature';
import CompetitionsHero from '@/components/Competitions/CompetitionsHero';

const Competitions = () => {
  return (
    <>
      <CompetitionsHero />
      <CompetitionsFeature />
      <StudentOpportunities />
    </>
  );
};

export default Competitions;
