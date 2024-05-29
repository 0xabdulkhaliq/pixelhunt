export default function Modal({ visibility, children }) {
  return (
    visibility && (
      <div className="flex flex-col justify-center items-center gap-4 fixed bg-[#0007] px-3 backdrop-blur-sm inset-0 min-h-screen">
        {children}
      </div>
    )
  );
}
