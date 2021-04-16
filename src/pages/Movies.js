import { IonButton, IonButtons, IonCardSubtitle, IonContent, IonFooter, IonHeader, IonIcon, IonInfiniteScroll, IonInfiniteScrollContent, IonItem, IonLabel, IonList, IonPage, IonRow, IonSearchbar, IonToolbar } from '@ionic/react';
import { chevronBack, trashOutline } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import styles from './Home.module.scss';

const Movies = () => {

	const [ movies, setMovies ] = useState([]);
	const [ currentPage, setCurrentPage ] = useState(1);
	const [ searchTerm, setSearchTerm ] = useState("");
	const [ totalResults, setTotalResults ] = useState(0);

	const search = (e) => {

		const searchTermVal = e.currentTarget.value;

		if (searchTermVal !== "") {

			const searchTermLower = searchTermVal.toLowerCase();
			searchData(searchTermLower);
			setSearchTerm(searchTermLower);
		} else {

			getData(true, 1);
			setSearchTerm("");
			setCurrentPage(1);
		}
	}

	const searchData = async (searchTermVal, page = 1) => {

		const imageBaseURL = "https://image.tmdb.org/t/p/w200";
		const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=24600637ab41d89f6dd63b4c52e8b14e&query=${ searchTermVal }&page=${ page }`);
		const data = await response.json();

		data.results.forEach(movie => {

			var imageURL = "";
			
			if (movie.poster_path !== null) {
				
				imageURL = `${ imageBaseURL }${ movie.poster_path }`;
			} else {

				imageURL = "https://critics.io/img/movies/poster-placeholder.png";
			}

			movie.image = imageURL;
		});

		console.log("in more");
		console.log(data.results);

		setTotalResults(data.total_results);
		page === 1 ? setMovies(data.results) : setMovies([ ...movies, ...data.results ]);
	}

	const getData = async (initialFetch = true, page = 1) => {

		if (initialFetch) {

			console.log("initial fetch of movies");
		}
		const imageBaseURL = "https://image.tmdb.org/t/p/w200";
		const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=24600637ab41d89f6dd63b4c52e8b14e&page=${ page }`);
		const data = await response.json();

		data.results.forEach(movie => {

			var imageURL = "";
			
			if (movie.poster_path !== null) {
				
				imageURL = `${ imageBaseURL }${ movie.poster_path }`;
			} else {

				imageURL = "https://critics.io/img/movies/poster-placeholder.png";
			}
			
			movie.image = imageURL;
		});

		console.log(data);

		setTotalResults(data.total_results);
		initialFetch ? setMovies(data.results) : setMovies([ ...movies, ...data.results ]);
	}

	useEffect(() => {
		
		getData();
	}, []);

	const fetchMore = async e => {

		console.log("in more");
		const newPage = currentPage + 1;
		await setCurrentPage(newPage);

		searchTerm === "" ? getData(false, newPage) : searchData(searchTerm, newPage);
		e.target.complete();
	}

	return (
		<IonPage className={ styles.page }>

			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonButton routerLink="/" routerDirection="back" color="light">
							<IonIcon icon={ chevronBack } />
							&nbsp;Movie List
						</IonButton>
					</IonButtons>

					<div className={ styles.searchContainer }>
						<IonCardSubtitle>{ totalResults } { (totalResults === 1) ? "movie" : "movies" } found</IonCardSubtitle>
						<IonSearchbar onKeyUp={ e => search(e) } onKeyPress={ e => search(e) } placeholder="Search..." icon={ search } slot="end" />
					</div>
				</IonToolbar>
			</IonHeader>

			<IonContent fullscreen className={ styles.content }>
				<IonList>
					{ movies.map((movie, index) => {

						return (

							<IonItem id={ `employeeItem_${ movie.id }` } className={ ` ${ styles.employeeItem } animate__animated animate__fadeIn` } key={ movie.id } lines="none">
								<img src={ movie.image } alt="employee avatar" />

								<IonLabel>
									<h2>{ movie.title }</h2>
									<p>{ movie.overview }</p>
								</IonLabel>
							</IonItem>
						);
					})}

					<IonInfiniteScroll threshold="200px" onIonInfinite={ fetchMore }>
						<IonInfiniteScrollContent loadingSpinner="bubbles" loadingText="Getting more movies...">
						</IonInfiniteScrollContent>
					</IonInfiniteScroll>
				</IonList>
			</IonContent>

			<IonFooter>
				<IonButton expand="block">Add a Movie</IonButton>
			</IonFooter>
		</IonPage>
	);
};

export default Movies;