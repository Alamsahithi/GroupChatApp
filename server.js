const express = require('express');
const bcrypt = require('bcrypt');
const User = require('./models/user'); // Assuming your user model is in a separate file

const app = express();
const port = 3000;

app.use(express.json());

app.post('C:/sahithi/GroupChatApp/signup.html', async (req, res) => {
  const { name, email, phone, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user record and save it to the database
    await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    // Return success response
    res.status(200).json({ message: 'User created successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
