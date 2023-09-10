const User = require('../models/user.model'); // Import the User model
const Coupon = require('../models/coupon.model'); // Import the Coupon model
const Booking = require('../models/booking.model'); // Import the Booking model
const uuidv4 = require('uuidv4');
const { v4: uuidv4 } = require('uuid');
const uuidTokenGenerator = require('uuid-token-generator');
const tokenGenerator = new uuidTokenGenerator();

// Controller function to create a new user and save it in the USER schema
exports.signUp = (req, res) => {
    const { first_name, last_name } = req.body;

    // Create a unique username using first_name and last_name
    const username = `${first_name}_${last_name}`;

    // Generate a UUID for the user
    const userId = uuidv4();

    // Generate an access token
    const accessToken = tokenGenerator.generate();

    // Create a new user object
    const newUser = new User({
        user_id: userId,
        username,
        access_token: accessToken,
        isLoggedIn: true, // Assuming the user is logged in during signup
    });

    // Save the user to the USER schema
    newUser
        .save()
        .then((user) => {
            res.json(user);
        })
        .catch((err) => {
            res.status(500).json({ message: err.message });
        });
};

// Controller function to check if the entered username and password match the data in the USER schema
exports.login = (req, res) => {
    const { username } = req.body;

    // Assuming you have a password field in your User model and you check the password here

    // Find the user by their username
    User.findOne({ username })
        .then((user) => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            user.isLoggedIn = true;
            user.save();

            res.json({ message: 'Login successful', user });
        })
        .catch((err) => {
            res.status(500).json({ message: err.message });
        });
};

// Controller function to log out a user based on their unique ID
exports.logout = (req, res) => {
    const { userId } = req.params;

    // Find the user by their ID
    User.findOne({ user_id: userId })
        .then((user) => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Set isLoggedIn to false to log the user out
            user.isLoggedIn = false;
            user.save();

            res.json({ message: 'Logout successful' });
        })
        .catch((err) => {
            res.status(500).json({ message: err.message });
        });
};

// Controller function to get a coupon code
exports.getCouponCode = (req, res) => {

    const couponCode = generateCouponCode(); // Implement this function as needed

    res.json({ couponCode });
};

// Controller function to book a show
exports.bookShow = (req, res) => {
    const { userId } = req.params;
    const { showId, numberOfTickets, couponCode } = req.body;

    // Validate coupon code if provided
    if (couponCode) {
        // Check if the coupon code is valid
        Coupon.findOne({ code: couponCode })
            .then((coupon) => {
                if (!coupon) {
                    return res.status(400).json({ message: 'Invalid coupon code' });
                }

                const discountedPrice = applyCouponDiscount(coupon, numberOfTickets); // Implement this function as needed

                // Create a new booking
                const newBooking = new Booking({
                    user_id: userId,
                    show_id: showId,
                    number_of_tickets: numberOfTickets,
                    total_price: discountedPrice, // Use the discounted price
                });

                // Save the booking
                newBooking
                    .save()
                    .then((booking) => {
                        res.json({ message: 'Booking successful', booking });
                    })
                    .catch((err) => {
                        res.status(500).json({ message: err.message });
                    });
            })
            .catch((err) => {
                res.status(500).json({ message: err.message });
            });
    } else {
        // Create a new booking without a coupon
        const newBooking = new Booking({
            user_id: userId,
            show_id: showId,
            number_of_tickets: numberOfTickets,
            // Calculate the total price without a coupon
            total_price: calculateTotalPrice(numberOfTickets), 
        });

        // Save the booking
        newBooking
            .save()
            .then((booking) => {
                res.json({ message: 'Booking successful', booking });
            })
            .catch((err) => {
                res.status(500).json({ message: err.message });
            });
    }
};

// Helper function to generate a coupon code
function generateCouponCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let couponCode = '';
    for (let i = 0; i < 8; i++) {
        couponCode += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return couponCode;
}

// Helper function to apply coupon discount 
function applyCouponDiscount(coupon, numberOfTickets) {
    const discountPercentage = coupon.discountPercentage || 0;
    const ticketPrice = 10; // Replace with the actual ticket price
    const totalPrice = numberOfTickets * ticketPrice;
    const discountAmount = (discountPercentage / 100) * totalPrice;
    return totalPrice - discountAmount;
}

// Helper function to calculate total price 
function calculateTotalPrice(numberOfTickets) {
    const ticketPrice = 10; // Replace with the actual ticket price
    return numberOfTickets * ticketPrice;
}