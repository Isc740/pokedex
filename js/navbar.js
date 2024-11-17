document.addEventListener("DOMContentLoaded", () => {
	document.querySelector(".navbar-temp").innerHTML = getNavbar();

	window.addEventListener("scroll", () => {
		const navbar = document.querySelector(".navbar");
		const placeholder = document.querySelector(".navbar-placeholder");
		if (window.scrollY > 102) {
			navbar.classList.add("fixed-top");
			placeholder.style.height = `${102}px`;
		} else {
			navbar.classList.remove("fixed-top");
			placeholder.style.height = "0px";
		}
	});

	document
		.querySelector(".pk-search-navbar")
		.addEventListener("submit", (event) => {
			event.preventDefault();
			const query = document.querySelector(".pk-search-navbar input").value;
			window.location.href = `/views/details.html?id=${query}`;
		});
});

const getNavbar = () => `
	<nav
		class="navbar navbar-expand-lg bg-body-tertiary mb-5 shadow-sm"
		>
		<div class="container-fluid">
			<a class="navbar-brand" href="/index.html">Online Pokedex</a>
			<button
			class="navbar-toggler"
			type="button"
			data-bs-toggle="collapse"
			data-bs-target="#navbarSupportedContent"
			aria-controls="navbarSupportedContent"
			aria-expanded="false"
			aria-label="Toggle navigation"
			>
			<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarSupportedContent">
			<ul class="navbar-nav me-auto mb-2 mb-lg-0">
				<li class="nav-item">
				<a class="nav-link active" aria-current="page" href="/index.html"
					>Home</a
				>
				</li>
			</ul>
			<form class="d-flex pk-search-navbar" role="search">
				<input
				class="form-control me-2"
				type="search"
				placeholder="Pikachu"
				aria-label="Search"
				/>
				<button class="btn btn-dark" type="submit">
				Search
				</button>
			</form>
			</div>
		</div>
		</nav>
	`;
