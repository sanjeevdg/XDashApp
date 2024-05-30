import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coy } from "react-syntax-highlighter/dist/cjs/styles/prism";

const getLanguageAndHighlights = (value) => {

    //Sample javascript{1,3,6}
    const pattern = /\{([^}]+)\}/g;
    let language = '';
    let lineHighlights = [];
    if (value && typeof value === 'string') {
        language = value.replace(pattern, '');
        const highlights = value.match(pattern);
        if (highlights && typeof highlights === 'object' && highlights.length === 1) {
            lineHighlights = highlights[0].replace('{', '').replace('}', '').split(",").map(Number);
        }
    }

    return { 'language': language, 'lineHighlights': lineHighlights };
}

export default function CodeBlockRenderer(props) {
    const { language, lineHighlights } = getLanguageAndHighlights(props.language);
    const value = props.value;
    console.log('triggered-props==',props);
    return (
        <SyntaxHighlighter language={language} style={coy} showLineNumbers={true} wrapLines={true}
            lineProps={lineNumber => {
                let style = { backgroundColor: "" };
                if (lineHighlights && lineHighlights.includes(lineNumber)) {
                    style.backgroundColor = '#79cada';
                }

                return { style };
            }}
        >
            {value}
        </SyntaxHighlighter>
    );
} 	