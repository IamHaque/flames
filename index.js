const express = require("express");
const app = express();
const port = 3000;

app.use(express.static(__dirname + "/public"));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile("./public/index.html", { root: __dirname });
});

app.post("/calcFlames", (req, res) => {
  const n1 = req.body.n1;
  const n2 = req.body.n2;

  if (n1 === "" || n2 === "")
    return res.status(406).send({ error: "Name cannot be empty." });

  if (/[^a-zA-Z]/.test(n1) || /[^a-zA-Z]/.test(n2))
    return res.status(406).send({ error: "Not a valid name." });

  const flames = calculateFlames(n1, n2);
  console.log(`${Date.now()} | FLAMES | ${n1} and ${n2} are ${flames}`);

  return res.json({
    result: `${n1} and ${n2} are ${flames}`,
  });
});

app.post("/calcPercentage", (req, res) => {
  const n1 = req.body.n1;
  const n2 = req.body.n2;

  if (n1 === "" || n2 === "")
    return res.status(406).send({ error: "Name cannot be empty." });

  if (/[^a-zA-Z]/.test(n1) || /[^a-zA-Z]/.test(n2))
    return res.status(406).send({ error: "Not a valid name." });

  const lovePercent = calculateLovePercent(n1, n2);
  console.log(`${Date.now()} | Love % | ${n1} loves ${n2} ${lovePercent} %`);

  return res.json({
    result: `${n1} loves ${n2} ${lovePercent} %`,
  });
});

app.listen(port, () =>
  console.log(`Server started at http://localhost:${port}`)
);

const calculateLovePercent = (n1, n2) => {
  let name = n1.toLowerCase() + "loves" + n2.toLowerCase();
  let name_dict = {};

  for (let i = 0; i < name.length; i++) {
    let char = name[i];
    if (!name_dict[char]) name_dict[char] = 1;
    else name_dict[char]++;
  }

  let wt = [];
  let used_chars = "";
  for (let char of name) {
    if (used_chars.indexOf(char) >= 0) continue;
    wt.push(name_dict[char]);
    used_chars += char;
  }

  while (true) {
    let left = 0;
    let right = wt.length - 1;

    let wt2 = [];
    while (left <= right) {
      if (left === right) wt2.push(wt[left]);
      else {
        let sum = wt[left] + wt[right];
        if (sum > 9) {
          wt2.push(Math.floor(sum / 10));
          wt2.push(sum % 10);
        } else {
          wt2.push(sum);
        }
      }

      left++;
      right--;
    }

    wt = [...wt2];
    if (wt.length === 2) break;
  }

  return wt.join("");
};

const calculateFlames = (n1, n2) => {
  let name = n1.toLowerCase() + n2.toLowerCase();
  let name_dict = {};

  for (let i = 0; i < name.length; i++) {
    let char = name[i];
    if (!name_dict[char]) name_dict[char] = 1;
    else name_dict[char]++;
  }

  let flame_name = "";
  for (let k of Object.keys(name_dict)) {
    if (name_dict[k] > 1) continue;
    flame_name += k;
  }

  if (flame_name === "") return;

  let count = flame_name.length;
  let status = ["F", "L", "A", "M", "E", "S"];
  let status_dict = {
    F: "Friends",
    L: "Lovers",
    A: "Affair",
    M: "Married",
    E: "Enemies",
    S: "Siblings",
  };

  while (status.length > 1) {
    let index = -1;
    if (count % status.length > 0) {
      index = (count % status.length) - 1;
    } else {
      index = status.length - 1;
    }
    status.splice(index, 1);
  }

  return status_dict[status[0]];
};
