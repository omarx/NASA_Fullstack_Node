const request=require('supertest');
const app=require('../../../app');
const {mongoConnect,mongoDisconnect}=require('../../../services/mongo')

describe('Launches API',()=>{
    beforeAll(async ()=>{
       await mongoConnect();
    })
    afterAll(async()=>{
        await mongoDisconnect();
    })
    describe('Test Get /launches',()=>{
        test('It should return 200 success',async ()=>{
            const response= await request(app)
                .get('/launches')
                .expect('Content-Type',/json/)
                .expect(200);
        })
    })


    describe('Test Post /launch',()=>{
        const completeLaunchData={
            mission:'USS Enterprise',
            rocket: "NCC 1701-D",
            target:'Kepler-62 f',
            launchDate:"January 18, 2028"
        }
        const launchDataWithoutDate={
            mission:'USS Enterprise',
            rocket: "NCC 1701-D",
            target:'Kepler-62 f'
        }
        const launchDataWithInvalidDate={
            mission:'USS Enterprise',
            rocket: "NCC 1701-D",
            target:'Kepler-62 f',
            launchDate:"zoot"
        }
        test('It should return 201 created',async ()=>{
            const response= await request(app)
                .post('/launches')
                .send({
                    mission:'USS Enterprise',
                    rocket: "NCC 1701-D",
                    target:'Kepler-62 f',
                    launchDate:"January 18, 2028",
                })
                .expect('Content-Type',/json/)
                .expect(201);
            const requestDate=new Date(completeLaunchData.launchDate).valueOf();
            const responseDate=new Date(response.body.launchDate).valueOf();
            expect(requestDate).toBe(responseDate);

            expect(response.body).toMatchObject(launchDataWithoutDate);
        });
        test('It should catch missing required properties',async ()=>{
            const response=await request(app)
                .post('/launches')
                .send(launchDataWithoutDate)
                .expect('Content-Type',/json/)
                .expect(400)
            expect(response.body).toStrictEqual({
                error:"Missing required launch field"
            })

        });
        test('It should test invalid dates',async ()=>{
            const response=await request(app)
                .post('/launches')
                .send(launchDataWithInvalidDate)
                .expect('Content-Type',/json/)
                .expect(400)
            expect(response.body).toStrictEqual({
                error:"Invalid launch date"
            })

        });

    })
})
