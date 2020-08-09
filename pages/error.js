export default function Error({ src_url }) {
    return (
        <>
        <h1>Error!</h1>
        <p><strong>Referrer:</strong> {src_url}</p>
        </>
    )
}

export async function getServerSideProps({req}) {
    const src_url = req.headers.referer ? req.headers.referer : "no referer available";
    console.log("Referer: ", src_url)
    return {props: { src_url }};
}