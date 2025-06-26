

const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
const app=express()
const PORT=3000;
app.use(express.json());
app.use(cors())
mongoose.connect("mongodb+srv://dharsans23ece:<dharsans>@cluster0.xevzh59.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>console.log("MongoDB connected"))
.catch((err)=>console.error(err))

const expenseSchema=new mongoose.Schema(
    {
        title:String,
        amount:Number,
    }
);
const Expense=mongoose.model("Expense",expenseSchema);
//route
app.get("/api/expenses",async(req,res)=>{
    const expenses=await Expense.find();
    res.json(expenses);
});
app.post("/api/expenses",async(req,res)=>
{
    const {title,amount}=req.body;
    const newExpense=new Expense({title,amount })
        await newExpense.save();
        res.status(201).json(newExpense);
});

app.delete("/api/expenses/:id", async(req,res)=>
{
    try{
        const {id}=req.params;
        const deletedExpense =await Expense.findByIdAndDelete(id);

        if(!deletedExpense)
        {
            return res.status(404).json({message:"Expense not found"})
        }
        res.json({message:"Deleted",deleted:deletedExpense});
    }
        catch(error)
        {
            console.error("Error deleting expense:",error.message);
        res.status(500).json({message:"Server error"});
    }
    
});

app.listen(PORT,()=>console.log(`Server is running on http://localhost:${PORT}`))
