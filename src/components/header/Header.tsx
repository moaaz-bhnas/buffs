import Container from "../container/Container";
import Logo from "../logo/Logo";
import DesktopNavigation from "./DesktopNavigation";
import MobileNavigation from "./MobileNavigation";

type Props = {};

function Header({}: Props) {
  return (
    <header className="border-b py-1">
      <h1 className="sr-only">Buffs</h1>

      <Container className="!py-0">
        <nav aria-label="main" className="flex items-center justify-between">
          <Logo />

          {/* Mobile navigation */}
          <div className="sm:hidden">
            <MobileNavigation />
          </div>

          {/* Desktop navigation */}
          <div className="hidden sm:block flex-1 ms-6">
            <DesktopNavigation />
          </div>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
