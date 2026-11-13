import type { TooltipContentProps } from "recharts";
import type { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipContentProps<ValueType, NameType>) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-white dark:bg-zinc-800 p-2 rounded shadow-md border border-gray-300 dark:border-gray-700">
      <p
        style={{
          color: "#ff4444",
          fontWeight: "bold",
          margin: "0 0 8px",
        }}
      >
        {label}
      </p>

      {payload.map((entry, index) => (
        <p
          key={`${entry.dataKey}-${index}`}
          style={{
            color: entry.color,
            margin: "5px 0",
          }}
        >
          {entry.name}: {entry.value}
        </p>
      ))}
    </div>
  );
};

export default CustomTooltip;