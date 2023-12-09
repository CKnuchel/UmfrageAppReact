import { useLoaderData } from "react-router-dom";
import { getPublicContent } from "../functions/get_demodata";

export async function loader() {
    return { data: await getPublicContent() }
}

export default function Public(){

const { data } = useLoaderData();

    return <>
    <h1>Public</h1>
    <p>Hier sind die Serverdaten: </p>
    <ul>
        {data.map((item) => (
            <li key={item}>{item}</li>
        ))}
    </ul>
    </>

}