import https from 'https'
import querystring from 'querystring'
import cookie from 'cookie'

export default (req, res) => {
    if(req.method === 'GET') {
        if(req.query.code) {
            // accepted
            console.log("req.query.code: ", req.query.code)

            const body = querystring.stringify({
                'grant_type': "authorization_code",
                'code': req.query.code,
                'redirect_uri': 'http://localhost:3000/api/callback-my-top',
                'client_id': '0c3576123f4b44d5a1053aca755b8224',
                'client_secret': process.env.CLIENT_SECRET
            })
            const options = {
                hostname: 'accounts.spotify.com',
                path: '/api/token',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Length': body.length
                }
            }
            let token_req = https.request(options, (res) => {
                console.log('statusCode:', res.statusCode);
                console.log('headers:', res.headers);

                res.on('data', setTokensInCookie)
            });
            token_req.on('error', (e) => {console.log(e)});
            token_req.write(body);
            token_req.end();

            function setTokensInCookie(data) {
                const json_resp = JSON.parse(data)
                console.log("json from spotify: ", json_resp);
                const cookie_at = cookie.serialize('at', json_resp.access_token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== 'development',
                    sameSite: 'strict',
                    maxAge: 3600,
                    path: '/my-top'
                })
                const cookie_rt = cookie.serialize('rt', json_resp.refresh_token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== 'development',
                    sameSite: 'strict',
                    path: '/my-top'
                })
                console.log("cookie_at: ", cookie_at)
                console.log("cookie_rt: ", cookie_rt)
                res.setHeader('Set-Cookie', [cookie_at, cookie_rt])
                res.redirect('/');
            }
            // TODO: res.redirect("/my-top")
            return
        }
        else if(req.query.error) {
            console.log("Error from spotify: ", req.query.error)
        }
        else {
            console.log("Something unexpected in GET request")
        }
    }
    else {
        console.log("req.method === GET fail")
    }

    res.redirect("/error")
    return
}