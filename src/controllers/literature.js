const express = require("express");
const { User, Literature } = require("../../models");
const { Op } = require("sequelize");

exports.getAllLiteratur = async (req, res) => {
  try {
    const data = await Literature.findAll({
      include: {
        model: User,
        as: "user",
        attributes: {
          exclude: [
            "createdAt",
            "updatedAt",
            "password",
            "gender",
            "role",
            "avatar",
          ],
        },
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "UserId", "userId"],
      },
    });

    res.send({
      message: "All Literature success loaded",
      data: {
        literature: data,
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

exports.getAllLiteratureByKey = async (req, res) => {
  try {
    const { title } = req.query;
    const returnData = await Literature.findAll({
      where: {
        title: {
          [Op.like]: `%${title}%`,
        },
      },
      include: {
        model: User,
        as: "user",
        attributes: {
          exclude: [
            "createdAt",
            "updatedAt",
            "password",
            "gender",
            "role",
            "avatar",
          ],
        },
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "UserId", "userId"],
      },
      //   where: {
      //     [Op.and]: [
      //       { title: { [Op.like]: `%${title}%` } },
      //       { publication_date: { [Op.like]: `%${publication_date}%` } },
      //     ],
      //   },
    });

    res.send({
      message: `Get all data with title lik ${title}`,
      data: {
        literature: returnData,
      },
    });

    console.log("Key : ", req.query);
    console.log("Isi Data : ", returnData);
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: {
        message: "Server error",
      },
    });
  }
};

exports.getDetailLiterature = async (req, res) => {
  const { id } = req.params;

  try {
    const detail = await Literature.findOne({
      where: {
        id,
      },
      include: [
        {
          model: User,
          as: "user",
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "password",
              "gender",
              "role",
              "avatar",
            ],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "UserId", "userId"],
      },
    });

    res.send({
      message: "Data successfully loaded",
      data: detail,
    });
  } catch (err) {
    res.status(500).send({
      message: "Server error",
    });
  }
};
