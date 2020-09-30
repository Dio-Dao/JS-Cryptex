// ----- Letters for cryptex
function insert_letter() {
  const side = document.querySelectorAll(".side");
  const triangle = document.querySelectorAll(".triangle");
  side.forEach(
    (x) =>
      (x.innerHTML = `
    <div class="part_side"></div>
    <div class="part_side"></div>
    <div class="part_side"></div>
    <div class="part_side"></div>`)
  );
  triangle.forEach(
    (x) =>
      (x.innerHTML = `
      <div class="triangle_container">
      <div class="part_tr"></div>
      <div class="part_tr"></div>
      <div class="part_tr"></div>
      </div>`)
  );
  const part_side = Array.from(document.querySelectorAll(".part_side"));
  const part_tr = Array.from(document.querySelectorAll(".part_tr"));
  const part_all = part_side.concat(part_tr);
  let val = [];
  for (let i = 48; i <= 65; i++) {
    val.push(String.fromCharCode(i));
  }
  for (let i = 66; i <= 90; i++) {
    val.push(String.fromCharCode(i).toLowerCase());
    val.push(String.fromCharCode(i));
  }
  for (let i = 0; i < part_all.length; i++) {
    if (val[i]) {
      part_all[i].innerHTML = val[i];
    } else {
      part_all[i].innerHTML = i;
    }
  }
}
insert_letter();

// ----- Choose letters from cryptex
function choose_letters() {
  const part_side = Array.from(document.querySelectorAll(".part_side"));
  const part_tr = Array.from(document.querySelectorAll(".part_tr"));
  const part_all = part_side.concat(part_tr);
  const pass = document.querySelector(".form_pass").textContent;
  const result = document.querySelector(".form_result");
  const cryptex = document.querySelector(".cryptex");
  const circle = document.querySelector(".circle");
  let cr_val = [];
  function res() {
    if (cr_val.join("") == pass) {
      result.style.display = "block";
      cryptex.style.display = "none";
      circle.style.display = "none";
    } else {
      result.style.display = "none";
      cryptex.style.display = "block";
      circle.style.display = "block";
    }
  }
  part_all.forEach(
    (x) =>
      (x.onclick = function () {
        cr_val.push(this.textContent);
        document.querySelector(".form_out").innerHTML = cr_val.join("");
        res();
      })
  );
  document.querySelector(".form_btn").onclick = function () {
    cr_val.pop();
    document.querySelector(".form_out").innerHTML = cr_val.join("");
    res();
  };
}
choose_letters();

// ----- Rotate cryptex
function rotate_cryptex(x) {
  const cryptex = document.querySelector(".cryptex");
  const step = 5;
  let counterL = 0;
  let counterR = 0;
  let counterU = 0;
  let counterD = 0;
  let flag;
  let idproc;
  function ArrowDown(e) {
    // console.log(e.target);
    if (e.code == "ArrowLeft" || e == "left") {
      counterL += 1;
      cryptex.style.transform = `rotateY(${Math.floor(
        step * (counterR - counterL)
      )}deg) rotateX(${step * (counterU - counterD)}deg)`;
    } else if (e.code == "ArrowRight" || e == "right") {
      counterR += 1;
      cryptex.style.transform = `rotateY(${Math.floor(
        step * (counterR - counterL)
      )}deg) rotateX(${step * (counterU - counterD)}deg)`;
    } else if (e.code == "ArrowUp" || e == "top") {
      counterU += 1;
      cryptex.style.transform = `rotateY(${Math.floor(
        step * (counterR - counterL)
      )}deg) rotateX(${step * (counterU - counterD)}deg)`;
    } else if (e.code == "ArrowDown" || e == "bottom") {
      counterD += 1;
      cryptex.style.transform = `rotateY(${Math.floor(
        step * (counterR - counterL)
      )}deg) rotateX(${step * (counterU - counterD)}deg)`;
    }
  }
  document.addEventListener("keydown", ArrowDown);
  Array.from(document.querySelector(".arrows_mini").children).forEach(function (
    x
  ) {
    x.addEventListener("mousedown", mouseDownEvent);
    x.addEventListener("mouseup", mouseUpEvent);
    x.addEventListener("mouseleave", mouseUpEvent);
    x.addEventListener("touchstart", mouseDownEvent);
    x.addEventListener("touchend", mouseUpEvent);
  });
  function mouseDownEvent() {
    flag = true;
    // console.log(flag);
    idproc = setInterval(() => ArrowDown(this.getAttribute("direction")), 50);
  }
  function mouseUpEvent() {
    flag = false;
    clearInterval(idproc);
    // console.log(flag);
  }
}
rotate_cryptex();
