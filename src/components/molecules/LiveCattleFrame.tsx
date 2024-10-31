const LiveCattleInfo = () => {
  return (
    <div className="px-8 py-4">
      <iframe
        src="/live-cattle-frame.html"
        width="415"
        height="110"
        title="CEPEA Widget"
        style={{ borderRadius: "32px" }}
      />
    </div>
  );
};

export default LiveCattleInfo;
