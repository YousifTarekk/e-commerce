import mongoose from "mongoose";
export  async  function connection(){
    await mongoose.connect("mongodb+srv://engmayadaahmedelnagar:mayada2hmed77@cluster0.6565rt8.mongodb.net/Ecommerce")
        .then((res) => console.log(`db connected successfully`))
        .catch((err) => console.log(`db connection failed`, err))
}
