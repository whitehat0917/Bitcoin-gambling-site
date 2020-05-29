module.exports.testConnection = async function(req, res) {
    try {
        console.log("testController-201", req);
        res.status(201).json({success: true});
    } catch(error) {
        console.log("testController-401", error);
        res.status(401).json({success: false, error: error});
    }
}