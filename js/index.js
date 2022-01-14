const form = document.querySelector("#form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const word = form.text.value.trim();
  if (word === "") return;

  try {
    const res = await getWord(word);
    console.log(res.data);
    render(res.data);
  } catch (error) {
    console.warn(error);
  }
});

const createElement = (tagName, className, innerHTML, father) => {
  const element = document.createElement(tagName);
  element.innerHTML = innerHTML;
  element.className = className;

  father && father.append(element);

  return element;
};

const addParagraph = (title, text, container) => {
  return createElement(
    "p",
    "",
    `<span class="fw-bold">${title}:</span> ${text}`,
    container
  );
};

const content = document.querySelector("#content");
const render = (data) => {
  content.innerHTML = "";

  data.map((word) => {
    const container = createElement(
      "div",
      "rounded shadow p-3 border mb-3 bg-primary",
      "",
      content
    );
    const wordP = word.word && addParagraph("word", word.word, container);

    const origin =
      word.origin && addParagraph("origin", word.origin, container);

    const phonetic =
      word.phonetic && addParagraph("phonetic", word.phonetic, container);

    const audiosContainer = createElement(
      "div",
      "d-flex flex-wrap",
      "",
      container
    );
    word.phonetics.map((p) => {
      const audio = createElement("audio", "", "", audiosContainer);
      audio.src = `https:${p.audio}`;
      //   audio.controls = true;
      const audioPlay = createElement(
        "button",
        "btn",
        `<i class="fas fa-volume-up me-2"></i> ${p.text || ""}`,
        audiosContainer
      );

      audioPlay.onclick = () => {
        console.log("play");
        audio.play();
      };
    });

    word.meanings.map((m) => {
      console.log(m);
      const containerMeaning = createElement(
        "div",
        "rounded p-2 border mb-3 bg-success text-white",
        "",
        container
      );

      const partOfSpeech = addParagraph(
        "partOfSpeech",
        m.partOfSpeech,
        containerMeaning
      );

      m.definitions.map((def) => {
        const definition = addParagraph(
          def.definition.slice(0, -1),
          def.example,
          containerMeaning
        );
      });
    });
  });
};
