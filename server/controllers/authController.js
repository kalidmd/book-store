const User = require('../models/userModel');
const Mailtoken = require('../models/mailTokenModel');
const crypto = require('crypto')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthorizedError, NotFoundError } = require('../error');
const sendMail = require('../utils/sendMail');
const getBaseURL = require('../utils/baseURL');

// Register a new user
const register = async (req, res) => {
    const { email } = req.body;

    const user = await User.create({...req.body});
    user.createJWT();

    if(!email) {
        throw new BadRequestError('Please Provide Email!');
    }
    
    const MailToken = await Mailtoken.create({
        userId: user._id,
        mailToken: crypto.randomBytes(32).toString('hex')
    })

    const url = `${getBaseURL()}/users/${user._id}/verify/${MailToken.mailToken}`;
    
    try {
        await sendMail(email, url);
        console.log('Email Send Successfully! Register');
        return res.status(StatusCodes.CREATED).json({msg: `An email is sent to ${email}, Please verify your account.`})
        
    } catch (error) {
        console.log(error);
        await User.deleteOne({email: email});
        throw new BadRequestError('Registration error, Please try again.')

    } 
    
}

// Login User
const login = async (req, res) => {
    const { email, password } = req.body;
    
    if(!email) {
        throw new BadRequestError('Please Provide Email!');
    }

    if(!password) {
        throw new BadRequestError('Please Provide Password');
        
    }

    const user = await User.findOne({ email: email });
    
    if(!user) {
        throw new UnauthorizedError('Invalid Credentials');
    }

    if (!user.verified) {
        let mailToken = await Mailtoken.findOne({ userId: user._id });

        if (!mailToken) {
            mailToken = await Mailtoken.create({
                userId: user._id,
                mailToken: crypto.randomBytes(32).toString('hex')
            })

            const url = `${getBaseURL()}/users/${user._id}/verify/${mailToken.mailToken}`;
            
            // await sendMail(email, url);
            try {
                await sendMail(email, url);
                console.log('Email Send Successfully! Login');
                return res.status(StatusCodes.CREATED).json({msg: `An Email is sent to ${email}, Please Verify from Login`})
                
            } catch (error) {
                console.log(error);
                throw new BadRequestError('Login error, Please try again.')
            }
        }
        
        return res.status(StatusCodes.CREATED).json({msg: 'Verify your email before login.'})
    }
    
    const isPasswordCorrect = await user.comparePassword(password);
    if(!isPasswordCorrect) {
        throw new UnauthorizedError('Invalid Credentials');
    }

    const token = await user.createJWT();

    return res.status(StatusCodes.OK).json({ user, token })
}

// Verify Email
const verifyMailtoken = async (req, res) => {
    const user = await User.findOne({ _id: req.params.id });

    if (!user) {
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Invalid Link' }); 
    } 

    const mailToken = await Mailtoken.findOne({ 
        userId: user._id, 
        mailToken: req.params.mailToken 
    });

    if (!mailToken) {
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Invalid Link' });
    }

    await user.updateOne({ _id: user._id, verified: true });

    res.status(StatusCodes.OK).json({ msg: 'Email Verified Successfully' })
}


const signinWithGoogle = async (req, res) => {
    const { username, email } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });

    if (!user) {
        // Create new user
        user = new User({
            username,
            email,
            verified: true,
            password: email + username
        });
   
        await user.save();
        
        const token = user.createJWT();

        return res.status(StatusCodes.CREATED).json({ user, token, msg: 'User Created' })
    } else {
        const token = user.createJWT();

        return res.status(StatusCodes.FORBIDDEN).json({ token , msg: 'User Already Exists' })

    }   
}

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email })

    if (!user) {
        throw new NotFoundError('User doesn\'t exist!')
    }

    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRECT, {expiresIn: '30m'})

    const url = `${getBaseURL()}/reset-password/${user._id}/${token}`;
    
    try {
        await sendMail(email, url);
        console.log('Email Send Successfully! Forgot Password');
        return res.status(StatusCodes.CREATED).json({response: `An Email is sent to ${email}, Reset your password.`})
        
    } catch (error) {
        console.log(error);
        throw new BadRequestError('Something went wrong, Please try again.')
    }
}

const resetPassword = async (req, res) => {
    const {id, token} = req.params;
    const {password} = req.body;

    if (!password) {
        throw new BadRequestError('Please provide password');
    }

    const user = await User.findOne({ _id: id });

    if (!user) {
        throw new NotFoundError("user doesn't exist!");
    }
    
    jwt.verify(token, process.env.JWT_SECRECT)

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    
    await user.updateOne({ _id: id, password: hashed  })
        
    res.status(StatusCodes.OK).json({ successResponse: 'Password Updated' });
}

module.exports = { register, login, verifyMailtoken, signinWithGoogle, forgotPassword, resetPassword };