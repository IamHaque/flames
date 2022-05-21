flames_form = document.querySelector("#flames_form");
lp_form = document.querySelector("#lp_form");

lp_form.addEventListener("submit", (e) => {
  e.preventDefault();

  n1 = document.querySelector("#lp_name1").value;
  n2 = document.querySelector("#lp_name2").value;

  document.querySelector("#lp_name1").value = "";
  document.querySelector("#lp_name2").value = "";

  if (n1 === "" || n2 === "") return;
  if (/[^a-zA-Z]/.test(n1)) return;
  if (/[^a-zA-Z]/.test(n2)) return;

  name = n1.toLowerCase() + "loves" + n2.toLowerCase();
  name_dict = {};

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

  document.querySelector("#lp_result").innerText = `${n1} loves ${n2} ${wt.join(
    ""
  )} %`;
});

flames_form.addEventListener("submit", (e) => {
  e.preventDefault();

  n1 = document.querySelector("#name1").value;
  n2 = document.querySelector("#name2").value;

  document.querySelector("#name1").value = "";
  document.querySelector("#name2").value = "";

  if (n1 === "" || n2 === "") return;
  if (/[^a-zA-Z]/.test(n1)) return;
  if (/[^a-zA-Z]/.test(n2)) return;

  name = n1.toLowerCase() + n2.toLowerCase();
  name_dict = {};

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

  document.querySelector("#flames_result").innerText = `${n1} and ${n2} are ${
    status_dict[status[0]]
  }`;
});
