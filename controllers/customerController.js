import { NotFoundError, sendSuccess } from "../middlewares/errorMiddlewares.js";
import { Customer } from "../models/crmModel.js";

//controller to get customer list
export const getCustomer = async (req, res) => {
  try {
    const customers = await Customer.find();
    if(customers.length===0){
        throw new NotFoundError("No customer found!")
    }
    sendSuccess(res, customers);

  } catch (err) {
     res.status(400).json({
            success:false,
            message:"Failed to fetch customer list",
            error:err.message
        });
}
};

//controller to add customer
export const addCustomer = async (req, res) => {
 try {
         const {name,email,phone,age,status} = req.body;
         const isUserExit= await Customer.findOne({ email : email , name : name});
         if(isUserExit){
            return res.status(400).json({
                success:false,
                message:'User already exists'
            })
         }
         const user=req.user.username;
         const customer = new Customer({name,contactInfo: {email,phone,age},createdBy:{user},status});
         await customer.save();
         return res.json({success:true,message:"new customer added successfully", newCustomer:customer});
         
     } catch (error) {
         res.status(400).json({
             success:false,
             message:"Failed to add customer",
             error:error.message
         });
     }
};

//controller to find customer by Id
export const getCustomerById=async(req,res)=>{
    try {
        const customer=await Customer.findById(req.params.id);
         if(!customer){
                throw new NotFoundError("Customer not found!")
            }
        sendSuccess(res, customer);
        
    } catch (error) {
          res.status(500).json({
            success:false,
            message:"Failed to find customer",
            error:error.message
        });
    }
}

//controller to update customer
export const updateCustomerById=async(req,res)=>{
    try {
        const updatedCustomer=await Customer.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
        { new: true }
        );
         if(!updatedCustomer){
                throw new NotFoundError("Customer not found!")
            }
        res.json({message:"Customer updated successfully",customer:updatedCustomer});
        
    } catch (error) {
          res.status(500).json({
            success:false,
            message:"Failed to update customer",
            error:error.message
        });
    }
}

//controller to delete posts
export const deleteCustomer=async(req,res)=>{
    try {
        const deletedCustomer= await Customer.findByIdAndDelete(req.params.id);
        if(!deletedCustomer){
           throw new NotFoundError("Customer not found!");
        }
        res.json({success:true,message:`Post with id-${req.params.id} deleted successfully`});
    } catch (error) {
         res.status(500).json({
            success:false,
            message:"Failed to delete customer",
            error:error.message
        });
    }
}
