import React from "react"
import axios from "axios"

type resp = {
    data: { Date: string[]; Predicted_Price: number[]; RMSE: number }
}

export default function Home({ data }: resp): React.ReactNode {
    return <h1>{data.RMSE}</h1>
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
