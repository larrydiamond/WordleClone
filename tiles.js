'use strict';

class ButtonA extends React.Component {
    
    constructor(props) {
      super(props);
      this.keyFunction = this.keyFunction.bind(this);
      this.row = 0;
      this.col = 0;

        const wordList = new Array(
            "ABOUT","ABOVE","ACTOR",
            "AGILE","AFTER","ALTER","AGENT","AMEND","AWAIT",
            "BASIC","BENCH","BIRTH","BLOCK","BOARD",
            "BELOW",
            "BLINK","BLAND","BLEND","BLACK",
            "BRAND","BREAD","BROWN","BRAWN","BRAIN","BRICK",
            "BUILD",
            "CABIN","CAUSE",
            "CHOSE","CHIME","CHART","CHAIR","CHILD",
            "CLEAR","CLOSE","CLEAN","CLOAK","CLAIM",
            "COVER","COULD","COUNT",
            "CRISP","CRAFT","CREAM","CRAWL",
            "DAILY","DELAY","DRIVE","DREAM",
            "EIGHT","EARTH","ENJOY","EQUAL","EARLY","EMPTY","ENTRY",
            "FABLE","FACET","FAITH",
            "FIELD","FIRST","FIBER","FINAL",
            "FLOAT","FLUTE","FLUID","FLASH",
            "FRAME","FRESH","FORCE","FRONT",
            "FARCE","FOUND",
            "GLEAM","GREAT","GRADE","GRATE","GRAIN","GIANT","GLOBE","GRACE","GUARD","GUEST","GRANT","GRIND",
            "HABIT","HEART","HEARD","HORSE","HOUSE","HEAVY","HOTEL","HUMAN",
            "INPUT","IDEAL","INDEX","IMAGE",
            "JOINT","JUDGE",
            "LARGE","LAYER","LABOR","LEARN","LEAST","LIGHT","LAUGH","LATER","LOWER","LOGIC","LUCKY","LUNCH","LYING",
            "MAGIC","MACHO","MARCH","MATCH","MAYBE","MAYOR",
            "METAL","MEDIA",
            "MINUS","MIXED","MIGHT",
            "MODEL","MONTH","MOUNT","MORAL","MOUSE","MOUTH","MOVIE","MUSIC",
            "NACHO","NIGHT","NOISE","NORTH","NOVEL","NURSE",
            "OCEAN","OFTEN","OTHER",
            "PAINT","PANEL","PAUSE","PARTY",
            "PILOT","PITCH",
            "POINT","POWER",
            "PHONE","PLANE","PLANT","PLACE","PLAIN","PLATE",
            "PRICE","PRONE","PRIME","PRIDE","PRINT","PRIZE","PROUD","PROVE",
            "QUACK","QUERY","QUITE","QUICK","QUOTE","QUIET",
            "RABID","READY","REACT","ROUND","RIGHT","RAISE","RADIO",
            "SABLE",
            "SCALE",
            "SHARE","SHIFT","SHIRT","SHORT","SHARK",
            "SMILE",
            "SOLVE","SOLAR","SOUND","SOLID",
            "SPLIT","STACK","SPICE","SPORT","SPACE",
            "STORK","STORM","STAMP","STORY","STEAM","STOCK",
            "TABLE","THANK","THEIR","THING","THINK","TODAY","TRADE",
            "UNCLE","UNTIL","ULCER",
            "VOWEL",
            "WAIST","WEIGH","WHILE","WIDTH","WORLD","WRITE","WATER",
            "YEAST","YACHT",
        );
      const wordOffset = Math.floor(Math.random() * wordList.length);
      this.word = wordList [wordOffset];

    }
    keyFunction(event){
        this.tile (event.key.toUpperCase());
    }
    componentDidMount(){
      document.addEventListener("keydown", this.keyFunction, false);
    }
    componentWillUnmount(){
      document.removeEventListener("keydown", this.keyFunction, false);
    }

    solveRow() {
//        console.log ("solve for row " + this.row);

        let winners = 0;

        for (let c = 0; c < 5; c++) {
            const el = "l" + this.row + c;
            const i = document.getElementById(el);
            const ch = i.value;
            const offset = this.word.indexOf (ch);
            if (offset === -1) {
//                console.log ("did not find " + ch + " " + c);
                i.style.backgroundColor = "gray";
            } else {
//                console.log ("found " + ch + " " + c + " at " + offset);
                if (c === offset) {
                    i.style.backgroundColor = "green";
                    winners++;
                } else {
                    i.style.backgroundColor = "orange";
                }
            }
        }

        if (winners === 5) {
            alert ("SOLVED!!!!!   YOU WIN!!!!!!   CONGRATULATIONS!!!!!");
            location.reload();
        }

    }


    tile (ch) {
//        console.log ("tile");
        const el = "l" + this.row + this.col;
        const i = document.getElementById(el);
        i.value = ch;
        if (this.col === 4) {
            this.solveRow();
            this.col = 0;
            if (this.row === 5) {
                alert ("sorry try again");
                location.reload();
            } else {
                this.row++;
            }
        } else {
            this.col++;
        }
    }
    
  render(){
    return React.createElement('button', {onClick: () => setTile ('A')}, 'Good luck!')
  }
}

const buttona = document.querySelector('#buttona');
ReactDOM.render(React.createElement(ButtonA), buttona);

