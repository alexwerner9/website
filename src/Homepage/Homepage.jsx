import { Button } from "semantic-ui-react"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import './Homepage.css'

export const Homepage = props => {

    const navigate = useNavigate();

    return <>
        <div className="basic-page">
            <Button onClick={() => navigate('/about')}>About me</Button>
            <Button onClick={() => {navigate('/games')}}>Games!</Button>
            <Button onClick={() => window.location.href="/graphics"}>Graphics</Button>
        </div>
    </>
}