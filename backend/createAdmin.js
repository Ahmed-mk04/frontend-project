const mongoose = require('mongoose');
const Admin = require('./models/Admin');
require('dotenv').config();

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/edulearn');
        console.log('MongoDB Connected');

        const adminExists = await Admin.findOne({ email: 'Admin@gmail.com' });
        if (adminExists) {
            console.log('Admin already exists');
            process.exit(0);
        }

        const admin = await Admin.create({
            firstName: 'admin',
            lastName: 'mk',
            email: 'Admin@gmail.com',
            password: 'AdminAdmin', // Will be hashed by pre-save hook
            role: 'admin'
        });

        console.log('Admin created successfully:', admin);
        process.exit(0);
    } catch (error) {
        console.error('Error creating admin:', error);
        process.exit(1);
    }
};

createAdmin();
