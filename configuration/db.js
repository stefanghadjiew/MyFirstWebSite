import dotenv from 'dotenv'
dotenv.config()

const HOST  = process.env.MONGO_HOST
const DB    = process.env.MONGO_DATABASE

export const MONGO_OPTIONS = {
        useNewUrlParser: true ,
        useUnifiedTopology: true , 
        useCreateIndex : true 
}

export const MONGO_URI    = `mongodb://${HOST}/${DB}`
export const MONGO_URI2 = "mongodb+srv://cheffo0o:123smokeweed123@cluster0.qus4z.mongodb.net/MyFirstWebSiteDB?retryWrites=true&w=majority"