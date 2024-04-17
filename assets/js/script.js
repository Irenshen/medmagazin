$(document).ready(function () {
  $('input[type="tel"]').mask("+375 (99) 999-99-99");

  if ($(window).width() < 640) {
    $(".burger").click(function () {
      $(".menu_mobile").addClass("opened");
      $("body").addClass("modal-open");
    });

    $("#menu-closer").click(function () {
      $(".menu_mobile").removeClass("opened");
      $("body").removeClass("modal-open");
    });

    $(".searching-icon").click(function (e) {
      e.preventDefault();
      $(".search-dropdown").toggleClass("opened");
    });
  }

  if ($(window).width() < 1160 && $(window).width() > 640) {
    $(".burger").click(function () {
      $(".menu").toggleClass("opened");
      $(".header__burger").toggleClass("opened");
    });
  }

  $(".custom-tab").click(function () {
    $(this)
      .addClass("active")
      .siblings()
      .removeClass("active")
      .parent(".custom-tabs-wrap")
      .parent(".top-wrap")
      .next(".custom-tabs-content-wrap")
      .find(".custom-tabs-content")
      .removeClass("opened")
      .eq($(this).index())
      .addClass("opened");
  });

  //accordion
  if (document.querySelector(".accordion")) {
    let acc = document.getElementsByClassName("accordion");

    for (let i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function () {
        this.classList.toggle("active");
        let panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      });
    }
  }

  // page-archive dropdown
  $(".article-filter--year").click(function () {
    $(this).toggleClass("opened");
  });

  //select
  $(".select").each(function () {
    const _this = $(this),
      selectOption = _this.find("option"),
      selectOptionLength = selectOption.length,
      selectedOption = selectOption.filter(":selected"),
      duration = 200; // длительность анимации

    _this.hide();
    _this.wrap('<div class="select"></div>');
    $("<div>", {
      class: "new-select",
      text: _this.children("option:disabled").text(),
    }).insertAfter(_this);

    const selectHead = _this.next(".new-select");
    $("<div>", {
      class: "new-select__list",
    }).insertAfter(selectHead);

    const selectList = selectHead.next(".new-select__list");
    for (let i = 1; i < selectOptionLength; i++) {
      $("<div>", {
        class: "new-select__item",
        html: $("<span>", {
          text: selectOption.eq(i).text(),
        }),
      })
        .attr("data-value", selectOption.eq(i).val())
        .appendTo(selectList);
    }

    const selectItem = selectList.find(".new-select__item");
    selectList.slideUp(0);
    selectHead.on("click", function () {
      if (!$(this).hasClass("on")) {
        $(this).addClass("on");
        selectList.slideDown(duration);

        selectItem.on("click", function () {
          let chooseItem = $(this).data("value");

          $("select").val(chooseItem).attr("selected", "selected");
          selectHead.text($(this).find("span").text());

          selectList.slideUp(duration);
          selectHead.removeClass("on").addClass("new-select__checked");
          if (selectHead.text() != "") {
            $("#doc-format").attr("value", selectHead.text()); //записываем значение в value
          }
        });
      } else {
        $(this).removeClass("on");
        selectList.slideUp(duration);
      }
    });
  });

  //textarea
  //autoheight + lib
  $("textarea").on("input", function () {
    this.style.height = "1px";
    this.style.height = this.scrollHeight + 6 + "px";
  });
  //counter
  if (document.querySelector("textarea.minlength")) {
    $("textarea.minlength").on("change keyup keydown", function () {
      let currentLength = parseInt($.trim($(this).val()).split(" ").length) - 1; // Подсчет слов
      const maxlength = 300;
      $(this)
        .next(".counter-text")
        .children(".counter-text__current")
        .html(currentLength);
      $(this)
        .next(".counter-text")
        .children(".counter-text__total")
        .html(maxlength);
      if (currentLength > 300) {
        $(this)
          .next(".counter-text")
          .children(".counter-text span")
          .css("color", "red");
        if (!$("p.warning").length) {
          $(this)
            .parent()
            .after(
              $(
                '<p class="warning">Обратите внимание, количество слов превысило допустимое значение. Ознакомьтесь подробнее с <a href="">Правилами для авторов</a></p>'
              )
            );
        } else {
        }
      } else {
        $(this)
          .next(".counter-text")
          .children(".counter-text span")
          .css("color", "#1A2442");
        $(this).parent().next(".warning").remove();
      }
    });
  }

  //input-file add
  $(".input-file input[type=file]").on("change", function () {
    let file = this.files[0];
    let fileName = file.name;
    $(this)
      .next()
      .html(fileName)
      .addClass("doc-name")
      .removeClass("btn_step-default")
      .removeClass("btn");
    $(this).parent().after($('<span class="btn-del remove">Удалить</span>'));
  });

  //input-file delete
  $(document).on("click", "span.remove", function () {
    $(this).prev(".input-file").children(".file-author")[0].value = "";
    $(this)
      .prev(".input-file")
      .children("span.doc-name")
      .addClass("btn")
      .addClass("btn_step-default")
      .removeClass("doc-name")
      .html("Oбзор");
    $(this).detach();
  });

  //input-password
  $("body").on("click", ".password-control", function () {
    if ($(".password-input").attr("type") == "password") {
      $(this).addClass("view");
      $(".password-input").attr("type", "text");
    } else {
      $(this).removeClass("view");
      $(".password-input").attr("type", "password");
    }
    return false;
  });
});

