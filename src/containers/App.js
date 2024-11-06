import React from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import '../index.css'


class App extends React.Component {
    constructor() {
        super()
        this.state = {
            robots: [],
            searchfield: '',
            isScrolled: false 
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response=> response.json())
            .then(users => this.setState({ robots: users}));

        window.addEventListener('scroll', this.handleScroll);
        }
    
    componentWillUnmount() {
        // NEW: Clean up event listener when the component unmounts
        window.removeEventListener('scroll', this.handleScroll);
    }

    // NEW: Method to handle scroll
    handleScroll = () => {
        if (window.scrollY > 50) { // Adjust the value based on when you want the effect to start
            this.setState({ isScrolled: true });
        } else {
            this.setState({ isScrolled: false });
        }
    }


    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value })
    }

    render() {
        
        const { robots, searchfield, isScrolled } = this.state;
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchfield.toLowerCase());
        })
        return !robots.length ? 
        <h1 className="righteous-regular">Loading</h1> :
        (
            <div className='tc'>
                <div className={`sticky-top ${isScrolled ? 'scrolled' : ''}`}>
                <h1 className="righteous-regular f1">RoboFriends</h1>
                <SearchBox searchChange={this.onSearchChange}/>
                </div>
                <div className='card-list-container'>
                    <CardList robots={filteredRobots}/>
                </div>
            </div>
        );
    }
}


export default App;