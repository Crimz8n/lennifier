const hEyeMap = {
    ":": [" ͡°", " ͡°"],
    ";": [" ͠°", " ͡°"],
    "=": ["■", "■"],
    "X": ["X", "X"],
    "x": ["x", "x"],
    "B": [" ͡⎚", " ͡⎚"],
    "8": ["◉", "◉"],
    "|": ["￣", "￣"]
}

const vEyeMap = {
    ";": [";", ";"],
    "-": ["─", "─"],
    "^": ["  ͡ ", " ͡  "],
    ">": ["⇀", "↼"],
    ".": ["・", "・"],
    ",": ["¬", "¬"],
    "`": ["`", "`"],
    "T": ["T", "T"],
    "O": ["☉", "☉"],
    "o": ["☉", "☉"],
    "@": ["◉", "◉"],
    "#": ["■", "■"],
    "&": ["ಠ", "ಠ"]
}

const noseMap = {
    "-": "ʖ",
    ",": "`ʖ",
    "'": "`ʖ",
    "`": "`ʖ",
    "^": ">"
}

const hMouthMap = {
    ")": "͜",
    "(": "̯",
    "D": "ᗜ",
    "O": "ᗝ",
    "o": "O",
    "P": "⊱",
    "p": "⊱",
    "/": "_",
    "|": "_",
    "*": "з",
    "3": "ω",
    ">": "v",
    "<": "^",
    "]": "╰╯",
    "[": "╭╮",
    "^": "з",
    "}": "╰╯",
    "{": "╭╮",
}

const vMouthMap = {
    "_": "_",
    "-": "_",
    ".": ".",
    ">": "з",
    "W": "Ѡ",
    "w": "ω",
    "V": "v",
    "v": "v",
    "X": "з",
    "x": "з"
}

const $input = document.getElementById("input");
const $response = document.getElementById("response");
var input;
var response;

function setInput(str) {
    $input.innerHTML = (input = str).split("").map(function (char) {
        if (char === " ") return "&nbsp;";
        else return char;
    }).join("");
}

function setResponse(copied) {
    if (response = copied) {
        $response.classList.remove("bg-maroon");
        $response.classList.add("bg-olive");
        $response.innerHTML = "Copied to clipboard";
    } else {
        $response.classList.remove("bg-olive");
        $response.classList.add("bg-maroon");
        $response.innerHTML = "Press Enter to lennify";
    }
}

function parseEmoticon(str) {
    const isVertical = (str.length == 3 && str.charAt(1).match(/[_\-.>WwVv]/) && str.charAt(0) == str.charAt(2)) || (str.length == 2 && str.charAt(0) == str.charAt(1));
    const isVerticalWithoutMouth = isVertical && str.length == 2 && !str.charAt(0).match(/[:;=XxB8|]/);

    if (!isVertical && str.charAt(0) == ">") str = str.substr(1); // Fix emoticons beggining with >, e.g. >:) -> :)
    if (!isVertical && str.length > 2 && str.charAt(str.length - 1).match(/[DOoPp*3><\]\[\^}{]/)) str = str.charAt(0) + str.substr(2); // Fix nose for emotes with nose-incompatible mouth, e.g. X-D

    const eyes = str.charAt(0);
    const nose = str.length == 2 ? " " : (isVertical ? " " : str.charAt(1));
    const mouth = !isVertical ? str.charAt(str.length - 1) : (isVerticalWithoutMouth ? "" : str.charAt(1));

    console.log("E" + eyes, "N" + nose, "M" + mouth);
    return { vertical: isVertical, eyes: eyes, nose: nose, mouth: mouth };
}

function lennify(str) {
    const emoticon = parseEmoticon(str);

    const eyes = (emoticon.vertical ? vEyeMap : hEyeMap).hasOwnProperty(emoticon.eyes) ? (emoticon.vertical ? vEyeMap : hEyeMap)[emoticon.eyes] : [" ", " "];
    const nose = noseMap.hasOwnProperty(emoticon.nose) ? noseMap[emoticon.nose] : " ";
    const mouth = (emoticon.vertical ? vMouthMap : hMouthMap).hasOwnProperty(emoticon.mouth) ? (emoticon.vertical ? vMouthMap : hMouthMap)[emoticon.mouth] : " ";

    return "(" + eyes[0] + " " + mouth + nose + eyes[1] + ")";
}

addEventListener("keydown", function (event) {
    switch (event.keyCode) {
        case 8:
            setInput(input.slice(0, -1));
            setResponse(false);
            break;
        case 13:
            if (response) break;
            setInput(lennify(input));
            navigator.clipboard.writeText(input)
            setResponse(true);
            break;
        default:
            break;
    }
});

addEventListener("keypress", function (event) {
    if (input.length >= 3 || event.charCode == 13) return;
    setInput(input + String.fromCharCode(event.charCode));
});

setInput(":-)");
setResponse(false);