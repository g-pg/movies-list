import Link from "next/link";
import { DesktopNav, MobileNav } from "../Nav/Nav";
import { useSession } from "next-auth/react";
import NavAvatar from "../NavAvatar/NavAvatar";
import { memo, useContext, useEffect, useRef, useState } from "react";
import PrimaryBtn from "../PrimaryBtn/PrimaryBtn";
import { AuthModalContext } from "@/context/AuthModalContext";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";

function Header() {
	const { data: session } = useSession();
	const user = session ? session.user : null;
	const logoLink = user ? "/user" : "/";
	const { setShowAuthModal } = useContext(AuthModalContext);

	const headerRef = useRef();
	const [headerHeight, setHeaderHeight] = useState("");

	useEffect(() => {
		const height = headerRef.current.clientHeight;
		setHeaderHeight(height);
	}, [headerRef]);

	return (
		<>
			<header>
				<div className="container header-wrapper" ref={headerRef}>
					<MobileNav user={user} headerHeight={headerHeight} />
					<Link
						href={logoLink}
						style={{
							textDecoration: "none",
							color: "inherit",
						}}
					>
						<h1>Muvi</h1>
					</Link>
					<ThemeSwitcher />
					<div style={{ marginLeft: "auto" }}>
						<DesktopNav user={user} />
					</div>
					{user ? (
						<NavAvatar user={user} />
					) : (
						<PrimaryBtn
							style={{ padding: "0.3rem 0.8rem" }}
							onClick={() => setShowAuthModal((prev) => !prev)}
						>
							Login
						</PrimaryBtn>
					)}
				</div>
			</header>

			<style jsx>{`
				.header-wrapper {
					display: flex;
					align-items: center;
					justify-content: space-between;
					gap: 1rem;
					padding-block: 0.8rem;
					background: var(--cl-bg);
				}

				h1 {
					color: var(--cl-accent);
					font-size: 1.2rem;
					${user && "margin-left: auto"}
				}

				@media (max-width: 780px) {
					.header-wrapper {
						position: fixed;
						top: 0;
						z-index: 999;
					}

					:global(.container) {
						padding-top: ${headerHeight}px;
					}
				}
			`}</style>
		</>
	);
}

export default memo(Header);
