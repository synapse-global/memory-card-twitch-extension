import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { useCombinedDataStore } from "@/shared/stores/useCombinedDataStore";

export const About = () => {
  const { about } = useCombinedDataStore((state) => ({
    about: state.about,
  }));
  return (
    <div className="w-full flex px-3">
      <Markdown rehypePlugins={[rehypeRaw]}>{about?.content}</Markdown>
    </div>
  );
};
