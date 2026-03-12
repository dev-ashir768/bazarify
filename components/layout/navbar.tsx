import Image from "next/image";

const Navbar = () => {
  return (
    <>
      <nav className="container absolute top-0 left-0 right-0 w-full z-50 flex items-center justify-center py-6">
        <Image src="/images/svg/logo.svg" alt="Logo" width={150} height={90} />
      </nav>
    </>
  );
};

export default Navbar;
