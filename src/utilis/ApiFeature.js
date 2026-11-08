export default class ApiFeature{
    constructor(mongooseQuery,queryString){
        this.mongooseQuery=mongooseQuery;
        this.queryString=queryString
    }
    pagination(){
        let page=this.queryString.page*1||1
        if(page<=0)page=1
        let skip=(page-1)*4
        this.page=page
        this.mongooseQuery.skip(skip).limit(4)
        return this
    }
    filter(){
        let filetObj={...this.queryString}
        let execludedQuery=["page","sort","fields","keyword"]
        execludedQuery.forEach((q)=>{
              delete filetObj[q]
        })
        filetObj=JSON.stringify(filetObj)
        filetObj=filetObj.replace(/\b(gt|gte|lt|lte)\b/g,(match)=>`$${match}`)
        filetObj=JSON.parse(filetObj)
        this.mongooseQuery.find(filetObj)
        return this

    }
    sort(){
        if(this.queryString.sort){
         let sortBy=this.queryString.sort.split(",").join(" ")
         this.mongooseQuery.sort(sortBy)
        }
        return this
    }
    search(){
        if(this.queryString.keyword){
            this.mongooseQuery.find({
                $or:[{title:{$regex:this.queryString.keyword,$options:"i"}},{description:{$regex:this.queryString.keyword,$options:"i"}}]
            })
        }
        return this
    }
    fields(){
        if(this.queryString.fields){
            let fields=this.queryString.fields.split(",").join(" ")
            this.mongooseQuery.select(fields)
        }
        return this
    }

}