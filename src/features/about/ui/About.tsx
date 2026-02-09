import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { Item } from "../Item";

const data = "<schedule />";

export const About = () => {
    return (
        <div className="w-full flex px-3">
            <Markdown
                rehypePlugins={[rehypeRaw]}
                components={{
                    // @ts-expect-error
                    schedule: Item,
                }}>
                {data}
            </Markdown>
        </div>
    );
};
