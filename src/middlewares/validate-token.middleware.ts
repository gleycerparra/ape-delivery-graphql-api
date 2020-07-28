import fetch from "node-fetch";
import { environment } from "@app/environment";
import { NextFunction, Request, Response } from 'express';
import HttpException from "@app/exceptions/http.exception";

export default function validateTokenMiddleware(request: any, response: Response, next: NextFunction) {
    const authorizationHeader = request.headers?.authorization;
    if (authorizationHeader && authorizationHeader.includes('Bearer ')) {
        const token = authorizationHeader.replace('Bearer ', '');
        fetch(environment.validateTokenRoute, {
            headers: { 'Authorization': `Bearer ${token}` },
        })
            .then(res => res.json())
            .then(data => {
                if (data.status !== 401) {
                    request.user = data;
                    next();
                }
                else {
                    next(new HttpException(401, 'Unauthorized'));
                }
            });
    } else {
        next(new HttpException(400, 'Authentication token missing'));
    }

}

