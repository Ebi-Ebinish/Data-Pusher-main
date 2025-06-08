const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/app-config'); // make sure you have this configured

// middlewares/authorize.js
module.exports = function authorize(allowedRoles = []) {
    return (req, res, next) => {
        const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ success: false, message: 'Token missing or invalid' });
        }
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            req.user = decoded; // Contains { id, email, role } or whatever you included in the token
        } catch (err) {
            console.log('Token verification error:', err);
            return res.status(401).json({ success: false, message: 'Invalid or expired token' });
        }
        // Assuming req.user is set after JWT authentication with user data
        if (!req.user) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }
        console.log('User :', req.user); // Debugging line to check user role
        const userRole = req.user.role; // or req.user.role_id, depending on your user object

        if (!allowedRoles.includes(userRole)) {
            return res.status(403).json({ success: false, message: 'Forbidden: Insufficient permissions' });
        }
        next();
    };
};