//input textarea validate
let $input = $("input");
let baseValue = $input.val();

let $textarea = $("textarea");
let textareaValue = $textarea.val();

$input.on("input", function () {
  $input.toggleClass("invalid", $input.val() !== baseValue);
  if ("input[type=file]") {
    $(this).parent().prev(".warning").remove();
  }

  if ("input[name=keywordEn]" || "input[name=keywordRu]") {
    $(this).parent(".keywords-input-wrap").removeClass("invalid");
  }
});

$textarea.on("input", function () {
  $textarea.removeClass("invalid", $textarea.val() !== textareaValue);
});

//add keywords
if (document.querySelector(".keywords-input-wrap")) {
  const inputElement = document.querySelector(".keywords-input-wrap input");
  const listElement = document.querySelector(".list-group");
  const notes = [];
  const keywordRuAll = document.querySelector("#keywordRuAll");

  const keywordEnAll = document.querySelector("#keywordEnAll");
  const inputElement2 = document.querySelector(".keywords-input-wrap2 input");
  const listElement2 = document.querySelector(".list-group2");
  const notes2 = [];

  // 1созданние массива по клику списка 1
  inputElement.addEventListener("keydown", function (event) {
    if (event.keyCode === 32 || event.keyCode === 13) {
      if (!!!inputElement.value) {
        return;
      }
      const newNote = {
        title: inputElement.value,
      };
      notes.push(newNote);
      render();
      keywordRuAll.value = keywordRuAll.value + " " + inputElement.value;
      inputElement.value = " ";
    }
  });

  //добавление для каждого элемента списка 1
  function render() {
    listElement.innerHTML = "";
    if (notes.length === 0) {
    }
    for (let i = 0; i < notes.length; i++) {
      listElement.insertAdjacentHTML("beforeend", getNoteListRu(notes[i], i));
    }
  }
  render();

  function getNoteListRu(note, index) {
    return `<li class="list-group-item">
    <span class="wordRu">${note.title}</span>
    <span data-index=${index} data-type="remove">&times;</span>
    </li>`;
  }
  //удаление из списка 1
  listElement.onclick = function (event) {
    if (event.target.dataset.index) {
      const index = parseInt(event.target.dataset.index);
      const type = event.target.dataset.type;

      if (type === "remove") {
        notes.splice(index, 1);
      }
      render();
    }
  };

  //созданние массива по клику списка 2
  inputElement2.addEventListener("keydown", function (event) {
    if (event.keyCode === 32 || event.keyCode === 13) {
      if (!!!inputElement2.value) {
        return;
      }
      const newNote = {
        title: inputElement2.value,
      };
      notes2.push(newNote);
      render2();
      keywordEnAll.value = keywordEnAll.value + " " + inputElement2.value;
      inputElement2.value = " ";
    }
  });

  //добавление для каждого элемента списка 2
  function render2() {
    listElement2.innerHTML = "";
    if (notes2.length === 0) {
      // listElement.innerHTML = "<p>Введите ключевые слова</p>";
    }
    for (let i = 0; i < notes2.length; i++) {
      listElement2.insertAdjacentHTML("beforeend", getNoteListEn(notes2[i], i));
    }
  }
  render2();

  function getNoteListEn(note, index) {
    return `<li class="list-group-item">
    <span class="wordEn">${note.title}</span>
    <span data-index=${index} data-type="remove">&times;</span>
    </li>`;
  }

  //удаление из списка 2
  listElement2.onclick = function (event) {
    if (event.target.dataset.index) {
      const index = parseInt(event.target.dataset.index);
      const type = event.target.dataset.type;

      if (type === "remove") {
        notes2.splice(index, 1);
      }
      render2();
    }
  };
}

