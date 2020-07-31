const jwksClient = require('jwks-rsa');
const jwt = require('jsonwebtoken');
import { environment } from '@app/environment';

const client = jwksClient({
    jwksUri: `${environment.auth0.issuer}.well-known/jwks.json`
});

function getKey(header, cb) {
    client.getSigningKey(header.kid, function (err, key: any) {
        const signingKey = key.publicKey || key.rsaPublicKey;
        cb(null, signingKey);
    });
}

const options = {
    audience: environment.auth0.audience,
    issuer: environment.auth0.issuer,
    algorithms: ['RS256'] as any
};


export async function isTokenValid(token) {
    if (token) {
        const bearerToken = token.split(' ');

        const result = new Promise((resolve, reject) => {
            jwt.verify(
                bearerToken[1],
                getKey,
                options,
                (error: any, decoded: any) => {
                    if (error) {
                        resolve({ error });
                    }
                    if (decoded) {
                        resolve({ decoded });
                    }
                },
            );
        });

        return result;
    }

    return { error: 'No token provided' };
}