import { Header } from "../Header/Header"
import { Button } from "semantic-ui-react"
import { useNavigate } from "react-router-dom"

export const Games = props => {

    const navigate = useNavigate();

    return <>
        <div className="basic-page">
            <Button onClick={() => {navigate('/games/wordstreak')}}>Wordstreak</Button>
            <Button onClick={() => {navigate('/games/geodistance')}}>Geodistance</Button>
        </div>
    </>
}