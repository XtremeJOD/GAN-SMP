import React from "react"
import axios from "axios"
import Chart from "chart.js/auto"
import { readlink } from "fs"

type resp = {
    data: {
        Symbol: string
        Date: string[]
        Predicted_Price: number[]
        Real_Price: number[]
        Previous_Predictions: number[]
        RMSE: number
        Date_updated: string
    }
}

export default function Home({ data }: resp): React.ReactNode {
    const xValues1 = data.Date
    const predicted_price = data.Predicted_Price
    const real_price = data.Real_Price
    let past_predicted_price = data.Previous_Predictions
    const xValues = xValues1.map((x) => x.slice(0, 10))
    const predicted_price1 = predicted_price.map((x) => {
        x = Math.floor(x * 100) / 100
        x.toFixed(2)
        return x
    })
    const real_price1 = real_price.map((x) => {
        x = Math.floor(x * 100) / 100
        x.toFixed(2)
        return x
    })
    past_predicted_price = past_predicted_price.slice(0, -1)
    const past_predicted_price1 = past_predicted_price.map((x) => {
        x = Math.floor(x * 100) / 100
        x.toFixed(2)
        return x
    })
    function rmse(real_prices: number[], predicted_prices: number[]): number {
        let sum = 0
        for (let i = 0; i < real_prices.length; i++) {
            sum += (real_prices[i] - predicted_prices[i]) ** 2
        }
        const RMSE1 = Math.sqrt(sum / real_prices.length)
        return RMSE1
    }
    let RMSE = rmse(real_price1.slice(-7), predicted_price1.slice(-8, -1))
    RMSE = Math.floor(RMSE * 100) / 100
    RMSE.toFixed(2)

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
                    text: data.Symbol + " closing price predictions",
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
            <canvas
                id="AAPLchart"
                style={{ width: "100%", height: "800px" }}
            ></canvas>
            <p>RMSE = {data.RMSE}</p>
            <table>
                <thead>
                    <tr>
                        <th>Sr.No.</th>
                        <th>Actual Value</th>
                        <th>Predicted Price</th>
                        <th>Past Predicted Price</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>{real_price1[real_price1.length - 7]}</td>
                        <td>{predicted_price1[predicted_price1.length - 8]}</td>
                        <td>
                            {
                                past_predicted_price1[
                                    past_predicted_price1.length - 7
                                ]
                            }
                        </td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>{real_price1[real_price1.length - 6]}</td>
                        <td>{predicted_price1[predicted_price1.length - 7]}</td>
                        <td>
                            {
                                past_predicted_price1[
                                    past_predicted_price1.length - 6
                                ]
                            }
                        </td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>{real_price1[real_price1.length - 5]}</td>
                        <td>{predicted_price1[predicted_price1.length - 6]}</td>
                        <td>
                            {
                                past_predicted_price1[
                                    past_predicted_price1.length - 5
                                ]
                            }
                        </td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>{real_price1[real_price1.length - 4]}</td>
                        <td>{predicted_price1[predicted_price1.length - 5]}</td>
                        <td>
                            {
                                past_predicted_price1[
                                    past_predicted_price1.length - 4
                                ]
                            }
                        </td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td>{real_price1[real_price1.length - 3]}</td>
                        <td>{predicted_price1[predicted_price1.length - 4]}</td>
                        <td>
                            {
                                past_predicted_price1[
                                    past_predicted_price1.length - 3
                                ]
                            }
                        </td>
                    </tr>
                    <tr>
                        <td>6</td>
                        <td>{real_price1[real_price1.length - 2]}</td>
                        <td>{predicted_price1[predicted_price1.length - 3]}</td>
                        <td>
                            {
                                past_predicted_price1[
                                    past_predicted_price1.length - 2
                                ]
                            }
                        </td>
                    </tr>
                    <tr>
                        <td>7</td>
                        <td>{real_price1[real_price1.length - 1]}</td>
                        <td>{predicted_price1[predicted_price1.length - 2]}</td>
                        <td>
                            {
                                past_predicted_price1[
                                    past_predicted_price1.length - 1
                                ]
                            }
                        </td>
                    </tr>
                    <tr>
                        <td>RMSE</td>
                        <td colSpan={3}>{RMSE}</td>
                    </tr>
                </tbody>
            </table>
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
