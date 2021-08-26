import React, { Component } from 'react';
import '../pages/AllCards.css'
import OneCardItemList from '../components/CardsList/OneCardItemList'
import apiHandler from '../api/apiHandler';
import SearchBar from '../components/SearchBar/SearchBar';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';

export class AllCards extends Component {
    state = {
        cards: [],
        loadingPage: false,
        page: 1,
        prevY: 0,
        name: ""
    }

    getAllPokemons(page){
        this.setState({
            loading: true
        });

        apiHandler.getApiByPage(page)
        .then((res) => {
            this.setState({cards: [...this.state.cards, ...res.data]});
            this.setState({loading: false});
        })
        .catch(err => {
            console.log(err)
        })
    }

    getPokemonsByName = (name, page) => {
        this.setState({ loading: true });
        apiHandler.filterApiByName(name, page)
        .then((res) => {
            this.setState({
                cards: [...this.state.cards, ...res.data],
                loadingPage: true
            });
        })
        .catch(error => console.log(error))

    }


    handleObserverAll(entities, observer){
        const y = entities[0].boundingClientRect.y;
        if (this.state.prevY > y){
           
            const curPage = this.state.page + 1;
            this.getAllPokemons(curPage);
            this.setState({page: curPage})
        }
        this.setState({prevY: y})
    }


    handleObserverName(entities, observer){
        const y = entities[0].boundingClientRect.y;
        if (this.state.prevY > y){
           
            const curPage = this.state.page + 1;
            this.getPokemonsByName(this.state.name, curPage);
            this.setState({page: curPage})
        }
        this.setState({prevY: y})
    }

    handleNameInputChange = (input) => {
        this.setState({
            name: input
        })
    }

    addCard = async (apiId) => {
        try {
            await apiHandler.addCard({pokemonTCGId: apiId});
        } catch (error) {console.error(error)}
    }

    componentDidMount(){
        this.getAllPokemons(this.state.page);
        var options = {
            root: null,
            rootMargin: "0px",
            threshold: 1.0
        }

        this.observer = new IntersectionObserver(
            this.handleObserverAll.bind(this),
            options
        );

        this.observer.observe(this.loadingRef)
    }

    async componentDidUpdate(prevProp, prevState) {
        if(this.state.name !== prevState.name) {
            // console.log(this.state.name)
            this.getPokemonsByName(this.state.name, this.state.page);
            console.log(this.state.cards)

            var options = {
                root: null,
                rootMargin: "0px",
                threshold: 1.0
            }
    
            this.observer = new IntersectionObserver(
                this.handleObserverName.bind(this),
                options
            );
    
            this.observer.observe(this.loadingRef)
        }

        if(this.state.name !== prevState.name && this.state.name === "") {
            this.getAllPokemons(this.state.page)
        }
    }

    render() {
        const loadingCSS = {
            height: "100px",
            margin: "30px"
          };

        const loadingTextCSS = { display: this.state.loading ? "block" : "none" };

        

        return (
            <div className="container">
                <h1>Hello</h1>
                <SearchBar 
                name={this.state.name}
                handleNameInputChange={this.handleNameInputChange}
                />

                {this.state.loadingPage && 
                <Loading />}
                
                <div style={{ minHeight: "800px", display: "flex", "flexWrap": "wrap" }}>
                    {this.state.cards.map(card => (
                        <OneCardItemList card={card}>
                            <div>
                                <Link to={"/cards/" + card.id}>Card details</Link>
                                <button onClick={() => {this.addCard(card.id)}}>Add Card</button>
                            </div>
                        </OneCardItemList>

                    ))}
                </div>
                
                <div
                ref={loadingRef => (this.loadingRef = loadingRef)}
                style={loadingCSS}
                >
                    {this.state.cards.length > 0 && 
                    <Loading style={loadingTextCSS}/>}

                {/* <span style={loadingTextCSS}>Loading...</span> */}
                </div>
      </div>
        )
    }
}

export default AllCards

