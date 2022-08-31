import { Outlet } from 'react-router-dom'
import { Header } from '../../components/Header'
import { LayoutContaiter } from './styles'

export function DefaultLayout() {
    return (
        <LayoutContaiter>
            <Header />
            <Outlet />
        </LayoutContaiter>
    )
}