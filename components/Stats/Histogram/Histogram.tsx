import CustomTooltip from '@/components/CustomToolTip/CustomToolTip';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
} from 'recharts';

interface HistogramProp {
  histogram: Record<number, number>[];
}

const Histogram = ({ histogram }: HistogramProp) => {
  return (
    <div className='max-w-6xl mx-auto bg-white/90 backdrop-blur-xl border border-black/10 rounded-2xl shadow-xl p-10'>
      {/* Title */}
      <h2 className='text-3xl font-bold text-center mb-10 from-amber-600 to-orange-500 bg-clip-text text-transparent'>
        Статистика зарплат
      </h2>

      {/* Chart */}
      <div className='w-full h-105'>
        <ResponsiveContainer width='100%' height='100%'>
          <BarChart
            data={histogram}
            margin={{ top: 20, right: 30, left: 10, bottom: 10 }}
          >
            {/* Gradient */}
            <defs>
              <linearGradient id='salaryGradient' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='0%' stopColor='#f59e0b' stopOpacity={0.9} />
                <stop offset='100%' stopColor='#f97316' stopOpacity={0.7} />
              </linearGradient>
            </defs>

            {/* Grid */}
            <CartesianGrid strokeDasharray='3 3' stroke='#e5e7eb' />

            {/* Axis */}
            <XAxis dataKey='salary' tick={{ fontSize: 12 }} stroke='#6b7280' />

            <YAxis tick={{ fontSize: 12 }} stroke='#6b7280' />

            {/* Tooltip */}
            <Tooltip
              content={
                <CustomTooltip
                  firstParagraph='Зарплата'
                  secondParagraph='Вакансій'
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
              dataKey='count'
              fill='url(#salaryGradient)'
              radius={[8, 8, 0, 0]}
              barSize={38}
              animationDuration={900}
            >
              {histogram.map((_, index: number) => (
                <Cell key={`cell-${index}`} cursor='pointer' />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Histogram;
