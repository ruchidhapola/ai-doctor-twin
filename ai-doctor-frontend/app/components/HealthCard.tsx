export default function HealthCard({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition">
      <h3 className="text-slate-500 text-sm font-medium">
        {title}
      </h3>

      <p className="text-4xl font-bold mt-3 text-sky-700">
        {value}
      </p>
    </div>
  );
}