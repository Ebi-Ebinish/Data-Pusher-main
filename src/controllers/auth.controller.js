const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User,Role } = require('../models');
const { JWT_SECRET, JWT_EXPIRES_IN } = require('../config/app-config');

const generateToken = (user) => {

  return jwt.sign({ id: user.id, email: user.email,role:user.role.role_name }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};

exports.register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const adminRole = await Role.findOne({ where: { role_name: 'Admin' } });
    if (!adminRole) {
      throw new Error('Admin role not found');
    }
    const user = await User.create({ email, password: hashedPassword, role_id: adminRole.id });
  
    res.status(201).json({ success: true, user: { id: user.id, email: user.email,role:adminRole.role_name } });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
      include: [
        {
          model: Role,
          as: 'role',
          attributes: ['role_name'] // adjust as needed
        }
      ]
    });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = generateToken(user);

    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      secure: false, // set true if using HTTPS
    });

    res.json({ success: true, token });
  } catch (err) {
    next(err);
  }
};

exports.logout = (req, res) => {
  res.clearCookie('token');
  res.json({ success: true, message: 'Logged out successfully' });
};
