export default function PostSkeleton() {
  return (
    <div className="post-card" aria-hidden="true">
      <div className="placeholder-glow">
        <span className="placeholder col-3 mb-3 d-block"></span>
        <span className="placeholder col-12 d-block mb-2"></span>
        <span className="placeholder col-9 d-block"></span>
      </div>
    </div>
  )
}