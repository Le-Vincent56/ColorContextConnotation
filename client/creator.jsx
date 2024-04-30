const React = require('react');
const {createRoot} = require('react-dom/client');
const {useState, useEffect} = React;
const helper = require('./helper.js');

const parseInput = (e) => {
    e.preventDefault();

    // Parse the string
    const currentValue = e.target.value.toUpperCase();
    let newString = currentValue;
    if(newString[0] !== '#') {
        newString = `#${currentValue}`;
    }

    // Set the string
    e.target.value = newString;
}

const handleSubmit = (e) => {
    // Prevent default events
    e.preventDefault();

    // Get the necessary fields
    const title = e.target.querySelector('#title-input').value;
    const author = e.target.querySelector('#author-input').value;
    const body = e.target.querySelector('#text-input').value;
    let background = e.target.querySelector('#background-input').value;

    console.log(`Before parse: ${background}`);

    const re = /[0-9A-Fa-f]{6}/g;
    if(!re.test(background)) {
        background = '#FFFFFF'
    }

    console.log(`After parse: ${background}`);

    // Check if any fields are empty
    if(!title || !author || !body || !background) {
        console.log("All fields are required");
        return false;
    }

    helper.sendPost(e.target.action, {title, author, body, background});
    return false;
}

const generateStory = (e) => {
    e.preventDefault();

    document.querySelector('#text-input').value = `<span style='color:#20b2aa'>I’m late to dinner again, ASTER remarked silently. Having long had the capacity for dutiful adherence to his father’s strict scheduling stamped out of him, ASTER’S remaining ethic was devoted to preparing tomorrow’s essentials for his sister; an alabaster-white silk blouse, impressed with a lone splotch of color from a threaded sunflower–LILY’S favorite; two books, one a massive encyclopedia of native English birds from a prominent London ornithologist, the other a half-empty handwritten logbook, dog-eared with notes penned by the (not yet prominent) amateur ornithologist LILY Elizabeth Gralhund-Smith; and a small tray of tablets–painkillers and blood thinners–to ease the more intense symptoms of LILY’S sickness.</span>
    <br/><br/>
    <span style='color:#20b2aa'>ASTER: </span><span style='color:#475985'>All done.</span>
    <br/><br/>
    <span style='color:#20b2aa'>LILY saved most of her collective strength to interact with ASTER on his visits. This was one of the rare occasions of late that she hadn’t been completely bedridden. As of now, she was laying on the floor examining a tiny ant on the windowsill with a cracked magnifying glass.</span>
    <br/><br/>
    <span style='color:#FFE4E1'>LILY: </span><span style='color:#fdb0a6'>What’s for dinner?</span>
    <br/><br/>
    <span style='color:#20b2aa'>ASTER: </span><span style='color:#475985'>Duck and merengue.</span>
    <br/><br/>
    <span style='color:#FFE4E1'>LILY: </span><span style='color:#fdb0a6'>Merengue?! Save me some?</span>
    <br/><br/>
    <span style='color:#20b2aa'>LILY waves her hands in a brief show of approval and inquiry, continuing to be engrossed by the miniscule movements of the ant. The magnifying glass splinters her eye into two distinct pieces. ASTER smiles softly.</span>
    <br/><br/>
    <span style='color:#20b2aa'>ASTER: </span><span style='color:#475985'>Sure. I’ll save you some.</span>
    <br/><br/>
    <span style='color:#20b2aa'>Just as ASTER turns to leave the room, LILY emits a soft trill. She clicks her tongue once, and speaks with a chiding tone:</span>
    <br/><br/>
    <span style='color:#FFE4E1'>LILY: </span><span style='color:#fdb0a6'>You’re forgetting something.</span>
    <br/><br/>
    <span class='same-line'><span><span style='color:#20b2aa'>ASTER: </span><span style='color:#475985'>I love you.</span></span>
    <span><span style='color:#FFE4E1'>LILY: </span><span style='color: #fdb0a6'>I love yo-</span></span></span>
    <br/><br/>
    <span style='color:#20b2aa'>LILY lets out a single pained wheeze before she finishes the expression. In a doting fashion, ASTER walks to LILY and tenderly lifts her up, placing her in bed and pulling the covers over her torso.</span>
    <br/><br/>
    <span style='color:#20b2aa'>ASTER: </span><span style='color:#475985'>You’ve been out for a while today. Rest now.</span>
    <br/><br/>
    <span style='color:#20b2aa'>LILY nods weakly, letting out a small gasp, a mix of adoration, wistfulness, and devotion. She blows one last kiss towards ASTER before he turns and walks down to the hall, down the stairs and to the left. As he gradually approaches the manor’s dining hall, his smile fades. By the time he enters the room, his demeanor has shifted; a facade for the appeasement of his father has been adopted and he prepares himself for a scolding. His father sits at the head of the table. His mother sits parallel. Both say nothing. There is a tantamount pause before either say anything, as ASTER sits down at his placemat, in between his father and mother. ASTER stares down at his full plate of roasted duck, muscles tensing. He puts a piece of duck in his mouth to stifle conversation.</span>
    <br/><br/>
    <span style='color:#8a81ae'>SAMUEL: </span><span style='color:#604fa4'>You’re late.</span>
    <br/><br/>
    <span style='color:#20b2aa'>ASTER: </span><span style='color:#475985'>I was tending to Lily. It’s not important.</span>
    <br/><br/>
    <span style='color:#20b2aa'>ASTER attempts a tone that sounds apathetic and nonchalant, but his voice crackles hanging on the last word. He silently curses himself for the failure.</span>
    <br/><br/><br/><br/><br/><br/><br/>
    <span style='color:#727272'>It’s half-past five and ASTER is late for dinner. As is typical. The large dining room is oppressively quiet, save for the signature ticking of a grandfather clock. The master of the house, SAMUEL WILLIAM GRALHUND-SMITH, sits alone and in silence. Sitting parallel to him is his wife, ELIZABETH PERRY GRALHUND, who has not said a word in two hours. SAMUEL barely glances at her. The two do not speak.</span>
    <br/><br/>
    <span style='color:#727272'>None but the family doctor has noticed a new behavior of SAMUEL’S; he has started fidgeting. Softly, as he sits down and folds his hands in his lap, the tired leitmotif of the household’s authority figure buckles as his hands, calloused and pockmarked with small blemishes of hyperpigmentation. No one but the most observant could catch even the faintest crack in his stone-faced extremity. He prays his wife has not noticed the weakness yet.</span>
    <br/><br/>
    <span style='color:#727272'>Just as the clock ticks past 5:37, ASTER arrives and takes his place at the table.</span>
    <br/><br/>
    <span style='color:#ffbf00'>ELIZABETH: </span><span style='color:#b38600'>The prodigal son arrives.</span>
    <br/><br/>
    <span style='color:#727272'>Elizabeth chuckles to herself, a dissonant chorus emitting from the confines of her throat. She watches as her son walks in and sits down, and with a sharp glance towards SAMUEL, chuckles again; this time lower, guttural, in some silent solidarity with her own internal banter. She waits for SAMUEL to speak, hanging on the response, her face affixed with a rictus grin. SAMUEL tries to ignore her.</span>
    <br/><br/>
    <span style='color:#727272'>SAMUEL: </span><span style='color:#475b85'>You’re <em>late</em>.</span>
    <br/><br/>
    <span style='color:#6b8b88'>ASTER: </span><span style='color:#7d8aba'>I was tending to Lily. It’s not important.</span>
    <br/><br/>
    <span style='color:#727272'>SAMUEL WILLIAM was raised with all of the foibles that came associated with manhood, and knew no other way than the harsh nature of his upbringing to bear upon his child. Authority was a part of a father’s legacy, and it would be looked upon fondly as hard times break and ebb against the bulwark he has built around his son. He assured himself he was right. Still, the reined look of defiance that he knew his son tried to hide kindled an old, atavistic fire within his heart. He stifled a smile.</span>
    <br/><br/>
    <span style='color:#727272'>SAMUEL: </span><span style='color:#475b85'>I’m tired of the tardiness. You are allowed to be with your sister all day. Your responsibility is to be here on time. That is what you are required to do. It is the <em>bare minimum</em> I ask of you.</span>
    <br/><br/>
    <span style='color:#727272'>SAMUEL watches him utter some unintelligible phrase, and then force down a piece of roasted duck.</span>
    <br/><br/>
    <span style='color:#6b8b88'>ASTER: </span><span style='color:#7d8aba'>Yes.</span>
    <br/><br/>
    <span style='color:#727272'>SAMUEL: </span><span style='color:#475b85'>It is a household duty of yours to listen to your parents. There are consequences to not doing so.</span>
    <br/><br/>
    <span style='color:#6b8b88'>ASTER: </span><span style='color:#7d8aba'>I know.</span>
    <br/><br/>
    <span style='color:#727272'>SAMUEL: </span><span style='color:#475b85'>Yes, <em>sir</em>. Yes, <em>father</em>. ‘Yes, I will, I am sorry for my tardiness, mother and father.’ And put your damn fork down.</span>
    <br/><br/>
    <span style='color:#727272'>There was a slight change in ASTER’S stance. His muscles tense and his eyes grow cold. SAMUEL can immediately tell something is wrong. Nonetheless, the master of the house presses onward.</span>
    <br/><br/>
    <span style='color:#727272'>SAMUEL: </span><span style='color:#475b85'>I’m waiting for a proper address before we can continue eating.</span>
    <br/><br/>
    <span style='color:#20b2aa'>ASTER: </span><span style='color:#7d8aba'>Lily’s dying and you don’t give a damn.</span>
    <br/><br/>
    <span style='color:#727272'>His delivery was succinct and emotionless. SAMUEL raises his eyebrows in slight shock. Before he can utter a retort, ASTER stands up and walks out of the room, stamping down the hallway and up the stairs.</span>
    <br/><br/>
    <span style='color:#727272'>The fight drains from the weary father’s eyes. In former days, he’d have spanked the child for daring to use foul language in his parents’ presence; but recent days had left him unable to discipline anymore. Too preoccupied in melancholy, he thought.</span>
    <br/><br/>
    <span style='color:#727272'>Just as he turns to glance at the door, he catches a glimpse of his wife’s expression. Still in her rictus grin, she caught the gaze of her husband. Blank, hollow eye sockets hidden behind the veneer of glassy-eyed faux blue irises that contained painted imitations of personality. Experience was the only thing that let him cut through the noise and see how simply vacant her complexion was. To most, it was unnerving; to SAMUEL, who had fought and died for his wife until there was nothing left of her to save, it was horrifying. SAMUEL knew better than to be fooled by her by now. Still, the wife-who-was’s words continued to frighten him:</span>
    <br/><br/>
    <span style='color:#ffbf00'>ELIZABETH: </span><span style='color:#b38600'>You’re an astounding parent, Samuel. Surely he’ll grow up safe from those who’d seek to harm him.</span>
    <br/><br/>
    <span style='color:#727272'>SAMUEL had fought on this front for years now and always lost. There was nothing of his wife left anymore; the husk had been filled with some infernal rhetorician that wasn’t who he knew and loved. Still, he cursed himself, even as he grew afraid and quiet under the glare of that thing’s graven smile; when the time came again, he’d be unable to tear himself away from the memory of who she was.</span>
    <br/><br/>
    <span style='color:#727272'>When you die again–SAMUEL repeated to himself, in some self-flagellating mantra–I will bring you back. Just as I always have.</span>
    <br/><br/><br/><br/><br/><br/><br/>
    <span style='color:#20b2aa'>ASTER wrenches himself back up to his sister’s room. He didn’t like to visit at night; the tremblings grew worse, and he could only deal with so much of her whimpering before it broke him. Still, he could not handle the idea of her being alone, so he bravely brought himself to her side. On nights when it was worse, he’d sit by her side all night and hold her hand, talking and reading her stories, or entries from her ornithology encyclopedia. There hadn’t been a quiet night for her in a month. LILY’S shaking had gotten so bad that she would cry out for help and squeeze her brother’s hand with all of her remaining strength. ASTER could do nothing but console her with a lump in his throat, and wait as her strength inevitably gave way to sleep.</span>
    <br/><br/>
    <span style='color:#20b2aa'>Today, it was quiet. For a brief moment, he jumped on the idea that this bad spell might be passing; then, as logic found its way through the annals of his thoughts, his thinking halted. He grew pale.</span>
    <br/><br/>
    <span style='color:#20b2aa'>He rushed into LILY’S room, only to see her lying on her bed, quietly constrained within a tight formation, hugging herself. ASTER breathed a sigh of relief, and sat next to her, looking into her eyes.</span>
    <br/><br/>
    <span style='color:#20b2aa'>ASTER: </span><span style='color:#475985'>I’d be lost without you, love.</span>
    <br/><br/>
    <span style='color:#20b2aa'>She did not respond. Her face was steeped in some combination of serenity and calm. She was lying completely still.</span>
    <br/><br/>
    <span style='color:#20b2aa'>ASTER: </span><span style='color:#475985'>Lily?</span>
    <br/><br/>
    <span style='color:#20b2aa'>She did not respond. ASTER hung on his words, becoming unconfident and disoriented.</span>
    <br/><br/>
    <span style='color:#20b2aa'>ASTER: </span><span style='color:#475985'>…Lily?</span>`;
}

