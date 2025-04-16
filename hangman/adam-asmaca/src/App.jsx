import { useEffect, useState } from "react";
import "./App.css";
import { data } from "./data.jsx";

const alphabet = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

function App() {
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [answerArray, setAnswerArray] = useState([]);
  const shuffle = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };
  const [keywords, setKeywords] = useState([]);
  const [resultQuestion, setResultQuestion] = useState(false);
  const [wrong, setWrong] = useState(false);

  useEffect(() => {
    // Oyun bitmediyse answer'ı güncelle
    if (data[index]) {
      setResultQuestion(false);
      setWrong(false);
      setAnswer(data[index].answer.toLowerCase());
      setQuestion(data[index].question);
      const letters = data[index].answer.split("");
      letters.push(alphabet[Math.floor(Math.random() * alphabet.length)]);
      letters.push(alphabet[Math.floor(Math.random() * alphabet.length)]);
      letters.push(alphabet[Math.floor(Math.random() * alphabet.length)]);
      const alphabetLowerData = letters.map((letter) => letter.toLowerCase());
      setAnswerArray(shuffle(alphabetLowerData));
    } else {
      // Eğer sorular bitti ise oyun bitti
      setAnswer("");
    }
  }, [index]);

  const setKeyword = (keyword) => {
    if (keywords.length < answer.length) {
      keywords.push(keyword);
      setKeywords([...keywords]);
    }
    if (keywords.length === answer.length) {
      if (answer === keywords.join("")) {
        setIndex(index + 1);
        setKeywords([]);
        setResultQuestion(true);
      } else {
        setWrong(true);
      }
    }
  };

  const removeKeyword = (index) => {
    keywords.splice(index, 1);
    setKeywords([...keywords]);
  };

  return (
    <>
      <div className="app">
        {answer.length > 0 ? (
          <div>
            <div>
              <span className={"question-name"}>{question}</span>
            </div>
            <div className="question-area">
              {keywords.map((item, index) => (
                <span
                  style={{
                    "border-bottom": wrong ? "3px solid red" : "3px solid #ddd",
                  }}
                  className={"question"}
                  key={index}
                  onClick={() => removeKeyword(index)}
                >
                  {item}
                </span>
              ))}
            </div>
            <div className={"button-area"}>
              {answerArray.map((item, index) => (
                <button
                  className={"button"}
                  key={index}
                  onClick={() => setKeyword(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div>Oyun Bitti</div>
        )}
      </div>
    </>
  );
}

export default App;
