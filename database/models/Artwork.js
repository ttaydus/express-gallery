const bookshelf = require("../bookshelf");

class Artwork extends bookshelf.Model {
  get tableName() {
    return "artwork";
  }
  get hasTimestamps() {
    return false;
  }
}

module.exports = bookshelf.model("Artwork", Artwork);