const Header = () => {
    const [colors, setColors] = useState([]);

    useEffect(() => {
        const randomColor = () => {
            return '#' + Math.floor(Math.random() * 16777215).toString(16);
        };

        const colorArray = [
            randomColor(),
            randomColor(),
            randomColor(),
            randomColor()
        ];

        setColors(colorArray);

        const homeText = document.querySelector('#home-text');
        homeText.innerHTML = `
        <a id='home-page-link' href='/' class='nav-link'>
            <h1>
                <span style='color: ${colorArray[0]}'>Color, </span>
                <span style='color: ${colorArray[1]}'>Context, </span>
                <span style='color: ${colorArray[2]}'>and Connotation </span>
            </h1>
        </a>
        `;
    }, []);
}

const Directions = () => {
    return (
        <div id='directions'>
            <h1 id='directions-header'>How-To</h1>
            <div id='directions-explanations'>
                <p id='explanation-1'>
                    This page allows you to upload your very own work to the Color,
                    Context, and Connotation page. You will know how to write some
                    HTML, but we can also outline the process out here for you.
                </p>

                <p id='explanation-2'>
                    First, fill out the basic information: your title, your name, and a background color for the piece.
                    The background color must be in hexadecimal. If invalid hexadecimal is given, then it will place a white
                    background in the final piece, so make sure that the hexadecimal is correct before submitting!

                    Basic HTML looks something like this: &lt;element&gt;. Obviously,
                    there's much more too it, but we can focus on one element for now:
                    &lt;span&gt;. In the box below, write whatever you like, or
                    hit the "generate" button to get our default story, and
                    when you would like to insert a color, wrap the text
                    like so:

                    <br/>
                    <br/>
                    <br/>
                    <span class='centered'>&lt;span&gt;TEXT&lt;/span&gt;</span>
                    <br/>
                    <br/>
                    <br/>

                    However, you'll also need to apply a styling, in which you can
                    insert any hexadecimal code you'd like, such as:

                    <br/>
                    <br/>
                    <br/>
                    <span class='centered'>&lt;span style='color: #000000'&gt;TEXT&lt;/span&gt;</span>
                    <br/>
                    <br/>

                    <span class='centered'>This will return a black-colored text.</span>
                    <br/>
                    <br/>
                    <br/>
                    
                    Here are some other tags you can try when formatting:
                    <br/>
                    <br/>
                    &lt;span class='same-line'&gt;&lt;/span&gt; - Wrap all of the text on the same line, best used
                    when you have two, simultaneous speakers. When using this, you should wrap the speakers in their own empty &lt;span&gt;
                    tags so that the CSS knows how to handle them properly, like this:
                    <br/>
                    <br/>
                    <br/>
                    <span class='centered'>&lt;span class='same-line'&gt;&lt;span&gt;&lt;span style='color: #20b2aa'&gt;ASTER: &lt;/span&gt;
                    &lt;span style='color: #475985'&gt;&lt;/span&gt;&lt;/span&gt;&lt;span&gt;&lt;span style='color: #ffe4e1'&gt;LILY: 
                    &lt;/span&gt;&lt;span style='color: #fdb0a6'&gt;I love yo-&lt;/span&gt;&lt;/span&gt;&lt;/span&gt;</span>
                    <br/>
                    <br/>
                    <br/>
                    <br/>

                    &lt;em&gt;&lt;/em&gt; - This will make anything inside in <em>italics</em>.
                    <br/>
                    <br/>
                    &lt;strong&gt;&lt;/strong&gt; - This will make anything inside in <strong>bold</strong>.
                    <br/>
                    <br/>
                    &lt;span style='background-color:#FFFFFF'&gt; - This will set the background/highlight color of the text inside to a given hexadecimal color
                    <br/>
                    <br/>
                    &lt;br/&gt; - This will create a new line. If you want to create an empty line, do two in a row.
                    <br/>
                    <br/>

                    When you're done, simply hit the "Post" button, and the data base 
                    will take care of the rest. You'll soon be able to see it on the 
                    list of works on the main page. Enjoy!
                </p>
            </div>
        </div>
    )
}

