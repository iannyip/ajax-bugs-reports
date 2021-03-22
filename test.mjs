import db from './models/index.mjs';

const testFunction = async () => {
  try {
    const newUser = await db.User.create({
      email: 'tim@gmail.com',
      password: 'timpassword',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    console.log(newUser);
  } catch (error) {
    console.log(error);
  }
};

testFunction();
