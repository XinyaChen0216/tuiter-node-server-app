// import posts from "./tuits.js";
// let tuits = posts;
import * as tuitsDao from './tuits-dao.js'

let newTuitTemplate = {
    topic: "NASA",
    username: "Nasa",
    handle: "@nasa",
    time: "0h",
    image: "nasa.png",
    title: "NASA",
    tuit: "",
    dislike: 0,
    replies: 0,
    retuits: 0,
};

const createTuit = async (req, res) => {
    const newTuit = req.body;
    newTuit.likes = 0;
    newTuit.liked = false;
    const insertedTuit = await tuitsDao.createTuit(newTuit);
    res.json(insertedTuit);
}
const findTuits = async (req, res) => {
    const tuits = await tuitsDao.findTuits()
    res.json(tuits);
}
const updateTuit = async (req, res) => {
    // const tuitdId = req.params.tid;
    // const updates = req.body;
    // const tuitIndex = tuits.findIndex((t) => t._id === tuitdId)
    // tuits[tuitIndex] = { ...tuits[tuitIndex], ...updates };
    // res.sendStatus(200);
    const tuitdIdToUpdate = req.params.tid;
    const updates = req.body;
    const status = await tuitsDao
        .updateTuit(tuitdIdToUpdate, updates);
    res.json(status);
}
const deleteTuit = async (req, res) => {
    const tuitdIdToDelete = req.params.id;
    const status = await tuitsDao.deleteTuit(tuitdIdToDelete)
    res.json(status);
}

export default (app) => {
    app.post('/api/tuits', createTuit);
    app.get('/api/tuits', findTuits);
    app.put('/api/tuits/:tid', updateTuit);
    app.delete('/api/tuits/:tid', deleteTuit);
}
