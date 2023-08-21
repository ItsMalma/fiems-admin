import { ResponsiveContainer, BarChart as RechartsBarChart, Bar, CartesianGrid, XAxis, YAxis } from "recharts";

type BarChartData = {
  x: any;
  firstValue: number;
}

type BarChartProps = {
  datas: BarChartData[];
  width?: string | number;
  height?: string | number;
};

export default function BarChart({
  width = "100%",
  height = 284,
  ...props
}: BarChartProps) {
  const rechartsData = props.datas.map(data => ({
    name: data.x,
    bar1: data.firstValue,
  }));

  return (
    <ResponsiveContainer width={width} height={height}>
      <RechartsBarChart width={150} height={50} data={rechartsData}>
        <CartesianGrid stroke="#ECE9F1" vertical={false} />
        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tick={{
            fill: "#A2A3A5",
            fontSize: 14,
            fontWeight: 500
          }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{
            fill: "#A2A3A5",
            fontSize: 14,
            fontWeight: 500
          }}
        />
        <Bar dataKey="bar1" fill="#4595E0" barSize={64} />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}