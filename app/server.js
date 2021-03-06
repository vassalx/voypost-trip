import { ApolloServer } from 'apollo-server'
import mongoose from 'mongoose'
import Trips from './data-sources/Trips'
import TripsModel from './models/trip.model'
import MapBoxAPI from './data-sources/mabpox-api'
import dbConfig from './config/db.config'
import typeDefs from './typedefs'
import resolvers from './resolvers'

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to the MongoDB!")
}).catch(err => {
    console.log("Cannot connect to the MongoDB!", err)
    process.exit()
})

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => {
        return {
            trips: new Trips(TripsModel),
            mapBoxAPI: new MapBoxAPI()
        }
    },
    tracing: true
})

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`)
})