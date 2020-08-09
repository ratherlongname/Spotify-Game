export default function Error({ data }) {
    return (
        <>
        <h1>Error!</h1>
        <p><strong>Referrer:</strong> {data}</p>
        </>
    )
}

export async function getServerSideProps({req}) {
    const data = req.headers.referer ? req.headers.referer : "no referer available";
    console.log("Referer: ", data)
    return {props: { data }};
}