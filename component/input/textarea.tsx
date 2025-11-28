import { useRef, useState, useEffect } from "react";
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import LinkOffIcon from '@mui/icons-material/LinkOff';
import { link } from "fs";
type resultType = {
    bold: boolean;
    italic: boolean;
    underline: boolean;
    h1: boolean;
    h2: boolean;
    h3: boolean;
    h4: boolean;
    h5: boolean;
    link: boolean;
};
type Prop = {
    getInnerHTML: (innerHTML: string) => void,
    innerHTML: string,
}
export default function Textarea({ getInnerHTML, innerHTML }: Prop) {
    const editorRef = useRef<HTMLDivElement>(null);
    const [_change, set_change] = useState<number>(0);
    const [_focus, set_focus] = useState<boolean>(false);
    const [_result, set_result] = useState<resultType>({
        bold: false,
        italic: false,
        underline: false,
        h1: false,
        h2: false,
        h3: false,
        h4: false,
        h5: false,
        link: false,
    });
    // const [_value, set_value] = useState<string>("")

    const exec = (cmd: string, value?: string) => {
        document.execCommand(cmd, false, value);
        editorRef.current?.focus();
    };

    useEffect(() => {
        function detectSelectionFormatting() {
            const selection = window.getSelection();
            if (!selection || selection.rangeCount === 0) return null;

            let node = selection.anchorNode as HTMLElement | null;

            // Nếu node là text → lấy parent element
            if (node?.nodeType === Node.TEXT_NODE) {
                node = node.parentElement;
            }

            const result = {
                bold: false,
                italic: false,
                underline: false,
                h1: false,
                h2: false,
                h3: false,
                h4: false,
                h5: false,
                link: false,
            };

            while (node) {
                const tag = node.tagName;
                if (tag === "B" || tag === "STRONG") result.bold = true;
                if (tag === "I" || tag === "EM") result.italic = true;
                if (tag === "U") result.underline = true;
                if (tag === "H1") result.h1 = true;
                if (tag === "H2") result.h2 = true;
                if (tag === "H3") result.h3 = true;
                if (tag === "H4") result.h4 = true;
                if (tag === "H5") result.h5 = true;
                if (tag === "A") result.link = true;
                // if (tag === "BLOCKQUOTE") result.quote = true;

                node = node.parentElement;
            }

            set_result(result);
        }
        detectSelectionFormatting();
        if (editorRef.current) {
            getInnerHTML(editorRef.current?.innerHTML);
        }
    }, [_change, getInnerHTML]);

    useEffect(() => {
        if (editorRef.current) {
            editorRef.current.innerHTML = innerHTML;
        }
    }, [innerHTML]);
    return (
        <div className="w-full p-2 relative">
            {/* Toolbar */}
            <div className={` max-w-max sticky top-2 flex flex-wrap z-10 transition-all duration-300 bg-white  border border-two rounded-md `}>
                <button className="w-12 h-12 flex flex-col justify-center" onClick={() => {
                    if (_result.h1) { exec("formatBlock", "<p>") } else { exec("formatBlock", "<h1>") };
                    set_change(n => n + 1)
                }}>
                    <div className={`font-bold text-five/50 cursor-pointer ${_result.h1 ? "text-three" : ""}`}>H1</div>
                </button>
                <button className="w-12 h-12 flex flex-col justify-center" onClick={() => {
                    if (_result.h2) { exec("formatBlock", "<p>") } else { exec("formatBlock", "<h2>") };
                    set_change(n => n + 1)
                }}>
                    <div className={`font-bold text-five/50 cursor-pointer ${_result.h2 ? "text-three" : ""}`}>H2</div>
                </button>
                <button className="w-12 h-12 flex flex-col justify-center" onClick={() => {
                    if (_result.h3) { exec("formatBlock", "<p>") } else { exec("formatBlock", "<h3>") };
                    set_change(n => n + 1)
                }}>
                    <div className={`font-bold text-five/50 cursor-pointer ${_result.h3 ? "text-three" : ""}`}>H3</div>
                </button>
                <button className="w-12 h-12 flex flex-col justify-center" onClick={() => {
                    if (_result.h4) { exec("formatBlock", "<p>") } else { exec("formatBlock", "<h4>") };
                    set_change(n => n + 1)
                }}>
                    <div className={`font-bold text-five/50 cursor-pointer ${_result.h4 ? "text-three" : ""}`} >H4</div>
                </button>
                <button className="w-12 h-12 flex flex-col justify-center" onClick={() => {
                    if (_result.h5) { exec("formatBlock", "<p>") } else { exec("formatBlock", "<h5>") };
                    set_change(n => n + 1)
                }}>
                    <div className={`font-bold text-five/50 cursor-pointer ${_result.h5 ? "text-three" : ""}`}>H5</div>
                </button>
                <button className="w-12 h-12 flex flex-col justify-center" onClick={() => { exec("bold"); set_change(n => n + 1) }}>
                    <FormatBoldIcon className={`m-auto text-five/50 cursor-pointer ${_result.bold ? "text-three" : ""}`} />
                </button>
                <button className="w-12 h-12 flex flex-col justify-center" onClick={() => { exec("italic"); set_change(n => n + 1) }}>
                    <FormatItalicIcon className={`m-auto text-five/50 cursor-pointer ${_result.italic ? "text-three" : ""}`} />
                </button>
                <button className="w-12 h-12 flex flex-col justify-center" onClick={() => { exec("underline"); set_change(n => n + 1) }}>
                    <FormatUnderlinedIcon className={`m-auto text-five/50 cursor-pointer ${_result.underline ? "text-three" : ""}`} />
                </button>
                <button className="w-12 h-12 flex flex-col justify-center" >
                    {_result.link ?
                        <LinkOffIcon className={`m-auto text-three cursor-pointer`} onClick={() => { exec("unlink"); set_change(n => n + 1) }} /> :
                        <InsertLinkIcon className={`m-auto text-five/50 cursor-pointer`} onClick={() => {
                            const url = prompt("Nhập URL:");
                            if (url) { exec("createLink", url); set_change(n => n + 1) }
                        }} />}
                </button>
            </div>

            {/* WYSIWYG ContentEditable */}
            <div
                ref={editorRef}
                contentEditable
                suppressContentEditableWarning
                className="content-html outline-none cursor-text min-h-48 p-2"
                onMouseUp={() => set_change(n => n + 1)}
                onKeyUp={() => set_change(n => n + 1)}
                onFocus={() => set_focus(true)}
                onBlur={() => set_focus(false)}
            ></div>
        </div>
    );
}
