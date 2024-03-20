import React from "react"
import axios from "axios"
import Chart from "chart.js/auto"

type resp = {
    data: {
        Date: string[]
        Predicted_Price: number[]
        Real_Price: number[]
        Previous_Predictions: number[]
        RMSE: number
        Date_updated: string
    }
}

export default function Home({ data }: resp): React.ReactNode {
    const xValues = data.Date
    const predicted_price = data.Predicted_Price
    const real_price = data.Real_Price
    const past_predicted_price = data.Previous_Predictions
    new Chart("AAPLchart", {
        type: "line",
        data: {
            labels: xValues,
            datasets: [
                {
                    fill: false,
                    backgroundColor: "rgba(255,0,0,1.0)",
                    borderColor: "rgba(255,0,0,0.1)",
                    data: predicted_price,
                    label: "Predicted Price",
                    yAxisID: "y",
                },
                {
                    fill: false,
                    backgroundColor: "rgba(0,0,255,1.0)",
                    borderColor: "rgba(0,0,255,0.1)",
                    data: real_price,
                    label: "Real Price",
                    yAxisID: "y1",
                },
                {
                    fill: false,
                    backgroundColor: "rgba(0,255,0,1.0)",
                    borderColor: "rgba(0,255,0,0.1)",
                    data: past_predicted_price,
                    label: "Past Predicted Price",
                    yAxisID: "y2",
                },
            ],
        },
        // options: {
        //   legend: {display: true},
        //   scales: {
        //     yAxes: [{ticks: {min: 6, max:16}}],
        //   }
        // }
        options: {
            interaction: {
                mode: "index",
                intersect: false,
            },
            plugins: {
                title: {
                    display: true,
                    text: "AAPL closing price predictions",
                },
            },
            scales: {
                y: {
                    type: "linear",
                    display: true,
                    position: "left",
                },
                y1: {
                    display: false,
                },
                y2: {
                    display: false,

                    // grid line settings
                    grid: {
                        drawOnChartArea: false, // only want the grid lines for one axis to show up
                    },
                },
            },
        },
    })
    return (
        <>
            <canvas id="AAPLchart">{data.RMSE}</canvas>
            <p>{data.RMSE}</p>
        </>
    )
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
