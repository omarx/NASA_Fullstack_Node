const {getAllPlanets} = require('../../models/planets.model');

async function httpGetAllPlanets(req, res){
    try {
        const planets = await getAllPlanets();
        return res.status(200).json(planets);
    } catch (err) {
        // You can decide what status code fits best for your case
        return res.status(500).json({ error: err.toString() });
    }
}

module.exports = {
    httpGetAllPlanets,
};
