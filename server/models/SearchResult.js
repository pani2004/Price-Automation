import mongoose,{Schema} from 'mongoose';

const SearchResultSchema = new Schema({
    query:{
        type:String,
        required:true
    },
    title:{
        type:String
    },
    snippet:{
        type:String,
    },
    cacheId:{
        type:String
    },
    link:{
        type:String
    }

},{timestamps:true});

export const SearchResult = mongoose.model('SearchResult',SearchResultSchema);