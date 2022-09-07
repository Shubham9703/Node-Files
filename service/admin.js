const admin=require("../Models/admin");




const checkAdmin = (criteria) =>
new Promise((reslove, reject) => {
    admin.findOne({ where:criteria, raw: true })
        .then(client => reslove(client))
        .catch(err => reject(err));
})

module.exports = {
checkAdmin:checkAdmin
}