$(".add-coauthor").click(function () {
  const count = document.getElementsByClassName("step__coauthor").length;
  $(this)
    .parent()
    .before(
      $(`<div class="step__author mt-40 step__coauthor" data-count=${count}">
      <div class="btn-minus remove-coauthor">Удалить соавтора</div>
      <p class="mt-24"> Данные coавтора</p>
      <div class="step__info-feedback mt-24">
          <div class="step__input-wrap">
              <input type="text" name="nameCoAuthor" placeholder="Фамилия Имя Отчество">
          </div>
          <div class="step__input-wrap">
              <input type="text" name="countryCoAuthor" placeholder="Страна">
          </div>
          <div class="step__input-wrap">
              <input type="text" name="cityCoAuthor" placeholder="Город">
          </div>
          <div class="step__input-wrap">
              <input type="text" name="jobCoAuthor" placeholder="Место работы">
          </div>
          <div class="step__input-wrap">
              <input type="text" name="jobTitleCoAuthor" placeholder="Должность">
          </div>
          <div class="step__input-wrap">
              <input type="email" name="mailCoAuthor" placeholder="Электронная почта">
          </div>
          <div class="step__input-wrap">
              <input type="tel" name="telMobCoAuthor" placeholder="Мобильный телефон">
          </div>
          <div class="step__input-wrap">
              <input type="tel" name="telJobCoAuthor" placeholder="Рабочий телефон">
          </div>
      </div>
  </div>  `)
    );
});

