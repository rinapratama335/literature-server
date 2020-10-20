const express = require("express");
const { User } = require("../../models");

exports.getAllUsers = async (req, res) => {
  try {
    const usersData = await User.findAll({
      attributes: {
        exclude: ["role", "createdAt", "updatedAt"],
      },
    });

    res.send({
      message: "Users successfully loaded",
      data: {
        users: usersData,
      },
    });
  } catch (err) {
    console.log(err);

    res.status(500).send({
      message: "Sever error",
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;

    await User.destroy({
      where: {
        id,
      },
    });

    res.send({
      id: id,
    });
  } catch (err) {
    res.status(500).send({
      message: "Server error",
    });
  }
};
