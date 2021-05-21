const jwt_secret="DONALDTEGHEN"

if(process.env.NODE_ENV === "production"){
    module.exports = jwt_secret = process.env.JWT_SECRET
}
module.exports = jwt_secret