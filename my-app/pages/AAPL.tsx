import React from "react"
import axios from "axios"

// type data = {
//     Date: string[]
//     Predicted_Price: number
//     RMSE: number
// }
type resp = {
    data: { res: string }
}

export default function Home({ data }: resp): React.ReactNode {
    return <h1>{data.res}</h1>
    //
}

export async function getStaticProps() {
    const response = await axios.get("http://127.0.0.1:8000/")
    const data = response.data
    console.log(data.res)
    return {
        props: {
            data,
        },
    }
}
