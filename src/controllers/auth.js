const express = require("express");
const { User } = require("../../models");

// Encript with bcrypt
const bcrypt = require("bcrypt");

//Make token for auth
const jwt = require("jsonwebtoken");

//Key for decrypt jwt token
const jwtKey = process.env.JWT_KEY;

//Import hapy joy for validation
const joi = require("@hapi/joi");

exports.checkAuth = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.user.id, //req user didapat dari middleware authentication saat user berhasi login, token adalah id dari user yang login tersebut
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });

    res.send({
      message: "User valid",
      data: {
        user,
      },
    });
  } catch (err) {
    console.log(err);

    res.status(500).send({
      error: {
        message: "Server error",
      },
    });
  }
};

//Register function
exports.register = async (req, res) => {
  try {
    const {
      email,
      password,
      fullName,
      phone,
      gender,
      address,
      role,
    } = req.body;
    const schema = joi.object({
      email: joi.string().email().min(13).required(),
      password: joi.string().min(8).required(),
      fullName: joi.string().min(3).required(),
      gender: joi.required(),
      phone: joi.number().required(),
      address: joi.required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).send({
        error: {
          message: error.details[0].message,
        },
      });
    }

    //Check if email already exist
    const checkEmail = await User.findOne({
      where: {
        email: email,
      },
    });

    //If email already exist
    if (checkEmail) {
      return res.status(400).send({
        error: "Email already exist",
      });
    }

    //Create salt strength
    const saltStrength = 10;

    //Encrypt password
    const hashedPassword = await bcrypt.hash(password, saltStrength);

    // Create user
    const user = await User.create({
      email,
      password: hashedPassword,
      fullName,
      gender,
      phone,
      address,
      role: "user",
    });

    //Create JWT token after register success
    const token = jwt.sign(
      {
        id: user.id,
      },
      jwtKey
    );

    //Send data with JWT token
    res.send({
      message: "Success register",
      data: {
        user: {
          email: user.email,
          fullName: user.fullName,
          role: user.role,
          token: token,
        },
      },
    });
  } catch (err) {
    res.status(500).send({
      error: {
        message: "Server error",
      },
    });

    console.log(err);
  }
};

//Login function
exports.login = async (req, res) => {
  try {
    // Get email and password from body
    const { email, password } = req.body;

    // Validation
    const schema = joi.object({
      email: joi.string().email().min(13).required(),
      password: joi.string().min(8).required(),
    });

    // List errors / errors from the form into the error variable
    const { error } = schema.validate(req.body);

    // Show error
    if (error) {
      return res.status(400).send({
        error: {
          message: error.details[0].message,
        },
      });
    }

    // Looking for whether the email entered by the user is in the database or not
    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    //If the email doesn't exist, issue an error
    if (!user) {
      return res.status(400).send({
        error: "Email or password is invalid",
      });
    }

    // Compare password from user input with password in the database
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).send({
        error: "Email or password is invalid",
      });
    }

    // When logged in successfully, create a new token
    const token = jwt.sign(
      {
        id: user.id,
      },
      jwtKey
    );

    // Send respon success logged in
    res.send({
      message: "Login successfully",
      data: {
        user: {
          email: user.email,
          fullName: user.fullName,
          role: user.role,
          token: token,
        },
      },
    });
  } catch (err) {
    res.status(500).send({
      error: {
        message: "Server error",
      },
    });

    console.log(err);
  }
};

exports.cekAuth = async (req, res) => {
  console.log(req.user.id);

  try {
    const user = await User.findOne({
      where: {
        id: req.user.id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "categoryId", "password"],
      },
    });
    res.status(200).send({
      data: user,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
