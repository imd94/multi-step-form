const mongoose = require('mongoose');
const validator = require('validator');

const addonSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    price: { 
        type: Number, 
        required: true 
    },
    selected: { 
        type: Boolean, 
        required: false, 
    },
});

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A User must have a name!'],
        trim: true,
        maxlength: [50, 'A name must have less or equal then 50 characters!'],
        minlength: [3, 'A name must have more or equal then 3 characters!']
    },
    email: {
        type: String,
        required: [true, 'A User must have an email!'],
        unique: false,
        trim: true,
        lowercase: true,
        validate: [
            {
                validator: function(value) {
                    return validator.isEmail(value);
                },
                messasge: 'You must provide a valid email address!'
            },
            {
                validator: async function(value) {
                    const count = await mongoose.models.User.countDocuments({ email: value });
                    return count === 0;
                },
                message: 'Email address has already being used!',
            }
        ]
    },
    phone: {
        type: String,
        required: [true, 'A User must have a phone number!'],
        unique: false,
        trim: true,
        maxlength: [15, 'A phone number must have less or equal then 15 characters!'],
        set: function (value) {
            return value.replace(/\s+/g, ''); // This will replace all spaces with an empty string
        },
        validate: [
            {
                validator: function (value) {
                    return value.startsWith('+');
                },
                message: 'Phone number must start with a "+" symbol.',
              },
              {
                validator: function (value) {
                    const sanitizedPhone = value.replace(/\s+/g, '');
                    return validator.isNumeric(sanitizedPhone);
                },
                message: 'Only numbers allowed for phone number format.',
              },
              {
                validator: async function(value) {
                    const sanitizedPhone = value.replace(/\s+/g, '');
                    const count = await mongoose.models.User.countDocuments({ phone: sanitizedPhone });
                    return count === 0;
                },
                message: 'Phone number has already being used!',
            }
        ]
    },
    billing: {
        type: String,
        required: [true, 'A User must choose billing type!'],
        trim: true,
    },
    plan: {
        type: {
            name: {
                type: String,
                required: [true, 'A Plan must have a name!'],
            },
            price: {
                type: Number,
                required: [true, 'A Plan must have a price!'],
            }
        },
        required: [true, 'A Plan must be selected!'],
    },
    addons: {
        type: Map,
        of: addonSchema, // Use the addonSchema for each key
    },
    totalPrice: {
        type: Number,
        required: [true, 'A total price must be calculated!'],
    }
});

const User = new mongoose.model('User', userSchema);

module.exports = User;