//steps of form
if (document.querySelector(".step")) {
  let currentTab = 0;
  let stepNum = 0;
  showTab(currentTab);

  function showTab(n) {
    let allSteps = document.getElementsByClassName("step");
    let stepsCorrected = document.getElementsByClassName("step-corrected");
    let branch = document.querySelector("#doc-format");

    if (n == "error") {
      document.getElementById("nextBtn").style.display = "none";
    } else {
      document.getElementById("nextBtn").style.display = "block";
    }

    if (n == 0) {
      document.getElementById("prevBtn").style.display = "none";
    } else {
      document.getElementById("prevBtn").style.display = "inline";
    }

    if (
      branch.value === "Исправленные материалы" &&
      n == stepsCorrected.length - 2
    ) {
      document.getElementById("nextBtn").innerHTML = "Отправить статью";
    } else if (n == allSteps.length - 2) {
      document.getElementById("nextBtn").innerHTML = "Отправить статью";
    } else if (
      branch.value === "Исправленные материалы" &&
      n == stepsCorrected.length - 1
    ) {
      document.getElementById("nextBtn").style.display = "none";
      document.getElementById("prevBtn").style.display = "none";
      document.getElementById("nextBtn").setAttribute("type", "submit");
    } else if (n == allSteps.length - 1) {
      document.getElementById("nextBtn").style.display = "none";
      document.getElementById("prevBtn").style.display = "none";
      document.getElementById("nextBtn").setAttribute("type", "submit");
    } else {
      document.getElementById("nextBtn").innerHTML = "Продолжить";
      document.getElementById("nextBtn").setAttribute("type", "button");
    }

    if (branch.value !== "Исправленные материалы" && n === 6) {
      document.getElementById("nextBtn").classList.add("btn-next-6");
    } else if (branch.value !== "Исправленные материалы" && n === 5) {
      document.getElementById("nextBtn").classList.add("btn-next-5");
    } else {
      document.getElementById("nextBtn").classList.remove("btn-next-6");
      document.getElementById("nextBtn").classList.remove("btn-next-5");
    }

    if (branch.value === "Исправленные материалы") {
      stepsCorrected[n].style.display = "block";
    } else if (branch.value !== "Исправленные материалы" && n !== "error") {
      allSteps[n].style.display = "block";
    }
  }

  function nextPrev(n) {
    let allSteps = document.getElementsByClassName("step");
    let stepsCorrected = document.getElementsByClassName("step-corrected");
    let branch = document.querySelector("#doc-format");

    const radioBtns = document.querySelectorAll('input[type="radio"]');
    const stepError = document.querySelector(".step-error");
    if (n == 1 && !validateForm()) return false;

    if (currentTab == "error" && stepNum === 4) {
      currentTab = 3;
      stepError.style.display = "none";
      allSteps[currentTab].style.display = "block";
      showTab(currentTab);
    } else if (currentTab == "error" && stepNum === 5) {
      currentTab = 4;
      stepError.style.display = "none";
      allSteps[currentTab].style.display = "block";
      showTab(currentTab);
    } else if (branch.value === "Исправленные материалы") {
      stepsCorrected[currentTab].style.display = "none";
      currentTab = currentTab + n;

      showTab(currentTab);
    } else if (branch.value !== "Исправленные материалы" && currentTab == 3) {
      for (let i = 0; i < radioBtns.length; i++) {
        if (radioBtns[i].checked) {
          a = radioBtns[i].value;
        }
      }
      if (a !== "Y") {
        allSteps[3].style.display = "none";
        stepError.style.display = "block";
        stepNum = 4;
        currentTab = "error";
        showTab(currentTab);
      } else {
        allSteps[currentTab].style.display = "none";
        currentTab = currentTab + n;
        showTab(currentTab);
      }
    } else {
      allSteps[currentTab].style.display = "none";
      currentTab = currentTab + n;

      showTab(currentTab);
    }
  }
  function validateForm() {
    var step,
      inputs,
      i,
      j,
      valid = true;
    step = document.getElementsByClassName("step");
    inputs = step[currentTab].getElementsByTagName("input");
    let branch = document.querySelector("#doc-format");
    let stepsCorrected = document.getElementsByClassName("step-corrected");

    if (branch.value !== "Исправленные материалы") {
      let formReq1 = step[currentTab].getElementsByClassName("req");
      for (j = 0; j < formReq1.length; j++) {
        if (formReq1[j].value == "") {
          formReq1[j].className += " invalid";
          valid = false;
        }
      }

      $(document).on("click", ".btn-next-5", function () {
        const stepError = document.querySelector(".step-error");
        let currentLengthVal = document.getElementsByClassName(
          "counter-text__current"
        );
        for (k = 0; k < currentLengthVal.length; k++) {
          if (currentLengthVal[k].innerHTML < 200) {
            step[4].style.display = "none";
            step[5].style.display = "none";
            stepError.style.display = "block";
            stepNum = 5;
            currentTab = "error";
            showTab(currentTab);
          }
        }
      });

      for (i = 0; i < inputs.length; i++) {
        if (inputs[i].value == "") {
          inputs[i].className += " invalid";
          valid = false;

          if (
            inputs[i].type == "file" &&
            !inputs[i].parentElement.previousElementSibling.classList.contains(
              "warning"
            )
          ) {
            inputs[i].parentNode.insertAdjacentHTML(
              "beforebegin",
              `<div class="warning">Загрузите документ</div>`
            );
          }
          if (inputs[i].id == "doc-format") {
            inputs[i].nextElementSibling.classList.add("invalid");
          }
          if (inputs[i].name == "keywordEn" || inputs[i].name == "keywordRu") {
            inputs[i].parentElement.classList.add("invalid");
          }
        }
      }
    } else {
      let formReq2 = stepsCorrected[currentTab].getElementsByClassName("req");
      for (j = 0; j < formReq2.length; j++) {
        if (formReq2[j].value == "") {
          formReq2[j].className += " invalid";
          valid = false;
        }
      }
    }

    return valid;
  }
}

