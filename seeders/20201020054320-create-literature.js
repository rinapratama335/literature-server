"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "literature",
      [
        {
          title: "Sistem Informasi Keuangan",
          userId: 1,
          publication_date: "2020",
          pages: 2019,
          ISBN: 1296845231098,
          cover: "book-1.png",
          attache: "Sistem Informasi Keuangan.pdf",
        },
        {
          title: "Sistem Informasi OCR",
          userId: 1,
          publication_date: "2020",
          pages: 2019,
          ISBN: 1296845231098,
          cover: "book-2.png",
          attache: "ocr.pdf",
        },
        {
          title: "Sistem Informasi Akuntansi",
          userId: 1,
          publication_date: "2020",
          pages: 2019,
          ISBN: 1296845231098,
          cover: "book-3.png",
          attache: "pspaud.pdf",
        },
        {
          title: "Sistem Informasi Perpustakaan",
          userId: 1,
          publication_date: "2020",
          pages: 2019,
          ISBN: 1296845231098,
          cover: "book-4.png",
          attache: "PLMS.pdf",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("literature", null, {});
  },
};
