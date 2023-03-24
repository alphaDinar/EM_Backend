import React from "react";
import Chart from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";

// const labels = ["pending", "active", "completed"];



const QuizChart = ({pendCount, actCount, compCount}) => {
  const data = {
    // labels: labels,
    datasets: [
      {
        // label: ["My First dataset",'2nd'],
        backgroundColor: ['#00acea','#aeecc1',"#ff6364",],
        borderColor: "white",
        data: [actCount, compCount, pendCount],
      },
    ],
  };
  return (
    <div style={{width:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
      <Doughnut data={data} />
    </div>
  );
};

export default QuizChart;