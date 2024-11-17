document.addEventListener("DOMContentLoaded", () => {
	document.querySelector(".navbar-temp").innerHTML = getNavbar();

	window.addEventListener("scroll", function () {
		const navbar = document.querySelector(".navbar");
		if (window.scrollY > 150) {
			navbar.classList.add("fixed-top");
		} else {
			navbar.classList.remove("fixed-top");
		}
	});

	document
		.querySelector(".pk-search")
		.addEventListener("submit", function (event) {
			event.preventDefault();
			const query = document.querySelector(".pk-search input").value;
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
			<form class="d-flex pk-search" role="search">
				<input
				class="form-control me-2"
				type="search"
				placeholder="Search"
				aria-label="Search"
				/>
				<button class="btn btn-outline-success" type="submit">
				Search
				</button>
			</form>
			</div>
		</div>
		</nav>
	`;
