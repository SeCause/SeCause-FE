export default function BackgroundGrid() {
  return (
    <>
      <div className="bg-dot-grid pointer-events-none absolute inset-0 mask-[radial-gradient(circle_at_center,black,transparent_70%)] opacity-15" />
      <div className="bg-blue/5 pointer-events-none absolute top-[16%] left-1/2 size-100 -translate-x-1/2 rounded-full blur-3xl" />
    </>
  );
}
