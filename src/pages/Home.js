import { IonBadge, IonButton, IonButtons, IonContent, IonFooter, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonPage, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react';
import { addOutline, callOutline, chevronBack, phonePortraitOutline, search, trashOutline } from 'ionicons/icons';
import { useState } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import styles from './Home.module.scss';

const Home = () => {

	const [ employees, setEmployees ] = useState([
		{
			id: 1,
			name: "Alan Montgomery",
			title: "Mobile Team Lead",
			avatar: "https://pbs.twimg.com/profile_images/1349059994747076610/8dWvipvu_400x400.jpg"
		},
		{
			id: 2,
			name: "Max Lynch",
			title: "Mobile Team Lead",
			avatar: "https://pbs.twimg.com/profile_images/1349059994747076610/8dWvipvu_400x400.jpg"
		},
		{
			id: 3,
			name: "Mike Hartington",
			title: "Mobile Team Lead",
			avatar: "https://pbs.twimg.com/profile_images/1349059994747076610/8dWvipvu_400x400.jpg"
		},
		{
			id: 4,
			name: "Matt Netkow",
			title: "Mobile Team Lead",
			avatar: "https://pbs.twimg.com/profile_images/1349059994747076610/8dWvipvu_400x400.jpg"
		},
		{
			id: 5,
			name: "Ben Sperry",
			title: "Mobile Team Lead",
			avatar: "https://pbs.twimg.com/profile_images/1349059994747076610/8dWvipvu_400x400.jpg"
		}
	]);

	const [ results, setResults ] = useState(employees);

	const remove = (id) => {

		document.getElementById(`employeeItem_${ id }`).classList.add("animate__slideOutRight");
		const tempEmployees = [ ...employees ];
		const newEmployees = tempEmployees.filter(e => parseInt(e.id) !== parseInt(id));
		setEmployees(newEmployees);
	}

	const search = (e) => {

		const searchTerm = e.currentTarget.value;

		if (searchTerm !== "") {

			const searchTermLower = searchTerm.toLowerCase();

			const newResults = results.filter(e => e.name.toLowerCase().includes(searchTermLower));
			setResults(newResults);
		} else {

			setResults(employees);
		}
	}

	return (
		<IonPage className={ styles.page }>

			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonButton color="light">
							<IonIcon icon={ chevronBack } />
							&nbsp;Employee List
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>

			<IonContent fullscreen className={ styles.content }>
				<div className={ styles.mainContent }>
					{/* <ExploreContainer /> */}

					<IonSearchbar onKeyUp={ e => search(e) } placeholder="Search..." icon={ search } slot="end" />

					<IonList>
						{ results.map((employee, index) => {

							return (

								<IonItem id={ `employeeItem_${ employee.id }` } className={ ` ${ styles.employeeItem } animate__animated animate__fadeIn` } key={ index } lines="none">
									<img src={ employee.avatar } alt="employee avatar" />

									<IonLabel>
										<h2>{ employee.name }</h2>
										<p>{ employee.title }</p>
									</IonLabel>

									<IonButton onClick={ () => remove(employee.id) }>
										<IonIcon icon={ trashOutline } />
									</IonButton>
								</IonItem>
							);
						})}
					</IonList>
				</div>
			</IonContent>

			<IonFooter>
				<IonButton expand="block">Add new employee</IonButton>
			</IonFooter>
		</IonPage>
	);
};

export default Home;
