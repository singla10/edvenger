// backend/controllers/authController.js
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Register (Sign Up)


 export const register = async (req, res) => {
    console.log('Register request body:', req.body); 
  try {
    const { name, email, password, role, instituteName } = req.body;

    // 🚫 Block admin registration through public
    if (role === 'admin') {
      return res.status(403).json({ message: 'You are not authorized to register as admin' });
    }

     if (req.body.role === 'institute' && !req.body.instituteName) {
    return res.status(400).json({ error: 'Institute name is required for institute role.' });
  }

    // ✅ Validate email and password
    if (!email || !password || !role) {
      return res.status(400).json({ message: 'Email, password, and role are required' });
    }

     if (role === 'institute') {
      if (!instituteName) {
        return res.status(400).json({ message: 'Institute name is required for institute role' });
      }
    } else {
      if (!name) {
        return res.status(400).json({ message: 'Name is required for student and teacher roles' });
      }
    }

    // // ✅ Check for name conditionally
    // if (role !== 'institute' && !name) {
    //   return res.status(400).json({ message: 'Name is required for student and teacher roles' });
    // }

    // ✅ Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered' });
    }

    const userData = {
  email,
  password,
  role,
};
if (role === 'institute') {
  userData.instituteName = instituteName;
} else {
  userData.name = name;
}


    // ✅ Create user
    const newUser = await User.create({
      name: role === 'institute' ? undefined : name,
      email,
      password,
      role,
      instituteName: role === 'institute' ? instituteName : undefined
    });

    // ✅ Generate token
    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'Registration successful',
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        instituteName: newUser.instituteName || null
      },
      token
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


// Login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user)
      return res.status(400).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Login error', error: err.message });
  }
};

