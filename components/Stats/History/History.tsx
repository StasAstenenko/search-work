import CustomTooltip from '@/components/CustomToolTip/CustomToolTip';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface HistoryProps {
  month: {
    date: string;
    salary: number;
  }[];
}

const History = ({ month }: HistoryProps) => {
  return (
    <div className='max-w-6xl mx-auto bg-white/90 backdrop-blur-xl border border-black/10 rounded-2xl shadow-xl p-10'>
      {/* Title */}
      <h2 className='text-3xl font-bold text-center mb-10 from-amber-600 to-orange-500 bg-clip-text text-transparent'>
        Історія зарплат по місяцях
      </h2>

      {/* Chart */}
      <div className='w-full h-105'>
        <ResponsiveContainer width='100%' height='100%'>
          <BarChart
            data={month}
            margin={{ top: 20, right: 30, left: 10, bottom: 10 }}
          >
            {/* Gradient */}
            <defs>
              <linearGradient id='dateGradient' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='0%' stopColor='#f59e0b' stopOpacity={0.9} />
                <stop offset='100%' stopColor='#f97316' stopOpacity={0.7} />
              </linearGradient>
            </defs>

            {/* Grid */}
            <CartesianGrid strokeDasharray='3 3' stroke='#e5e7eb' />

            {/* Axis */}
            <XAxis dataKey='date' tick={{ fontSize: 12 }} stroke='#6b7280' />

            <YAxis tick={{ fontSize: 12 }} stroke='#6b7280' />

            {/* Tooltip */}
            <Tooltip
              content={
                <CustomTooltip
                  firstParagraph='Дата'
                  secondParagraph='Зарплата'
                />
              }
            />

            {/* Legend */}
            <Legend
              wrapperStyle={{
                paddingTop: 20,
              }}
            />

            {/* Bars */}
            <Bar
              dataKey='salary'
              fill='url(#salaryGradient)'
              radius={[8, 8, 0, 0]}
              barSize={38}
              animationDuration={900}
            >
              {month.map((_, index: number) => (
                <Cell key={`cell-${index}`} cursor='pointer' />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default History;
