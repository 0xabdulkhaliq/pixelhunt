export default function Modal({ visibility, children }) {
  return (
    visibility && (
      <div className="grid place-items-center fixed bg-[#0007] px-3 backdrop-blur-sm inset-0 min-h-screen">
        {children}
      </div>
    )
  );
}
