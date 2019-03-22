exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("artwork")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("artwork").insert([
        {
          author: "Frank Miller",
          url:
            "https://i2.wp.com/biffbampop.com/wp-content/uploads/2018/04/xerxes-1.jpg?resize=1080%2C608&ssl=1",
          description:
            "King Leonidas and Xerxes portraying the final stand of Spartans against the Persian Empire"
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
        },
        {
          author: "Whistler",
          url:
            "https://i.pinimg.com/originals/f4/45/66/f44566eb8143a37e70da89efe5d175ae.jpg",
          description: "Blade ponders his next move against the vampire empire"
        },
        {
          author: "Gohan",
          url:
            "https://i.pinimg.com/236x/19/b4/d8/19b4d82c81f13ab03c1c67737aa4f910--dragon-art-art-paintings.jpg",
          description:
            "After arriving on earth, Prince Vegeta and Napa scan the landscape for signs of powerful life forces."
        },
        {
          author: "Iron Man",
          url: "https://d13ezvd6yrslxm.cloudfront.net/wp/wp-content/images/Art-Deco-Iron-Man-Rodolfo-Reyes.jpg",
          description: "Blast off"
        }
      ]);
    });
};
