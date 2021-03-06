'use strict';

class ButtonA extends React.Component {
    
    constructor(props) {
        super(props);
        this.keyFunction = this.keyFunction.bind(this);
        this.row = 0;
        this.col = 0;
        this.guess = '';
        
        const wordList = new Array(
            "ABOUT","ABOVE","ABORT",
            "ACORN","ACTOR",
            "ADULT",
            "AFTER",
            "AGENT","AGILE",
            "ALTER","ALERT","ALOFT","ALIEN","ALONG","ALONE",
            "AMEND","AMBER","AMONG",
            "APRON",
            "AROMA",
            "ATONE",
            "AUDIO",
            "AWFUL",
            "BADGE","BASIC","BATCH",
            "BEADY","BELOW","BENCH","BEING","BEAST",
            "BINGE","BIRTH",
            "BLINK","BLAND","BLEND","BLACK","BLOCK","BLIND","BLOKE","BLOND","BLOWN",
            "BOARD","BOAST",
            "BRAIN","BRAND","BRAWN","BRACE",
            "BREAD","BREAK",
            "BRICK","BRIDE","BRIEF","BRING","BRINE","BRINK",
            "BROWN","BROKE",
            "BUILD","BUILT",
            "CABIN","CAUSE","CAULK","CATER",
            "CHEAP","CHEAT","CHEST",
            "CHOSE","CHIME","CHART","CHAIR","CHILD","CHORE","CHOIR",
            "CLEAR","CLOSE","CLEAN","CLOAK","CLAIM","CLIMB","CLONE","CLOTH","CLOUD",
            "COACH","COVER","COWER",
            "COULD","COUNT","COUGH","COURT",
            "CRISP","CRAFT","CREAM",
            "CRAWL","CRASH","CRANK","CRATE","CRAZY",
            "CREAK","CREAM","CREST","CRIMP","CROWN","CRUSH",
            "DAILY",
            "DELAY","DEPTH","DEPOT",
            "DITCH",
            "DODGE","DOUBT","DOZEN",
            "DRIVE","DREAM","DRAIN","DRAFT","DRINK","DRIVE","DRONE",
            "EIGHT","EARTH","ENJOY","EQUAL","EARLY","EMPTY","ENTRY","EQUIP","EXIST","EPOXY",
            "FABLE","FACET","FAITH","FALSE","FARCE","FAVOR",
            "FIELD","FIRST","FIBER","FINAL","FIFTH","FIFTY","FIGHT",
            "FLOAT","FLUTE","FLUID","FLASH","FLOUT","FLAKE","FLING","FLUKE",
            "FRAME","FRESH","FRONT","FRANK","FROTH",
            "FOUND","FORCE","FOCUS",
            "FUDGE",
            "GAMER","GAWKY","GECKO",
            "GHOST",
            "GIRTH",
            "GLEAM","GIANT","GLOAT","GLOBE","GLOVE",
            "GRAPE","GRADE","GRATE","GRAIN","GRANT","GRACE","GRAND","GRAVY",
            "GREAT",
            "GRIND","GROUP","GROAN",
            "GRUNT",
            "GUARD","GUEST","GUIDE",
            "HABIT","HAIRY",
            "HEART","HEARD","HEAVY",
            "HOARD","HOMER","HORSE","HOUSE","HOTEL",
            "HUMAN","HUMOR",
            "INPUT","IDEAL","INDEX","IMAGE",
            "JOINT","JUDGE",
            "KNEAD",
            "LARGE","LAYER","LABOR","LAPSE","LAUGH","LATER","LATCH",
            "LEARN","LEAST",
            "LIGHT","LINER",
            "LOWER","LOGIC","LOSER","LOVER",
            "LUCKY","LUNCH","LUNAR",
            "LYING",
            "MAGIC","MACHO","MARCH","MATCH","MAYBE","MAYOR","MAJOR",
            "METAL","MEDIA",
            "MIDST","MINUS","MIXED","MIGHT","MINOR","MIRTH",
            "MODEL","MONTH","MOUNT","MORAL","MOUSE","MOUTH","MOVIE","MOIST","MOURN","MONEY",
            "MUSIC","MUNCH",
            "NACHO","NASTY",
            "NIGHT","NOISE","NORTH","NOVEL","NURSE",
            "OCEAN","OFTEN","OTHER",
            "PAINT","PANEL","PAUSE","PARTY",
            "PESKY",
            "PHASE",
            "PIETY","PILOT","PINTO","PITCH",
            "PHONE","PLANE","PLANT","PLACE","PLAIN","PLATE","PLEAT",
            "POINT","POWER",
            "PRICE","PRONE","PRIME","PRIDE","PRIMO","PRINT","PRIZE","PROUD","PROVE",
            "PURGE",
            "QUACK","QUERY","QUITE","QUICK","QUOTE","QUIET","QUAKE",
            "RABID","RAISE","RADIO",
            "READY","REACT","REACH",
            "RIGHT",
            "ROUND","ROBIN","ROAST",
            "RUSTY",
            "SABLE","SAUTE",
            "SCALE","SCOUR",
            "SHARE","SHIFT","SHINE","SHINY","SHIRT","SHORT","SHARK","SHEIK","SHONE","SHAPE","SHAKE","SHOWY",
            "SLUNG",
            "SMILE","SMASH","SMITE",
            "SNAKE","SNARE","SNIPE","SNOUT","SNORE",
            "SOLVE","SOLAR","SOUND","SOLID",
            "SPLIT","SPICE","SPORT","SPACE","SPOIL","SPENT",
            "STAND","STACK","STAGE","STAMP",
            "STEAM",
            "STORK","STORM","STORY","STOCK","STONE",
            "SUGAR",
            "TABLE",
            "THOSE","THORN","THANK","THEIR","THING","THINK","THUMP",
            "TIPSY",
            "TODAY",
            "TRADE","TRAIN","TRICK","TREAT",
            "UNDER","UNCLE","UNTIL",
            "ULCER","ULTRA",
            "VALUE","VOWEL","VIRAL","VOTER",
            "WAIST","WATCH","WATER",
            "WEIGH",
            "WHILE","WHACK",
            "WIDTH","WINCE",
            "WORLD","WOMAN","WOULD",
            "WRITE","WRONG",
            "YEAST","YACHT","YIELD"
            );
            const wordOffset = Math.floor(Math.random() * wordList.length);
            this.word = wordList [wordOffset];
            this.validWords = new Set(wordList)
        }
        keyFunction(event){
            if (event.key.length > 1) return;
            if (
                event.key < 'A' || 
                event.key > 'Z' && event.key < 'a' || 
                event.key > 'z') return;
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
            if (!this.validWords.has(this.guess)) {
                alert('Not a valid word');
                this.col = 0;
                for (let off = 0; off < 5; off++) {
                    const el = "l" + this.row + off;
                    const i = document.getElementById(el);
                    i.value = ' ';
                }
                this.row--;
                this.guess = '';
                return;
            }
            
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

            this.guess = '';
            
        }
        
        
        tile (ch) {
            if (ch === '\b') {
                if (this.col > 0) { this.col-- }
                return;
            }
            this.guess += ch;
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
    
