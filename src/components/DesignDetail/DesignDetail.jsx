import ChatHistory from "./ChatHistory";
import PreviewGallery from "./PreviewGallery";
import ActionBar from "./ActionBar";

const DesignDetail = () => {
  return (
    <div className="flex flex-1 overflow-hidden p-6 gap-6">
      <aside className="w-1/2 bg-white p-6 rounded-lg shadow-lg overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">Chat History</h2>
        <ChatHistory />
        <ActionBar />
      </aside>
      <main className="flex-1 bg-gray-100 p-6 rounded-lg shadow-lg overflow-y-auto">
        <PreviewGallery />
      </main>
    </div>
  );
};

export default DesignDetail;
