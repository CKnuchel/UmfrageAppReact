import { useLoaderData } from "react-router-dom";
import { getPrivateContent } from "../functions/get_demodata";

export async function loader() {
    return { data: await getPrivateContent() }
}

export default function Private(){

const { data } = useLoaderData();

    return <>
    <h1>Privat</h1>
    <p>Hier sind die Serverdaten: </p>
    <ul>
        {data.map((item) => (
            <li key={item}>{item}</li>
        ))}
    </ul>
    </>

}