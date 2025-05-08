const Skeleton = () => {
  return (
    <article className="flex flex-col max-w-60 space-y-2">
        <div className="skeleton h-60 w-60"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-28"></div>
    </article>
  )
}

export default Skeleton