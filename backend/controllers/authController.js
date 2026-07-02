const db = require("../config/db");
const bcrypt = require("bcrypt");

// Signup Controller
const signup = async (req, res) => {

    try {

        const { name, email, password } = req.body;

        // Check if all fields are entered
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Please fill all fields"
            });
        }

        // Check if email already exists
        db.query(
            "SELECT * FROM users WHERE email = ?",
            [email],
            async (err, result) => {

                if (err) {
                    return res.status(500).json(err);
                }

                if (result.length > 0) {
                    return res.status(400).json({
                        message: "Email already exists"
                    });
                }

                // Encrypt Password
                const hashedPassword = await bcrypt.hash(password, 10);

                // Save User
                db.query(
                    "INSERT INTO users(name,email,password) VALUES(?,?,?)",
                    [name, email, hashedPassword],
                    (err) => {

                        if (err) {
                            return res.status(500).json(err);
                        }

                        res.status(201).json({
                            message: "User Registered Successfully"
                        });

                    }
                );

            }
        );

    }

    catch (error) {

        res.status(500).json(error);

    }

};

module.exports = {
    signup
};