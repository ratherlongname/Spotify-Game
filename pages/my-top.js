

export default function MyTop() {
    return (
        <p>my-top</p>
    )
}

export async function getServerSideProps({res}) {
    // redirect to login if not logged in
    
    const scopes = 'user-top-read';
    const redirect_uri = 'http://localhost:3000/callback-my-top';
    const location = 'https://accounts.spotify.com/authorize'
                   + '?response_type=' + 'code'
                   + '&client_id=' + '0c3576123f4b44d5a1053aca755b8224'
                   + (scopes ? '&scope=' + encodeURIComponent(scopes) : '')
                   + '&redirect_uri=' + encodeURIComponent(redirect_uri);
    res.writeHead(302, {location: location});
    res.end();

    return {props: {}}
}