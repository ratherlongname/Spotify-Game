import cookie from 'cookie'
import axios from 'axios'

export default function MyTop() {
    return (
        <p>my-top</p>
    )
}

export async function getServerSideProps({req, res}) {
    if(req.headers.cookie) {
        const cookies = cookie.parse(req.headers.cookie);
        console.log("cookies found: ", cookies);
        if(cookies['at']) {
            console.log("access_token found");

            axios.get("https://api.spotify.com/v1/me/top/tracks",
                {
                    headers: {
                        Authorization: "Bearer " + cookies['at']
                    }
                }
            )
            .then((resp) => {
                console.log(resp.data);
                console.log(resp.status);
            })
            .catch((error) => {
                console.log("error getting top tracks")
                console.log(error)
                res.writeHead(302, {location: "/error"}).end();
            })
        }
        else if(cookies['rt']) {
            console.log("refresh_token found");
        }
        else {
            console.log("unexpected cookies");
            res.writeHead(302, {location: "/error"}).end();
        }

        // TODO: fetch access token if not available
        // TODO: fetch tracks
        // TODO: make quiz
    } else {
        console.log("Cookie not found")

        // auth from spotify
        const scopes = 'user-top-read';
        const redirect_uri = 'http://localhost:3000/api/callback-my-top';
        const location = 'https://accounts.spotify.com/authorize'
                       + '?response_type=' + 'code'
                       + '&client_id=' + '0c3576123f4b44d5a1053aca755b8224'
                       + (scopes ? '&scope=' + encodeURIComponent(scopes) : '')
                       + '&redirect_uri=' + encodeURIComponent(redirect_uri);
        res.writeHead(302, {location: location});
        res.end();
    }
    console.log("hi")

    return {props: {}}
}