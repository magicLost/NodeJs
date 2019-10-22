const fs = require("fs");
const superagent = require("superagent");

/* 
fs.readFile(__dirname + "/dog.txt", (err, data) => {
  console.log("Breed: " + data);

  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .then(res => {
      console.log(res.body.message);

      fs.writeFile(`${__dirname}/dog-img.txt`, res.body.message, err => {
        console.log("Random dog image");
      });
    })
    .catch(err => {
      console.log(err.message);
    });
}); */

const readFilePromise = file => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
};

const writeFilePromise = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, err => {
      if (err) reject(err);
      resolve("Success writed...");
    });
  });
};

const getDogPic = async () => {
  try {
    const data = await readFilePromise(`${__dirname}/dog.txt`);
    console.log("Breed: " + data);

    const res = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    console.log(res.body.message);

    await writeFilePromise(`${__dirname}/dog-img.txt`, res.body.message);
    return "Ready";
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};

const getManyDogPics = async () => {
  try {
    const data = await readFilePromise(`${__dirname}/dog.txt`);
    console.log("Breed: " + data);

    const res1Promise = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const res2Promise = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const res3Promise = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const all = await Promise.all([res1Promise, res2Promise, res3Promise]);

    const imgs = all.map(value => value.body.message);

    console.log(imgs);

    await writeFilePromise(`${__dirname}/dog-img.txt`, imgs.join("\n"));
    return "Ready";
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};

getManyDogPics();

(async () => {
  try {
    console.log("Start");
    const x = await getDogPic();
    console.log(x);
    console.log("Done");
  } catch (err) {
    console.log(err.message);
  }
})();

/* console.log("Start");
getDogPic()
  .then(x => console.log(x))
  .catch(err => console.log(err.message));
console.log("Done"); */

/* readFilePromise(`${__dirname}/dog.txt`)
  .then(data => {
    console.log("Breed: " + data);

    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then(res => {
    console.log(res.body.message);

    return writeFilePromise(`${__dirname}/dog-img.txt`, res.body.message);
  })
  .then(() => {
    console.log("Rendom");
  })
  .catch(err => {
    console.log(err.message);
  });
 */
