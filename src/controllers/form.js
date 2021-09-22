const { validationResult } = require("express-validator");
const FormPost = require("../models/form");

exports.createFormPost = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new Error("Input Value Tidak Sesuia");
    err.errorStatus = 400;
    err.data = errors.array();
    throw err;
  }

  const nim = req.body.nim;
  const nama_depan = req.body.nama_depan;
  const nama_belakang = req.body.nama_belakang;
  const email_1 = req.body.email_1;
  const email_2 = req.body.email_2;
  const password = req.body.password;
  const jenis_email = req.body.jenis_email;
  const no_hp = req.body.no_hp;

  const Posting = new FormPost({
    nim: nim,
    nama_depan: nama_depan,
    nama_belakang: nama_belakang,
    email_1: email_1,
    email_2: email_2,
    password: password,
    jenis_email: jenis_email,
    no_hp: no_hp,
    setuju: false,
    pesan: "Proses...",
  });

  Posting.save()
    .then((result) => {
      res.status(201).json({
        message: "Create Form Post Succes",
        data: result,
      });
    })
    .catch((err) => {
      console.log("err", err);
    });
};

exports.getAllFormPost = (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = req.query.perPage || 10;
  let totalItems;

  FormPost.find()
    .countDocuments()
    .then((count) => {
      totalItems = count;
      return FormPost.find()
        //.skip((parseInt(currentPage) - 1) * parseInt(perPage))
        //.limit(parseInt(perPage));
    })
    .then((result) => {
      res.status(200).json({
        message: "Data Form post Berhasil dipanggil",
        data: result,
        total_data: totalItems,
        per_page: parseInt(perPage),
        curent_page: parseInt(currentPage),
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getFormPostById = (req, res, next) => {
  const postId = req.params.postId;
  FormPost.findById(postId)
    .then((result) => {
      if (!result) {
        const error = new Error("Form Post Tidak ditemukan");
        error.status = 404;
        throw error;
      }

      res.status(200).json({
        message: "Data Form Post Berhasil dipanggil",
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getFormPostByRequest = (req, res, next) => {
  // const postId = req.params.postId;
  let totalItems;

  FormPost.find({ "pesan": "Proses..." })
    .countDocuments()
    .then((count) => {
      totalItems = count;
      return FormPost.find({ "pesan": "Proses..." });
    })
    .then((result) => {
      res.status(200).json({
        message: "Data Request Berhasil dipanggil",
        data: result,
        total_data: totalItems,
      });
    })
    .catch((err) => {
      next(err);
    });

};

exports.updateFormPost = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new Error("Input Value Tidak Sesuia");
    err.errorStatus = 400;
    err.data = errors.array();
    throw err;
  }

  const setuju = req.body.setuju;
  const pesan = req.body.pesan;
  const postId = req.params.postId;

  FormPost.findById(postId)
    .then((post) => {
      if (!post) {
        const err = new Error("Form Post Tidak ditemukan");
        err.errorStatus = 404;
        throw err;
      }

      post.setuju = setuju;
      post.pesan = pesan;

      return post.save();
    })
    .then((result) => {
      res.status(200).json({
        message: "Update Form Berhasil",
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteFormPost = (req, res, next) => {
  const postId = req.params.postId;

  FormPost.findById(postId)
    .then((post) => {
      if (!post) {
        const err = new Error("Form Post Tidak ditemukan");
        err.errorStatus = 404;
        throw err;
      }

      return FormPost.findByIdAndRemove(postId);
    })
    .then((result) => {
      res.status(200).json({
        message: "Berhasil Hapus Post",
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};
