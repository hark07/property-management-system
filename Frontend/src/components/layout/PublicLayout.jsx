import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const PublicLayout = ({ children }) => {
  return (
    <>
      <Navbar />

      <main>{children}</main>

      <Footer />
    </>
  );
};

export default PublicLayout;
