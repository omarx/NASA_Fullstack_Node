const launchesDatabase = require('./launches.mongo');
const planets = require('./planets.mongo');
const DEFAULT_FLIGHT_NUMBER=100;

async function existsLaunchWithId(launchId){
    return launchesDatabase.findOne({
        flightNumber: launchId,
    });
}

async function saveLaunch(launch){
    const planet=await planets.findOne({
        keplerName: launch.target,
    });
  if (!planet){
      throw new Error('No matching planet was found')
  }
    await launchesDatabase.updateOne({
        flightNumber: launch.flightNumber,
    },launch,{
        upsert:true
    })
}
async function getLatestFlightNumber() {
    const latestLaunch = await launchesDatabase
        .findOne()
        .sort('-flightNumber');
    return (!latestLaunch) ? DEFAULT_FLIGHT_NUMBER : latestLaunch.flightNumber;
}

async function abortLaunchById(launchId){
    const aborted= await  launchesDatabase.updateOne({
        flightNumber: launchId,
    }, {
        upcoming: false,
        success: false,
    });
    return aborted.modifiedCount === 1;
}

async function getAllLaunches(){
    return launchesDatabase.find({},{'_id':0,'__v':0});
}
async function scheduleNewLaunch(launch){
    const newFlightNumber= await getLatestFlightNumber()+1;
    const newLaunch = Object.assign(launch,{
        success:true,
        upcoming:true,
        customers:['ZTM','NASA'],
        flightNumber:newFlightNumber,
    })
    await saveLaunch(newLaunch);
}

module.exports={
    getAllLaunches,
    scheduleNewLaunch,
    existsLaunchWithId,
    abortLaunchById,
}