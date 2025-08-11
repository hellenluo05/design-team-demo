import Landing from "./components/landing";
import Team from "./components/team";
import Gallery from "./components/gallery";
import Footer from "./components/footer";
import Request from "./components/request";

export default function Home() {
  return (
    <div>
      <Landing />
      <Team />
      <Gallery />
      <Request />
      <div className="my-20" />
      <Footer />
    </div>
  );
}
