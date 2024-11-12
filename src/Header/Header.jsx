import { Button } from 'semantic-ui-react'
import './Header.css'

export const Header = props => {
    return (
        <div id="header">
            <Button className="header-button">Home</Button>
            <Button className="header-button">About me</Button>
            <Button className="header-button">Games</Button>
        </div>
    )
}