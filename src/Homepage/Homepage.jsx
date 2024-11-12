import { Header } from "../Header/Header"
import { Button } from "semantic-ui-react"
import { useNavigate } from "react-router-dom"
import './Homepage.css'

const HomepageButton = props => {
    return <Button className="homepage-button" {...props}>{props.children}</Button>
}

export const Homepage = props => {

    const navigate = useNavigate();

    return <>
        <div className="basic-page">
            <Button onClick={() => navigate('/about')}>About me</Button>
            <Button onClick={() => {navigate('/games')}}>Games!</Button>
        </div>
    </>
}