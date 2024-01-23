

const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const morgan = require('morgan')
const dotenv  = require('dotenv')
const detailDb = require('./models/detailSchema')
const headerDb = require('./models/headerSchema')


const app =express()

dotenv.config();
connectDB();
app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use('/header',async(req,res)=>{
    try{
        console.log(',,,,,,,,,,,,',req.body);
        const exist = await headerDb.find({ vrNo: req.body.vrNo });
        if(exist){
            const details = await detailDb.find({vrNo:req.body.vrNo})
            console.log(details,'pppppppppppppppppppppp');
            res.status(200).json({details})
        }else{
            Object.assign(req.body);
            const car = await headerDb.create(req.body);
            console.log(car);
            res.status(200).json({})
        }

    }catch{

    }
   
})

app.use('/saveDetails',async(req,res)=>{
    try{
        const details =  req.body.details
        console.log(req.body,',,',req.body.vrNo);
        console.log(Object.keys(details[details.length-1]),'pppp');
        if(Object.keys(details[details.length-1]).length !==6){
               details.pop()
        }
        console.log(details,'lll');

        for (const obj of details) {
            console.log(obj,'ooooo');
            Object.assign(obj, { vrNo: req.body.vrNo });
            console.log(obj);
            await detailDb.create(obj).then((re)=>{
                console.log(re,'ppppppppp');
            })
           
        }
        const oldDetails = await detailDb.find({vrNo:req.body.vrNo})
        res.status(200).json({details:oldDetails})

    }catch(e){

    }
})


app.listen(4000,(err)=>{
    console.log('somthing wrong ',err);
})