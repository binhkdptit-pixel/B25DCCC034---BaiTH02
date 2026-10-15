interface Props {
  message: string;
  onRetry: () => void;
}

export default function ErrorState({ message, onRetry }: Props) {
  return (
    <div className="state state--error" role="alert">
      <p className="state__title">Không tải được dữ liệu</p>
      <p>{message}</p>
      <button type="button" className="btn" onClick={onRetry}>
        Thử lại
      </button>
    </div>
  );
}
