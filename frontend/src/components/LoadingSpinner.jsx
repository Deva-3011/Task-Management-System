function LoadingSpinner({ label = 'Loading tasks...' }) {
  return (
    <div className="loading-wrap">
      <div className="spinner-border text-info" role="status" aria-label={label} />
      <p className="loading-label">{label}</p>
    </div>
  );
}

export default LoadingSpinner;
