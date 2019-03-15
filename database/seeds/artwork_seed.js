exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("artwork")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("artwork").insert([
        {
          author: "Dr.Doom",
          url:
            "https://cafart.r.worldssl.net/images/Category_17127/subcat_49289/Felipe_FF.JPG",
          description:
            "The Fantastic Four with Dr.Doom, Silver Surfer, and Galactus "
        },
        {
          author: "Peter Parker",
          url:
            "https://wallup.net/wp-content/uploads/2016/01/45493-Spider-Man-comic_art-comics-superhero-Marvel_Comics-748x421.jpg",
          description: "Spiderman scales a skyscraper"
        },
        {
          author: "Alfred",
          url:
            "https://cafart.r.worldssl.net/images/Category_40619/subcat_191964/UvD1nEUr_0108181126051gpadd.jpg",
          description: "Batman and the Joker entangled in eternal combat"
        }
      ]);
    });
};
