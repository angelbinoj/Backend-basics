import { NotFoundError, sendSuccess } from "../middlewares/errorMiddlewares.js";
import { Case, Customer } from "../models/crmModel.js";

// List all cases
export const getCase = async (req, res) => {
 try {
     const cases = await Case.find();
     if(cases.length===0){
         throw new NotFoundError("No cases reported!")
     }
     sendSuccess(res, cases);
 
   } catch (err) {
      res.status(400).json({
             success:false,
             message:"Failed to fetch case list",
             error:err.message
         });
 }
};

//  Report a new case
export const addCase = async (req, res) => {
  try {
    const { title, description, priority, status,customerId} = req.body;
    
    let customer = null;
    if (customerId) {
      customer = await Customer.findById(customerId);
      if (!customer) {
        return res.status(404).json({ success: false, message: "Customer ID not found" });
      }
    }

    const user=req.user.username;
    const newCase = new Case({
      title,
      description,
      priority,
      status,
      assignedTo: {user}, 
      customerId: customer ? customer._id : null
    });

    await newCase.save();
   return res.json({success:true,message:"new case reported successfully", newCase:newCase});
         
  } catch (error) {
    res.status(400).json({
             success:false,
             message:"Failed to report case",
             error:error.message
         });
  }
};

// Get a case by ID
export const getCaseById = async (req, res) => {
  try {
    const getCase = await Case.findById(req.params.id);
    if (!getCase) {
       throw new NotFoundError("No cases found")
    }
    sendSuccess(res, getCase);
  } catch (error) {
    res.status(500).json({
            success:false,
            message:"Failed to find case",
            error:error.message
        });
  }
};

// Update case by Id
export const updateCaseById = async (req, res) => {
  try {
    const updatedCase = await Case.findByIdAndUpdate(
        req.params.id ,
        { $set: req.body },
        { new: true });
     if(!updatedCase){
                throw new NotFoundError("Case not found!")
            }
        res.json({message:"Case updated successfully",case:updatedCase});
        
    } catch (error) {
          res.status(500).json({
            success:false,
            message:"Failed to update case",
            error:error.message
        });
    }
};
