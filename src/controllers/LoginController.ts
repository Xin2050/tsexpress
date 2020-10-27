import {NextFunction, Request, Response} from "express";
import {get, controller, use, bodyValidator, post} from "./decorators";

@controller('/auth')
class LoginController {

    @get('/login')
    @use(logger2db)
    @use(logger2file)
    getLogin(req: Request, res: Response): void {
        res.send(`
            <form method='POST' >
                <div>
                <label>Email</label>
                <input name="email"/>
                </div>
                <div><label>Password</label>
                <input type="password" name="password">
                </div>
                <button>Submit</button>                  
                </div>
            </form>
        `);
    }

    @post('/login')
    @bodyValidator('email', 'password')
    postLogin(req: Request, res: Response): void {
        const {email, password} = req.body;
        if (email === 'abc' && password === '123') {
            req.session = {loggedIn: true, userId: 1};
            res.redirect('/');
        } else {
            res.send("Invalid email or password");
        }
    }

    @get('/logout')
    getLogout(req: Request, res: Response): void {
        if (req.session && req.session.loggedIn) {
            req.session = null;
        }
        res.redirect('/');
    }
    // @get('/') //ts will tested this is a wrong way to use decorators
    // add(a:number,b:number):number{
    //     return a+b;
    // }
}

function logger2file(req: Request, res: Response, next: NextFunction) {
    console.log('Request was made!!! and Logger to File');
    next();
}

function logger2db(req: Request, res: Response, next: NextFunction) {
    console.log('Request was made!!! and Logger to dbServer!');
    next();
}