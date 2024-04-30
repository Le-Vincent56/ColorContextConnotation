const React = require('react');
const {createRoot} = require('react-dom/client');
const {useState, useEffect} = React;
const {useAnimate, stagger, motion} = require('framer-motion');

const staggerMenuItems = stagger(0.1, {startDelay: 0.15});

const useMenuAnimation = (isOpen) => {
    const [scope, animate] = useAnimate();

    useEffect(() => {
        animate(".arrow", {rotate: isOpen ? 180 : 0}, {duration: 0.2});

        animate(
            "ul",
            {
                clipPath: isOpen 
                    ? "inset(0% 0% 0% 0% round 10px)"
                    : "inset(10% 50% 90% 50% round 10px)",
            },
            {
                type: "spring",
                bounce: 0,
                duration: 0.5,
            }
        );

        animate(
            "li",
            isOpen
                ? {opacity: 1, scale: 1, filter: "blur(0px)"}
                : {opacity: 0, scale: 0.3, filter: "blur(20px"},
            {
                duration: 0.2,
                delay: isOpen? staggerMenuItems: 0,
            }
        );
    }, [isOpen]);

    return scope;
}

const setData = async (e, onSetData) => {
    const response = await fetch(`/getPost?id=${e.target.id}`);
    const data = await response.json();

    onSetData(data.post[0]);
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

        const creatorText = document.querySelector('#creator-text');
        creatorText.innerHTML = `
        <a id='creator-page-link' href='/creator' class='nav-link'>
            <h3>
                <span style='color: ${colorArray[3]}'>Creator</span>
            </h3>
        </a>
        `;
    }, []);
}

const Selector = (props) => {
    const [options, setOptions] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const scope = useMenuAnimation(isOpen);

    useEffect(() => {
    const loadDataFromServer = async () => {
        const response = await fetch('/getPosts');
        const data = await response.json();
        setOptions(data.posts);
        props.setData(data.posts[0]);
    }
    loadDataFromServer();
    }, [props.reloadData]);

    const postNodes = options.map(post => {
        return(
            <li id={post.id} onClick={(e) => setData(e, props.setData)}>
                {post.title}
            </li>
        )
    })

    return (
        <div id='menu-container' ref={scope}>
            <motion.button
            id='menu-button'
                whileTap={{ scale: 0.97 }}
                onClick={() => setIsOpen(!isOpen)}
            >
                Menu
                <div class='arrow' style={{transformOrigin: "50% 55%"}}>
                    <svg width='15' height='15' viewBox='0 0 20 20' fill='white'>
                        <path d="M0 7 L 20 7 L 10 16"/>
                    </svg>
                </div>
            </motion.button>
            <ul style={{
                pointerEvents: isOpen ? "auto" : "none",
                clipPath: "inset(10% 50% 90% 50% round 10px)",
            }}
            >
                {postNodes}
            </ul>
        </div>
    )
}

const Content = (props) => {
    useEffect(() => {
        // console.log(JSON.stringify(props.data));
        console.log(props.data.background);
        document.querySelector('#work-title').innerHTML = props.data.title;
        document.querySelector('#work-author').innerHTML = `By ${props.data.author}`;
        document.querySelector('#work-body').innerHTML = props.data.body;
        document.querySelector('#work-body-container').style.backgroundColor = props.data.background;
    }, [props.data]);

    return (
        <div id='work-display'>
            <div id='work-details'>
                <h1 id='work-title'></h1>
                <h3 id='work-author'></h3>
            </div>
            <div id='work-body-container'>
                <p id='work-body'></p>
            </div>
        </div>
    )
}

const LoadPage = () => {
    const [data, setData] = useState({});
    const [reloadData, setReload] = useState(false);

    return(
        <>
        <Header/>
        <Selector triggerReload={() => setReload(!reloadData)} setData={setData}/>
        <Content data={data}/>
        </>
    )
}

const init = () => {
    // Load the page
    const root = createRoot(document.getElementById('content'));
    root.render(<LoadPage/>);
};

window.onload = init;