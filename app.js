let form = document.getElementById("form");
let resultDiv = document.getElementById("result");

form.addEventListener("submit", (e) => {
	e.preventDefault();
	let username = document.getElementById("username").value.trim();

	if (username) {
		fetch(`https://api.github.com/users/${username}`)
			.then((response) => response.json())
			.then((dataUser) => afficherUser(dataUser))
			.catch((error) => (resultDiv.innerHTML = `<p class="error">Erreur : ${error.message}</p>`));
	} else {
		resultDiv.innerHTML = `<p class="error">Veuillez entrer un nom d'utilisateur.</p>`;
	}
});

// Fonction principale pour récupérer les données d'un utilisateur GitHub
function afficherUser(user) {
	if (user.message == "Not Found") {
		resultDiv.innerHTML = `<p class="error">Utilisateur non trouvé.</p>`;
	} else {
		resultDiv.innerHTML = "";
		// Afficher les informations
		let card = document.createElement("div");
		card.classList.add("card");
		card.innerHTML = `<img src="${user.avatar_url}" alt="Avatar de ${user.login}">
			<h2>${user.login}</h2>
			<h3>${user.name}</h3>
      <p>Utillisateur créé le ${new Date(user.created_at).toLocaleDateString()}, il y a ${calculDateCreation(
			user.created_at
		)} jours</p>
      <p>Nombre de repos: ${user.public_repos}</p>
			<a href="${user.html_url}"><button class="button">Voir</button></a>`;
		resultDiv.appendChild(card);
	}
}

function calculDateCreation(dateString) {
	const creationDate = new Date(dateString);
	const currentDate = new Date();
	const diffTime = Math.abs(currentDate - creationDate);
	return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convertir en jours
}
