import { IonButton, IonButtons, IonCardSubtitle, IonContent, IonFooter, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonPage, IonSearchbar, IonToolbar } from '@ionic/react';
import { chevronBack, trashOutline } from 'ionicons/icons';
import { useState } from 'react';
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
			title: "CEO | Co Founder",
			avatar: "https://pbs.twimg.com/profile_images/1318970727173885953/bln98FNj_400x400.jpg"
		},
		{
			id: 3,
			name: "Mike Hartington",
			title: "Senior Dev Rel",
			avatar: "https://pbs.twimg.com/profile_images/1084993841898446849/DJ8XtR6L_400x400.jpg"
		},
		{
			id: 4,
			name: "Matt Netkow",
			title: "Head of Product Marketing",
			avatar: "https://pbs.twimg.com/profile_images/1323383930150621187/GKc0nVzi_400x400.jpg"
		},
		{
			id: 5,
			name: "Ben Sperry",
			title: "CDO | Co Founder",
			avatar: "https://pbs.twimg.com/profile_images/1328390491126308864/jHHgl5Dm_400x400.jpg"
		},
		{
			id: 6,
			name: "Liam DeBeasi",
			title: "Software Engineer",
			avatar: "https://pbs.twimg.com/profile_images/1105953692669366273/ZNK4lRAJ_400x400.jpg"
		}
	]);

	const [ results, setResults ] = useState(employees);

	const remove = (id) => {

		document.getElementById(`employeeItem_${ id }`).classList.add("animate__slideOutRight");

		setTimeout(() => {

			const tempEmployees = [ ...employees ];
			const newEmployees = tempEmployees.filter(e => parseInt(e.id) !== parseInt(id));
			setResults(newEmployees);
			setEmployees(newEmployees);
		}, 700);
	}

	const search = (e) => {

		const searchTerm = e.currentTarget.value;

		if (searchTerm !== "") {

			const searchTermLower = searchTerm.toLowerCase();

			const newResults = employees.filter(e => e.name.toLowerCase().includes(searchTermLower));
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

					<IonCardSubtitle>{ results.length } { (results.legnth === 1) ? "employee" : "employees" } found</IonCardSubtitle>
					<IonSearchbar onKeyUp={ e => search(e) } onKeyPress={ e => search(e) } placeholder="Search..." icon={ search } slot="end" />

					<IonList>
						{ results.map((employee, index) => {

							return (

								<IonItem id={ `employeeItem_${ employee.id }` } className={ ` ${ styles.employeeItem } animate__animated animate__fadeIn` } key={ employee.id } lines="none">
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