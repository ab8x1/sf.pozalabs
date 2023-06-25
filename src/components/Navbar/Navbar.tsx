import { useState, useRef, useEffect } from 'react'
import { Navbar, ToggleNavbar, TopMenu, AppOptions, Logo, Options, Option, Icon, ConnectMetamask } from './navbarStyles'
import AppOption from './AppOption'
import { NextRouter, useRouter } from 'next/router'
import Link from 'next/link'
import useClickOutside from '../../hooks/useClickOutside'
import TopNavbar from './TopNavbar'
import { route } from './navbarTypes'
import { relative } from 'path'
import Image from 'next/image'

const bagRoutes: route[] = [{ url: "borrower", name: "Borrower" }, { url: "lender", name: "Lender" }, { url: "employer", name: "Employer" }, { url: "activeLoans", name: "Active Loans" }];
const idRoutes: route[] = [{ url: "subscriber", name: "Subscriber" }, { url: "owner", name: "Owner" }];
const perpetualBetsRoutes: route[] = [{ url: "buyer", name: "Buyer" }, { url: "writer", name: "Writer" }];

function NavbarComponent() {
    const [open, setOpen] = useState<boolean>(false);
    const router: NextRouter = useRouter();
    const toogleNavRef = useRef<HTMLDivElement>(null);

    useClickOutside(toogleNavRef, () => setOpen(false));

    useEffect((): void => {
        setOpen(false);
    }, [router.asPath])
    console.log(router.asPath);
    return (
        <Navbar>
            <TopNavbar open={open} setOpen={setOpen} />
            <ToggleNavbar ref={toogleNavRef} open={open}>
                <Logo><Link href="/"><Image src="/logo.svg" width={174} height={50} alt="Pozalabs logo" quality={100} /></Link></Logo>
                <div style={{ flex: 1, position: 'relative' }}>
                    <AppOptions>
                        <Option selected={router.asPath === "/"}><Link href="/"><Icon src="/navbar/dashboard.png" />Dashboard</Link></Option>
                        <AppOption info={{ name: "Borrow against salary", img: "/navbar/bag.svg" }} mainUrl='borrow-agains-salary' routes={bagRoutes} />
                        <AppOption info={{ name: "Instant distribution", img: "/navbar/ida.svg" }} mainUrl='instant-distribution' routes={idRoutes} />
                        <Option selected={router.asPath === "/sentinel-dao"}><Link href="/sentinel-dao"><Icon src="/navbar/sentinel-dao.svg" />Sentinel Dao</Link></Option>
                        <AppOption info={{ name: "Perpetual bets", img: "/navbar/ida.svg" }} mainUrl='perpetual-bets' routes={perpetualBetsRoutes} />
                        <Option selected={router.asPath === "/flow-splitter"}><Link href="/flow-splitter"><Icon src="/navbar/flow-splitter.svg" />Flow Splitter</Link></Option>
                    </AppOptions>
                </div>
            </ToggleNavbar>
        </Navbar>
    )
}
export default NavbarComponent;