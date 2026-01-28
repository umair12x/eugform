import Navbar  from "../../components/StudentNavbar";


export default function RootLayout({ children }) {
 

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
