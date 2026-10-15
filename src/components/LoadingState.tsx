export default function LoadingState() {
  return (
    <div className="state state--loading" role="status" aria-live="polite">
      <span className="spinner" aria-hidden="true" />
      <p className="state__title">Đang tải dữ liệu thời tiết…</p>
    </div>
  );
}