if (document.querySelector("#form")) {
  $(document).on("click touchstart", ".btn-next-6", function () {
    let coauthorsValues = [];

    const form = document.forms.articleForm;
    //author
    const nameAuthor = document.querySelector("#nameAuthor");
    nameAuthor.innerHTML = form.nameAuthor.value;

    const countryAuthor = document.querySelector("#countryAuthor");
    countryAuthor.innerHTML = form.countryAuthor.value;

    const cityAuthor = document.querySelector("#cityAuthor");
    cityAuthor.innerHTML = form.cityAuthor.value;

    const jobAuthor = document.querySelector("#jobAuthor");
    jobAuthor.innerHTML = form.jobAuthor.value;

    const jobTitleAuthor = document.querySelector("#jobTitleAuthor");
    jobTitleAuthor.innerHTML = form.jobTitleAuthor.value;

    const mailAuthor = document.querySelector("#mailAuthor");
    mailAuthor.innerHTML = form.mailAuthor.value;

    const telMobAuthor = document.querySelector("#telMobAuthor");
    telMobAuthor.innerHTML = form.telMobAuthor.value;

    const telJobAuthor = document.querySelector("#telJobAuthor");
    telJobAuthor.innerHTML = form.telJobAuthor.value;

    const textRu = document.querySelector("#textRu");
    textRu.innerHTML = form.textRu.value;

    const textEn = document.querySelector("#textEn");
    textEn.innerHTML = form.textEn.value;

    const bibliographyRu = document.querySelector("#bibliographyRu");
    bibliographyRu.innerHTML = form.bibliographyRu.value;

    const bibliographyEn = document.querySelector("#bibliographyEn");
    bibliographyEn.innerHTML = form.bibliographyEn.value;

    const keywordRuValue = [
      ...document.getElementsByClassName("wordRu"),
    ].reduce((acc, cur) => (acc += cur.textContent), "");
    keywordRu.innerHTML = keywordRuValue;

    const keywordEnValue = [
      ...document.getElementsByClassName("wordEn"),
    ].reduce((acc, cur) => (acc += cur.textContent), "");
    keywordEn.innerHTML = keywordEnValue;

    const fileAuthor = document.querySelector("#fileAuthor");
    fileAuthor.innerHTML = form.fileAuthor.nextElementSibling.textContent;

    const fileLastPage = document.querySelector("#fileLastPage");
    fileLastPage.innerHTML = form.fileLastPage.nextElementSibling.textContent;

    const editorialComment = document.querySelector("#editorialComment");
    editorialComment.innerHTML = form.editorialComment.value;

    //coauthor

    $(document).on("click", ".remove-coauthor", function () {
      $(this).parent(".step__coauthor").remove();
    });

    let allBlocksCoauthors = document.querySelectorAll(".res_coAuthor__item");
    for (let j = 0; j < allBlocksCoauthors.length; j++) {
      if (allBlocksCoauthors[j]) {
        allBlocksCoauthors[j].remove();
      }
    }

    let coauthorInputs = document.querySelectorAll(".step__coauthor input");
    for (let i = 0; i < coauthorInputs.length; i++) {
      let coauthorInputsParent =
        coauthorInputs[i].parentElement.parentElement.parentElement;

      let coauthorValue = {
        count: coauthorInputsParent.dataset.count,
        value: coauthorInputs[i].value,
        nameInput: coauthorInputs[i].name,
      };

      //rewrite objects
      let a = coauthorsValues.find(
        (obj) =>
          obj.count === coauthorValue.count &&
          obj.nameInput === coauthorValue.nameInput &&
          obj.value !== coauthorValue.value
      );
      let b = coauthorsValues.find(
        (obj) =>
          obj.count === coauthorValue.count &&
          obj.nameInput === coauthorValue.nameInput &&
          obj.value === coauthorValue.value
      );

      if (!!b) {
        // console.log("no no perezapis");
      } else if (!!a) {
        a.count = coauthorInputsParent.dataset.count;
        a.value = coauthorInputs[i].value;
        a.nameInput = coauthorInputs[i].name;
      } else {
        coauthorsValues.push(coauthorValue);
      }
    }

    const listElement = document.querySelector(".res_coAuthor");

    const uniqueNames = new Set(coauthorsValues.map((e) => e.count)); // создаём коллекцию уникальных значений

    const getValueMassive = (countProp, key) =>
      coauthorsValues.find(
        (el) => el.count === countProp && el.nameInput === key
      )?.value ?? "-";

    return Array.from(uniqueNames).map((element) => {
      listElement.insertAdjacentHTML(
        "beforeend",
        `<div class="mt-40 res_coAuthor__item">
        <p>${getValueMassive(element, "nameCoAuthor")}</p>
        <p>${getValueMassive(element, "jobCoAuthor")}</p>
        <p>${getValueMassive(element, "jobTitleCoAuthor")}</p>
        <p><span>${getValueMassive(element, "countryCoAuthor")}</span>
            <span>${getValueMassive(element, "cityCoAuthor")}</span>
            <span class="icon_mail">${getValueMassive(
              element,
              "mailCoAuthor"
            )}</span>
            <span class="icon_phone">${getValueMassive(
              element,
              "telMobCoAuthor"
            )}</span>
            <span class="icon_phone">${getValueMassive(
              element,
              "telJobCoAuthor"
            )}</span>
        </p>
    </div>`
      );
      // }
    });
  });
}

if (document.querySelector("#form")) {
  const { form } = document.forms;

  function retrieveAddValue(event) {
    alert("submit");
    event.preventDefault();

    const formData = new FormData(form);
    const values = Object.fromEntries(formData.entries());

    fetch("/api/submit-form", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        alert("форма отправлена");
      })
      .catch((error) => {
        alert("ошибка отправки формы");
      });
  }

  form.addEventListener("submit", retrieveAddValue);
}
