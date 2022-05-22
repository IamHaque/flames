flames_form = document.querySelector("#flames_form");
lp_form = document.querySelector("#lp_form");

lp_form.addEventListener("submit", async (e) => {
  e.preventDefault();

  n1 = document.querySelector("#lp_name1").value;
  n2 = document.querySelector("#lp_name2").value;

  resetPage();

  const response = await fetch(`${window.location.href}calcPercentage`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ n1, n2 }),
  });

  response.json().then((data) => {
    const resultEl = document.querySelector("#lp_result");

    if (data.error) {
      resultEl.innerText = `${data.error}`;
      resultEl.classList.add("error");
    } else {
      resultEl.innerText = `${data.result}`;
      resultEl.classList.remove("error");
    }
  });
});

flames_form.addEventListener("submit", async (e) => {
  e.preventDefault();

  n1 = document.querySelector("#name1").value;
  n2 = document.querySelector("#name2").value;

  resetPage();

  const response = await fetch(`${window.location.href}calcFlames`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ n1, n2 }),
  });

  response.json().then((data) => {
    const resultEl = document.querySelector("#flames_result");

    if (data.error) {
      resultEl.innerText = `${data.error}`;
      resultEl.classList.add("error");
    } else {
      resultEl.innerText = `${data.result}`;
      resultEl.classList.remove("error");
    }
  });
});

const resetPage = () => {
  document.querySelector("#lp_name1").value = "";
  document.querySelector("#lp_name2").value = "";

  document.querySelector("#name1").value = "";
  document.querySelector("#name2").value = "";

  document.querySelector("#flames_result").classList.remove("error");
  document.querySelector("#flames_result").innerText = "";

  document.querySelector("#lp_result").classList.remove("error");
  document.querySelector("#lp_result").innerText = "";
};
