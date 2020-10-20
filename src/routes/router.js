const express = require("express");
const router = express.Router();
const multer = require("multer");

const { auth, authAdmin } = require("../middleware/authentication");

const upload = multer();

var cpUpload = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "file", maxCount: 1 },
]);

const {
  register: registration,
  login,
  checkAuth,
} = require("../controllers/auth");
const { getAllUsers, deleteUser } = require("../controllers/user");

const {
  getAllLiteratur,
  getAllLiteratureByKey,
  getDetailLiterature,
} = require("../controllers/literature");
// const {
//   getAllCategories,
//   getDetailCategory,
//   addCategory,
//   editCategory,
//   deleteCategory,
// } = require("../controllers/category");
// const {
//   getAllBooks,
//   addBook,
//   detailBook,
//   editBook,
//   deleteBook,
//   getAllApprovedBooks,
//   getMyBooks,
// } = require("../controllers/book");
// const {
//   addToMyLibraries,
//   getAllMyLibrary,
//   deleteItemLibrary,
// } = require("../controllers/mylibrary");

router.post("/register", registration);
router.post("/login", login);
router.get("/auth", auth, checkAuth);
router.get("/users", auth, getAllUsers);
router.delete("/user/:id", auth, deleteUser);

router.get("/literature", auth, getAllLiteratureByKey);
router.get("/literatures", auth, getAllLiteratur);
router.get("/literature/:id", auth, getDetailLiterature);
// console.log("Key yang diminta : ", req.query);

// router.get("/categories", auth, getAllCategories);
// router.get("/category/:id", auth, getDetailCategory);
// router.post("/category", auth, authAdmin, addCategory);
// router.patch("/category/:id", auth, authAdmin, editCategory);
// router.delete("/category/:id", auth, authAdmin, deleteCategory);

// router.get("/books", auth, getAllBooks);
// router.get("/approvedBooks", auth, getAllApprovedBooks);
// router.get("/myBooks", auth, getMyBooks);
// // router.post("/book", auth, upload.single("file"), addBook);
// router.post("/book", auth, cpUpload, addBook);
// router.get("/book/:id", auth, detailBook);
// router.patch("/book/:id", auth, authAdmin, editBook);
// router.delete("/book/:id", auth, authAdmin, deleteBook);

// router.post("/mylibrary/:id", auth, addToMyLibraries);
// router.get("/mylibraries", auth, getAllMyLibrary);
// router.delete("/mylibrary/:userId/:bookId", auth, deleteItemLibrary);

module.exports = router;