const Creator = () => {
    return (
        <form onSubmit={handleSubmit} action='/postWork' method="POST">
            <div id='form-content'>
                <div id='work-details'>
                    <div id='title-area' class='input-group'>
                        <input id='title-input' required type='text' name='title' class='input'></input>
                        <span class='highlight'></span>
                        <span class='bar'></span>
                        <label>TITLE</label>
                    </div>
                    <div id='author-area' class='input-group'>
                        <input id='author-input' required type='text' name='title' class='input'></input>
                        <span class='highlight'></span>
                        <span class='bar'></span>
                        <label>AUTHOR</label>
                    </div>
                </div>

                <div id='background-area' class='input-group'>
                    <input id='background-input' required type='text' name='background' class='input' maxLength='7'
                    onChange={(e) => parseInput(e)}></input>
                    <span class='highlight'></span>
                    <span class='bar'></span>
                    <label>BACKGROUND</label>
                </div>
                
                <div id='text-area'>
                    <label for='text'>TEXT</label>
                    <textarea id='text-input' name='text' rows='10' required></textarea>
                </div>

                <div id='button-area'>
                    <button id='submit-button' type='submit'>SUBMIT</button>
                    <button id='generate-button' onClick={(e) => {generateStory(e)}}>GENERATE</button>
                </div>

                <div id='message-handler' class='hidden'>
                    <p id='message-text'></p>
                </div>
            </div>
        </form>
    )
}

const LoadPage = () => {
    return (
        <div id='creator-app'>
            <Header/>
            <Directions/>
            <Creator/>
        </div>
    )
}

const init = () => {
    // Load the page
    const root = createRoot(document.getElementById('content'));
    root.render(<LoadPage/>);
};

window.onload = init;