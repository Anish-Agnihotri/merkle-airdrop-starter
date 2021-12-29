import Meta from "components/Meta"; // Components: Meta
import Header from "components/Header"; // Components: Header
import type { ReactElement } from "react"; // Types

export default function Layout({
  children,
}: {
  children: ReactElement | ReactElement[];
}) {
  return (
    <div>
      <Meta />
      <Header />
      <div>{children}</div>
    </div>
  );
}
