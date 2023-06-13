import * as usersDao from "./users-dao.js";

const AuthController = (app) => {
    const register = (req, res) => {
        const username = req.body.username;
        const user = usersDao.findUserByUsername(username);
        if (user) {
            res.sendStatus(409);
            return;
        }
        usersDao.createUser(req.body);
        req.session["currentUser"] = req.body;
        res.json(req.body);
    };
    const login = (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        const user = usersDao.findUserByCredentials(username, password);
        if (user) {
            req.session["currentUser"] = user;
            res.json(user);
        } else {
            res.sendStatus(404);
        }
    };
    const profile = (req, res) => {
        const currentUser = req.session["currentUser"];
        if (!currentUser) {
            res.sendStatus(404);
            return;
        }
        res.json(currentUser);
    };

    const logout = (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    };

    const update = (req, res) => {
        const user = usersDao.updateUser(req.params.uid, req.body)
        req.session["currentUser"] = user
        res.json(user)
    };

    const findAllUsers = (req, res) => {
        const allUsers = usersDao.findAllUsers();
        res.json(allUsers);
    };

    app.post("/api/users/register", register);
    app.post("/api/users/login", login);
    app.post("/api/users/profile", profile);
    app.post("/api/users/logout", logout);
    app.put("/api/users/:uid", update);
    app.get("/api/users", findAllUsers)
};
export default AuthController;
