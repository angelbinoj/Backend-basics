import mongoose, {Schema} from "mongoose";


//creating User model
const UserSchema= new mongoose.Schema({
    username:{
        type:String,required:true,unique:true
    },
    email:{
        type:String,required:true
    },
    password: { type: String, required: true },
    phone: {type:Number,required: true },
    role: { type: String, enum: ['admin','user'], default: 'user' }
},{timestamp:true});

//creating Customer model
const CustomerSchema= new mongoose.Schema({
    name: { type: String, required: true },
  contactInfo: {
    email:{type:String,required: true },
    phone: {type:String,required: true },
    age: {type:Number,required: true }
  },
  status: { type: String, enum: ['active','inactive','pending'], default: 'pending' },
  createdBy: { type: mongoose.Schema.Types.Object, ref: 'User' }
},{timestamp:true});

//creating Case model
const CaseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: {type: String},
  priority: { type: String, enum: ['low','medium','high'], default: 'medium' },
  status: { type: String, enum: ['open','in_progress','closed'], default: 'open' },
  assignedTo: { type: mongoose.Schema.Types.Object, ref: 'User' },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' }
}, { timestamps: true });


export const User = mongoose.model('User',UserSchema)
export const Customer = mongoose.model('Customer',CustomerSchema)
export const Case = mongoose.model('Case',CaseSchema)