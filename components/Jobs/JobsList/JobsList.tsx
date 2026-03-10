import { Results } from '@/types/Jobs.type';
import JobsCard from '../JobsCard/JobsCard';

interface JobsListProps {
  results: Results[];
}

const JobsList = ({ results }: JobsListProps) => {
  return (
    <ul
      className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3 
    max-w-7xl mx-auto animate-fadeIn'
    >
      {results?.map((el) => (
        <li key={el.id}>
          <JobsCard result={el} />
        </li>
      ))}
    </ul>
  );
};

export default JobsList;
