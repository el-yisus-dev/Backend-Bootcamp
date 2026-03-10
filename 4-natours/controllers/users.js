exports.getAllUsers = async (req, res) => {
        
        res.status(200).json({
            message: "success",
            data: {
                message: "users baby....."
            }
        });
};

exports.createUser = async (req, res) => {
        
        res.status(200).json({
            message: "success",
            data: {
                message: "users baby....."
            }
        });
};

exports.getUserById = async (req, res) => {
    const { id } = req.params;


        res.status(200).json({
            message: "success",
            data: {
                message: "users baby.....",
                id
            }
        });
};

exports.updateUser = async (req, res) => {
        
        res.status(200).json({
            message: "success",
            data: {
                message: "users baby....."
            }
        });
};

exports.deleteUser = async (req, res) => {
        
        res.status(200).json({
            message: "success",
            data: {
                message: "users baby....."
            }
        });
};
