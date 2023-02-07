import { Input } from "@chakra-ui/input";
import React from "react";
import Chart from "react-apexcharts";

export const RangeChart = ({ data }: any) => {
  const [ops, setOps] = React.useState<any>(null);
  const [series, setSeries] = React.useState<any>(null);

  React.useEffect(() => {
    setOps({
      plotOptions: {
        bar: {
          horizontal: true,
          distributed: true,
          dataLabels: {
            hideOverflowingLabels: false,
          },
          borderRadius: 5,
        },
      },
      tooltip: {
        enabled: true,
        x: {
          show: true,
          formatter: function (value: any) {
            return new Date(value).toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            });
          },
        },
      },
      xaxis: {
        type: "datetime",
        labels: {
          formatter: function (value: any) {
            return new Date(value).toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            });
          },
        },
      },
    });

    const formattedGraphData = data.map((a: any) => {
      return {
        name: a.forTreatment.treatmentName,
        data: [
          {
            x: a.forTreatment.treatmentName,
            y: [new Date(a.date).getTime(), getEndTime(a.date).getTime()],
            fillColor: "#1A1A1A",
          },
        ],
      };
    });

    setSeries(formattedGraphData);
  }, []);

  const handleSelectedDayChange = (e: any) => {
    if (ops) {
      const start = new Date(e.target.value);
      start.setHours(0);
      start.setMinutes(0);
      const end = new Date(e.target.value);
      end.setHours(23);
      end.setMinutes(0);
      setOps({
        ...ops,
        xaxis: {
          ...ops.xaxis,
          min: start.getTime(),
          max: end.getTime(),
          minTickAmount: 5,
        },
      });
    }
  };

  const getEndTime = (start: string) => {
    // Return the end time of the appointment of either 1hr, 30mins, 2 hours, or 15mins (random)
    const random = Math.floor(Math.random() * 4);
    const times = [1, 2, 4, 6];
    const time = times[random];
    const end = new Date(start);
    end.setHours(end.getHours() + time);
    return end;
  };

  return (
    series && (
      <>
        <Input type="date" onChange={handleSelectedDayChange} />
        <Chart options={ops} series={series} type="rangeBar" height="500px" />
      </>
    )
  );
};
