import Link from "next/link"; // Dynamic routing
import Image from "next/image"; // Images
import { eth } from "state/eth"; // Global state
import { useState } from "react"; // State management
import styles from "styles/components/Header.module.scss"; // Component styles

/**
 * Links to render in action menu
 * @dev Does not render any links where url is undefined, allowing conditional rendering
 */
const actionMenuLinks: {
  name: string;
  icon: string;
  url: string | undefined;
}[] = [
  {
    name: "About",
    icon: "/icons/info.svg",
    url: process.env.NEXT_PUBLIC_ARTICLE,
  },
  {
    name: "Discord",
    icon: "/icons/discord.svg",
    url: process.env.NEXT_PUBLIC_DISCORD,
  },
  {
    name: "Twitter",
    icon: "/icons/twitter.svg",
    url: process.env.NEXT_PUBLIC_TWITTER,
  },
  {
    name: "GitHub",
    icon: "/icons/github.svg",
    url: process.env.NEXT_PUBLIC_GITHUB,
  },
];

// Three dots image data (for second button)
const threeDotsImage: string =
  "data:image/png;base64,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";

export default function Header() {
  // Global state
  const { address, unlock }: { address: string | null; unlock: Function } =
    eth.useContainer();
  // Action menu open state
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  return (
    <div className={styles.header}>
      {/* Logo */}
      <div className={styles.header__logo}>
        <Link href="/">
          <a>
            <Image src="/logo.png" alt="Logo" width={58} height={58} priority />
          </a>
        </Link>
      </div>

      {/* Auth + details */}
      <div className={styles.header__actions}>
        {/* Unlock button */}
        <button onClick={() => unlock()}>
          {!address
            ? // If not connected, render connect wallet
              "Connect Wallet"
            : // Else, render address
              `${address.substr(0, 6)}...
                    ${address.slice(address.length - 4)}`}
        </button>

        {/* Actions button */}
        <button onClick={() => setMenuOpen((previous) => !previous)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={threeDotsImage} alt="settings" />
        </button>
      </div>

      {menuOpen ? (
        // Render actions menu if open
        <div className={styles.header__actionMenu}>
          {actionMenuLinks.map(({ name, icon, url }, i) => {
            // For each link with a defined url
            return url ? (
              // Render action link containing name and image
              <a href={url} target="_blank" rel="noopener noreferrer" key={i}>
                <span>{name}</span>
                <Image src={icon} width={16} height={16} alt={`${name} icon`} />
              </a>
            ) : null;
          })}
        </div>
      ) : null}
    </div>
  );
}
