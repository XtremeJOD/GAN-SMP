import React from "react"
import axios from "axios"
import Chart from "chart.js/auto"

type resp = {
    data: { Date: string[]; Predicted_Price: number[]; RMSE: number }
}

export default function Home({ data }: resp): React.ReactNode {
    const xValues = data.Date
    const yValues = data.Predicted_Price
    new Chart("AAPLchart", {
        type: "line",
        data: {
            labels: xValues,
            datasets: [
                {
                    fill: false,
                    backgroundColor: "rgba(0,0,255,1.0)",
                    borderColor: "rgba(0,0,255,0.1)",
                    data: yValues,
                },
            ],
        },
        // options: {
        //   legend: {display: true},
        //   scales: {
        //     yAxes: [{ticks: {min: 6, max:16}}],
        //   }
        // }
    })
    return <canvas id="AAPLchart">{data.RMSE}</canvas>
    //
}

export async function getStaticProps() {
    const response = await axios.get("http://127.0.0.1:8000/")
    const data = response.data
    console.log(data)
    return {
        props: {
            data,
        },
    }
}
