exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("artwork")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("artwork").insert([
        {
          author: "Frank Miller",
          url: "https://i2.wp.com/biffbampop.com/wp-content/uploads/2018/04/xerxes-1.jpg?resize=1080%2C608&ssl=1",
          description: "King Leonidas and Xerxes portraying the final stand of Spartans against the Persian Empire"
        },
        {
          author: "Peter Parker",
          url: "https://wallup.net/wp-content/uploads/2016/01/45493-Spider-Man-comic_art-comics-superhero-Marvel_Comics-748x421.jpg",
          description: "Spiderman scales a skyscraper"
        },
        {
          author: "Alfred",
          url: "https://cafart.r.worldssl.net/images/Category_40619/subcat_191964/UvD1nEUr_0108181126051gpadd.jpg",
          description: "Batman and the Joker entangled in eternal combat"
        },
        {
          author: "Whistler",
          url: "https://i.pinimg.com/originals/f4/45/66/f44566eb8143a37e70da89efe5d175ae.jpg",
          description: "Blade ponders his next move against the vampire empire"
        },
        // {
        //   author: "Gohan",
        //   url: "https://i.pinimg.com/236x/19/b4/d8/19b4d82c81f13ab03c1c67737aa4f910--dragon-art-art-paintings.jpg",
        //   description: "After arriving on earth, Prince Vegeta and Napa scan the landscape for signs of powerful life forces."
        // },
        {
          author: "Iron Man",
          url: "https://d13ezvd6yrslxm.cloudfront.net/wp/wp-content/images/Art-Deco-Iron-Man-Rodolfo-Reyes.jpg",
          description: "Blast off"
        },
        {
          author: "King Kamehameha",
          url: "http://3.bp.blogspot.com/-DLHQxnQ8XJw/Ua4YWXm-DAI/AAAAAAAADjY/oouIs3lZnpI/s1600/l.jpg",
          description: "King Kamehameha about to embark on his conquest of  the Hawaiian Islands"
        },
        {
          author: "Samurai",
          url: "https://media.proprofs.com/images/QM/user_images/2169923/1516426900.jpg",
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. "
        },
        // {
        //   author: "Shuri",
        //   url: "https://upload.wikimedia.org/wikipedia/en/2/2d/Shuri_as_Griot%2C_Black_Panther_%282018%29_Variant_Cover.jpg",
        //   description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. "
        // },
        {
          author: "African Warrior",
          url: "https://i.pinimg.com/originals/01/9f/ee/019fee386ef819408fb9699f57c63424.jpg",
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. "
        },
        {
          author: "Legolas",
          url: "https://static1.squarespace.com/static/51b3dc8ee4b051b96ceb10de/t/5256fa01e4b065c225ee7c8f/1381431812112/legolas_vs_azog_by_corankizerstone-d6oo4pl.jpg",
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. "
        },
        {
          author: "Bruce Lee",
          url: "https://www.wallpaperup.com/uploads/wallpapers/2013/01/14/29332/fb7d8e359d022a1b8c870765096bca24-700.jpg",
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. "
        },
        {
          author: "Native American Warrior",
          url: "https://i.pinimg.com/originals/c2/e5/43/c2e543c66d0a5b280af8f8a9acab47bf.jpg",
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. "
        },
        {
          author: "Native American Warrior",
          url: "https://i.pinimg.com/736x/f3/34/a8/f334a8de9e4d3c3c25df294ce5264754.jpg",
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. "
        },
        {
          author: "Fantasy Samurai",
          url: "http://cdn.paperhi.com/1920x1182/20180225/5a9336ad43db1.jpg",
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. "
        }
      ]);
    });
};
