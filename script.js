const menuToggle = document.querySelector(".menu-toggle");
const siteMenu = document.querySelector("#site-menu");
const toast = document.querySelector(".toast");

document.querySelectorAll('a[href^="#"]').forEach((link) => {
	link.addEventListener("click", (event) => {
		const target = document.querySelector(link.getAttribute("href"));
		if (!target) return;
		event.preventDefault();
		target.scrollIntoView({ behavior: "smooth" });
		if (siteMenu) siteMenu.classList.remove("is-open");
		if (menuToggle) menuToggle.setAttribute("aria-expanded", "false");
	});
});

menuToggle?.addEventListener("click", () => {
	const isOpen = siteMenu.classList.toggle("is-open");
	menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".lab-toggle").forEach((button) => {
	button.addEventListener("click", () => {
		const details = document.getElementById(button.getAttribute("aria-controls"));
		if (!details) return;
		const isExpanded = button.getAttribute("aria-expanded") === "true";
		details.hidden = isExpanded;
		button.setAttribute("aria-expanded", String(!isExpanded));
		button.textContent = isExpanded ? "View Details" : "Hide Details";
	});
});

document.querySelectorAll(".resume-trigger").forEach((button) => {
	button.addEventListener("click", () => {
		toast.textContent = button.dataset.resumeMessage;
		toast.classList.add("is-visible");
		window.clearTimeout(button.resumeToastTimer);
		button.resumeToastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 3200);
	});
});

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
	const revealObserver = new IntersectionObserver((entries, observer) => {
		entries.forEach((entry) => {
			if (!entry.isIntersecting) return;
			entry.target.classList.add("is-visible");
			observer.unobserve(entry.target);
		});
	}, { threshold: 0.12 });
	revealItems.forEach((item) => revealObserver.observe(item));
} else {
	revealItems.forEach((item) => item.classList.add("is-visible"));
}