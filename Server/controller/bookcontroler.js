
const Book = require("../models/book");
const RegexEscape = require("regex-escape");

exports.index = async function (req, res) {
  console.log(res.connection.localAddress);
};

exports.create_book = async function (req, res) {
  try {
    let data = req.body;
    data.userId = req.user._id
    const book = new Book(req.body);

    await book.save();
    res.status(201).send({ statusCode: 201, Book, message: "Book added" });
  } catch (e) {
    console.log(e)
    res.status(400).send({ statusCode: 400, error: e });
  }
};

exports.edit_book = async function (req, res) {

  try {
    Book.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true }, (err, doc) => {
      if (err) {
        console.log("Something wrong when updating data!");
      }
      res.send({ statusCode: 200, message: "Book updated" });
    });

  } catch (e) {
    res.status(400).send({ statusCode: 400, error: e });
  }
};

/*
 */



exports.deletedBook = async function (req, res) {
  try {
    const book = await Book.findOne({

      _id: req.params.id,
    })

    if (!book) {
      throw new Error("No Such Book");
    }


    await book.remove();
    res.send({ statusCode: 200, meaasge: "Book deleted" });
  } catch (error) {
    res.status(400).send({ statusCode: 400, error: error.message });
  }
};




exports.view_book = async function (req, res) {
  let book = await Book.findOne({ _id: req.params.id })

  res.status(200).send({ statusCode: 200, book });
};


exports.list_book = async function (req, res) {
  try {
    console.log(req.user)
    const limit = parseInt(req.query.limit) || 50;
    const page = parseInt(req.query.page) || 1;
    let findFilter = { userId: req.user._id }
    if (req.query.q) {
      let search = [
        {
          title: {
            $regex: RegexEscape(req.query.q),
            $options: "i",
          },
        }, {
          author: {
            $regex: RegexEscape(req.query.q),
            $options: "i",
          },
        }
      ];

      findFilter = { ...findFilter, $or: search };
    }

    console.log(findFilter)

    Book.countDocuments(findFilter, async function (err, count) {
      console.log(count)
      if (!err) {
        const books = await Book.find(findFilter)
          .lean()
          .sort({ name: 1 })
          .limit(limit)
          .skip(page - 1);



        return res.status(200).send({
          statusCode: 200,
          books,
          total: count,
          limit,
          page,
        });
      }
    });
  } catch (e) {
    console.log(e)
    res.status(500).send({ statusCode: 500, e });
  }
};
