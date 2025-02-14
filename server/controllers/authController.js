const User = require('../models/userModel');
const Mailtoken = require('../models/mailTokenModel');
const crypto = require('crypto')
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthorizedError } = require('../error');
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


module.exports = { register, login, verifyMailtoken };