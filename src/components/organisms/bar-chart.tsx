import {
  BarChart as RechartBar,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Rectangle,
  ResponsiveContainer,
} from "recharts";

type BarData = {
  name: string;
  totalIncome: number;
  totalExpense: number;
};

type BarDataProps = {
  data: BarData[];
};

export default function BarChart({ data }: BarDataProps) {
  return (
    <ResponsiveContainer width={"100%"} height={300}>
      <RechartBar
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar
          barSize={60}
          dataKey="totalIncome"
          fill="#00c950"
          name="Receita"
          activeBar={<Rectangle fill="#00c950" stroke="#00c950" />}
        />
        <Bar
          barSize={60}
          dataKey="totalExpense"
          fill="#B10000 "
          name="Despesas"
          activeBar={<Rectangle fill="#B10000 " stroke="#B10000 " />}
        />
      </RechartBar>
    </ResponsiveContainer>
  );
}
