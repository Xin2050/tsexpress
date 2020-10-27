import {NextFunction, Request, Response} from "express";

import {controller, get, use} from "./decorators";

function requireAuth(req:Request,res:Response,next:NextFunction):void{
    if(req.session&&req.session.loggedIn){
        next();
        return;
    }
    res.status(403);
    res.send('You are not allowed to access this page');
}

@controller('')
class RootController {
    @get('/')
    getRoot(req: Request, res: Response): void {
        if (req.session && req.session.loggedIn) {
            res.send(`
                <div>
                    <div>You are logged in. UserID:${req.session.userId}</div>
                    <a href="/auth/logout">logout</a>
                    <a href="/protected">Protected Page</a>
                </div>
            `)
        } else {
            res.send(`
                <div>
                    <div>You are not login</div>
                    <a href="/auth/login">Login</a>
                </div>`)
        }
    }

    @get('/protected')
    @use(requireAuth)
    getProtected(req: Request, res: Response): void {
        if(req.session) {
            res.send(`Welcome to protected route, Logged in user: UserID:${req.session.userId}`);
        }
    }
}

