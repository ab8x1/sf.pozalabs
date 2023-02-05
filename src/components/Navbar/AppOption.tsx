import { useState, useEffect } from 'react'
import { AppOptionsProps } from './navbarTypes'
import { Icon, Options, Option } from './navbarStyles'
import { NextRouter, useRouter } from 'next/router'
import Link from 'next/link'

function AppOptionComponent({info, mainUrl, routes}: AppOptionsProps){
    const [isOpened, setIsOpened] = useState<boolean>(false);
    const router: NextRouter = useRouter();
    const {name, img} = info;
    const {asPath} = router;
    const appOpened = asPath.includes(mainUrl);

    useEffect(() => {
        if(appOpened) setIsOpened(true);
        else setIsOpened(false);
    }, [asPath])

    return(
        <Option selected={!isOpened && appOpened}>
            <span onClick={() => setIsOpened(!isOpened)}><Icon src={img}/> {name}</span>
            {
                isOpened &&
                <Options>
                    {
                        routes.map(({name, url}) =>
                            <Option key={url} selected={asPath === `/${mainUrl}/${url}`}>
                                <Link href={`/${mainUrl}/${url}`}><Icon src={`/navbar/${url}.png`}/>{name}</Link>
                            </Option>
                        )
                    }
                </Options>
            }
        </Option>
    )
}
export default AppOptionComponent;