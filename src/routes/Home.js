import KiwiTextArea from "../components/kiwiTextArea";
import Timeline from "../components/timeline";

export default function Home() {
  return (
    <div className="flex flex-col gap-2 py-3 justify-around items-center">
      <Timeline />
      <KiwiTextArea />
    </div>
  );
}
