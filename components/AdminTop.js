import { useRouter } from "next/navigation";

export default function AdminTop({ onLogout }) {
  const router = useRouter();

  return (
    <>
      <div className="absolute right-6 p-0 m-0 flex justify-center items-center overflow-hidden h-10 md:h-[36px] md:mt-0">
        <button
          onClick={async () => {
            await fetch("/api/admin/logout", { method: "POST" });
            onLogout();
            router.push("/");
          }}
          className="h-[100px] bg-[var(--white-text-color)] text-[var(--blue-text-color)] text-[18px] font-bold rounded-full cursor-pointer  shadow-[inset_0_2px_20px_rgba(101,197,242,0.3)] z-30 m-0 px-3 transition-all duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] md:text-[20px] 
          md:rounded-[200px] md:px-6 hover:bg-[#cae4fa] focus:bg-[#cae4fa] active:bg-[#cae4fa] focus-visible:bg-[#cae4fa]"
        >
          Logout
        </button>
      </div>
      <h2 className="text-3xl font-bold mb-7 mt-14 md:mt-2 text-center">
        Admin Dashboard
      </h2>
    </>
  );
}
