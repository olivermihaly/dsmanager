export default function Item({ item }) {
  const totalDownloadedSize = item.additional.file.reduce((acc, file) => acc + file.size_downloaded, 0);
  return (
    <div style={{}}>
      {item.title} {((totalDownloadedSize / item.size) * 100).toFixed(2)}%
      <progress id="file" value={(totalDownloadedSize / item.size) * 100} max="100"></progress>
    </div>
  );
}
