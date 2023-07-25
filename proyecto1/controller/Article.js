const { validatorArticle } = require("../helper/validator");
const fs = require("fs");
const path = require("path");
const Article = require("../model/Article");
const prueba = (req, res) => {
  return res.status(200).json({
    messaje: "This is a test",
  });
};
const CreateArticle = (req, res) => {
  let body = req.body;
  try {
    validatorArticle(req, res, body);
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    });
  }
  const article = new Article(body);
  article
    .save()
    .then((savedArticle) => {
      return res.status(200).json({
        message: "Success",
        article: savedArticle,
      });
    })
    .catch((error) => {
      return res.status(400).json({
        message: error.message,
      });
    });
};
const getarticle = (req, res) => {
  Article.find({})
    .then((articles) => {
      if (articles.length === 0) {
        return res.status(404).json({
          status: "error",
          message: "Article not found",
        });
      }
      return res.status(200).json({
        status: "success",
        articles,
      });
    })
    .catch((error) => {
      return res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    });
};
const oneArticle = (req, res) => {
  let id = req.params.id;
  Article.findById(id)
    .then((articles) => {
      if (articles.length === 0) {
        return res.status(404).json({
          status: "error",
          message: "Article not found",
        });
      }
      return res.status(200).json({
        status: "success",
        articles,
      });
    })
    .catch((error) => {
      return res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    });
};
const deleteArticle = (req, res) => {
  let id = req.params.id;
  Article.findByIdAndRemove({ _id: id })
    .then((articles) => {
      if (articles.length === 0) {
        return res.status(404).json({
          status: "error",
          message: "Article not found",
        });
      }
      return res.status(200).json({
        status: "success",
        articles,
      });
    })
    .catch((error) => {
      return res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    });
};
const updateArticle = (req, res) => {
  let id = req.params.id;
  let body = req.body;
  try {
    validatorArticle(req, res, body);
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    });
  }
  Article.findByIdAndUpdate(
    { _id: id },
    body,
    { new: true },
    (err, articleupdate) => {
      if (err || articleupdate) {
        return res.status(404).json({
          status: "err",
          message: err.message,
        });
      }
      return res.status(200).json({
        status: "succes",
        article: articleupdate,
      });
    }
  );
};
const uploadimgan = (req, res) => {
  if (!req.file && !req.files) {
    return res.status(400).json({
      status: "error",
      message: "Invalid request",
    });
  }
  let namefile = req.file.originalname;
  let fileExtensive = namefile.split(".").pop().toUpperCase();
  if (
    fileExtensive !== "PNG" &&
    fileExtensive !== "JPEG" &&
    fileExtensive !== "JPG" &&
    fileExtensive !== "GIF"
  ) {
    fs.unlink(req.file.path, (err) => {
      return res.status(400).json({
        status: "error",
        message: "Invalid file",
      });
    });
  } else {
    let id = req.params.id;
    Article.findByIdAndUpdate(
      { _id: id },
      { imagen: req.file.filename },
      { new: true },
      (err, articleupdate) => {
        if (err || articleupdate) {
          return res.status(404).json({
            status: "err",
            message: err.message,
          });
        }
        return res.status(200).json({
          status: "succes",
          article: articleupdate,
        });
      }
    );
  }
};
const image = (req, res) => {
  let file = req.params.file;
  let routefile = ".*imagene/articulos/" + file;
  fs.stat(routefile, (err, exist) => {
    if (exist) {
      return res.sendFile(path.resolve(routefile));
    } else {
      return res.status(404).json({
        status: "err",
        message: err.message,
      });
    }
  });
};
const search = (req, res) => {
  const searchText = req.params.text;
  Article.find({
    $or: [
      { title: { $regex: searchText, $options: "i" } },
      { content: { $regex: searchText, $options: "i" } },
    ],
  })
    .sort({ date: -1 })
    .exec((err, articles) => {
      if (err || !articles.length) {
        return res.status(404).json({
          status: "error",
          message: "No articles found",
        });
      }
      return res.status(200).json({
        status: "success",
        articles,
      });
    });
};
module.exports = {
  prueba,
  CreateArticle,
  getarticle,
  oneArticle,
  deleteArticle,
  updateArticle,
  uploadimgan,
  image,
  search,
};
