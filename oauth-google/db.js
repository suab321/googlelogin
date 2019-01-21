const mongoose = require('mongoose');

const db_url = "mongodb://abhi980:suab123@ds026898.mlab.com:26898/fadmits";
mongoose.connect(db_url).catch(err => console.log(err));

const student_schema=new mongoose.Schema({name:String, email:String })
const mentor_schema
const student_model=mongoose.model("google_model",google_schema);
module.exports = {
    database_google:google_model
}