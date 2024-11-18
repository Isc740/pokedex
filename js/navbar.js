document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".navbar-temp").innerHTML = getNavbar();

    const navbar = document.querySelector(".navbar");
    const placeholder = document.querySelector(".navbar-placeholder");
    const navbarHeight = navbar.offsetHeight;

    window.addEventListener("scroll", () => {
        if (window.scrollY > navbarHeight) {
            navbar.classList.add("fixed-top");
            placeholder.style.height = `${navbarHeight}px`;
        } else {
            navbar.classList.remove("fixed-top");
            placeholder.style.height = "0px";
        }
    });

    document
        .querySelector(".pk-search-navbar")
        .addEventListener("submit", (event) => {
            event.preventDefault();
            const query = document.querySelector(
                ".pk-search-navbar input",
            ).value;
            window.location.href = `/views/details.html?id=${query}`;
        });
});

const getNavbar = () => `
	<nav
		class="navbar navbar-expand-md bg-body-tertiary mb-5 shadow-sm navbar-light"
		>
		<div class="container-fluid">
			<a class="navbar-brand" href="/index.html">Online Pokedex</a>
			<button
			class="navbar-toggler"
			type="button"
			data-bs-toggle="collapse"
			data-bs-target="#navbar-toggler"
			aria-controls="navbarSupportedContent"
			aria-expanded="false"
			aria-label="Toggle navigation"
			>
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbar-toggler">
				<ul class="navbar-nav me-auto mb-2 mb-lg-0">
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
