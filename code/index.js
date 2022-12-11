fetch("../data.json")
  .then((res) => res.json())
  .then((datas) => {
    daily(datas);
    getElement(datas);
  });

const clickTime = document.querySelectorAll("a");

const getElement = (datas) => {
  datas.forEach((data) => {
    let lowerCase = data.title.toLowerCase();
    lowerCase = lowerCase.replace(/\s+/g, "-");
    getTime(data);

    function getTime() {
      clickTime.forEach((ele) =>
        ele.addEventListener("click", function () {
          let time = this.textContent.toLowerCase();

          let date;
          time.includes("ily")
            ? (date = time.replace("ily", "y"))
            : (date = time.replace("ly", ""));

          let currenTime = data.timeframes[time].current;
          let previousTime = data.timeframes[time].previous;
          let currentFormat, previousFormat;
          currenTime > 1
            ? (currentFormat = `${currenTime} hrs`)
            : (currentFormat = `${currenTime} hr`);
          previousTime > 1
            ? (previousFormat = `${previousTime} hrs`)
            : (previousFormat = `${previousTime} hr`);
          const create = `<img src="../images/icon-${lowerCase}.svg">
                    <div class='time-container'>
                    <div class="side">
                    <span class="title">${data.title}</span>
                    <img src="../images/icon-ellipsis.svg"></div>
                    <div class="time">
                    <span class="current">${currentFormat}</span>
                    <span class="previous">last ${date} - ${previousTime} hrs</span></div></div>`;

          const gridContainer = document.querySelector(".grid-container");
          const mainCard = document.querySelector(".main-card");
          const cards = document.createElement("div");
          const old = document.querySelector(".old");
          cards.classList.add("cards");
          cards.setAttribute("id", `${lowerCase}`);
          cards.innerHTML = create;
          gridContainer.removeChild(old);
          cards.classList.add("old");
          gridContainer.append(cards);
        })
      );
    }
  });
};

const daily = (datas) => {
  datas.forEach((data) => {
    let lowerCase = data.title.toLowerCase();
    lowerCase = lowerCase.replace(/\s+/g, "-");

    const child = (data) => {
      let time = "daily";
      let currenTime = data.timeframes[time].current;
      let previousTime = data.timeframes[time].previous;
      let currentFormat, previousFormat;
      currenTime > 1
        ? (currentFormat = `${currenTime} hrs`)
        : (currentFormat = `${currenTime} hr`);
      previousTime > 1
        ? (previousFormat = `${previousTime} hrs`)
        : (previousFormat = `${previousTime} hr`);
      const create = `<img src="../images/icon-${lowerCase}.svg">
              <div class='time-container'>
              <div class="side">
              <span class="title">${data.title}</span>
              <img src="../images/icon-ellipsis.svg"></div>
              <div class="time">
              <span class="current">${currentFormat}</span>
              <span class="previous"> last day - ${previousFormat}</span></div></div>`;
      return create;
    };
    const gridContainer = document.querySelector(".grid-container");
    const cards = document.createElement("div");
    cards.classList.add("cards");
    cards.setAttribute("id", `${lowerCase}`);
    cards.innerHTML = child(data);
    gridContainer.append(cards);
    cards.classList.add("old");
  });
};
