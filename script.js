const projects = [
  {
    title: "Brand Landing Page",
    description: "반응형 UI와 애니메이션이 적용된 브랜드 소개 웹사이트.",
    tags: ["HTML", "CSS", "JavaScript"],
    url: "https://example.com/project-landing",
  },
  {
    title: "Todo App",
    description: "로컬 스토리지 기반으로 일정 관리를 쉽게 할 수 있는 웹 앱.",
    tags: ["JavaScript", "LocalStorage", "UI"],
    url: "https://example.com/project-todo",
  },
  {
    title: "Portfolio Gallery",
    description: "다양한 포트폴리오를 카드 형식으로 깔끔하게 보여줍니다.",
    tags: ["CSS Grid", "Responsive", "Design"],
    url: "https://example.com/project-gallery",
  },
  {
    title: "Interactive Quiz",
    description: "질문과 결과를 바로 확인할 수 있는 인터랙티브 퀴즈 페이지.",
    tags: ["HTML", "JavaScript", "UX"],
    url: "https://example.com/project-quiz",
  },
];

const projectList = document.getElementById("project-list");
const pageSections = document.querySelectorAll(".page-section");
const navLinks = document.querySelectorAll(".site-nav a, .bottom-nav a");
const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");

function createProjectCard(project) {
  const card = document.createElement("article");
  card.className = "project-card";

  const title = document.createElement("h3");
  title.textContent = "";

  const description = document.createElement("p");
  description.textContent = "";

  const tagList = document.createElement("div");
  tagList.className = "project-tags";
  project.tags.forEach(() => {
    const tagElement = document.createElement("span");
    tagElement.className = "tag";
    tagElement.textContent = "";
    tagList.appendChild(tagElement);
  });

  const link = document.createElement("a");
  link.className = "project-link";
  link.href = project.url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = "";

  card.append(title, description, tagList, link);
  return card;
}

function renderProjects() {
  projectList.innerHTML = "";
  projects.forEach((project) => {
    projectList.appendChild(createProjectCard(project));
  });
}

function setActivePage(hash) {
  const pageId = hash ? hash.replace("#", "") : "home";
  let activeSection = document.getElementById(pageId);
  if (!activeSection) {
    activeSection = document.getElementById("home");
    window.history.replaceState(null, "", "#home");
  }

  pageSections.forEach((section) => {
    const isActive = section === activeSection;
    section.classList.toggle("active", isActive);
    section.setAttribute("aria-hidden", isActive ? "false" : "true");
  });

  navLinks.forEach((link) => {
    const targetId = link.getAttribute("href").replace("#", "");
    link.classList.toggle("active", targetId === activeSection.id);
  });

  if (siteNav.classList.contains("show")) {
    siteNav.classList.remove("show");
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function navigateTo(event) {
  const targetId = event.currentTarget.getAttribute("href");
  if (!targetId.startsWith("#")) return;
  event.preventDefault();
  window.location.hash = targetId;
}

navLinks.forEach((link) => link.addEventListener("click", navigateTo));
navToggle.addEventListener("click", () => {
  siteNav.classList.toggle("show");
});

const contactForm = document.getElementById("contact-form");
const contactFeedback = document.getElementById("contact-feedback");

function handleContactSubmit(event) {
  event.preventDefault();
  const email = document.getElementById("visitor-email").value.trim();
  const message = document.getElementById("visitor-message").value.trim();
  if (!email || !message) {
    contactFeedback.textContent = "이메일과 메시지를 모두 입력해주세요.";
    return;
  }
  contactFeedback.textContent = "메시지가 전송되었습니다! 빠르게 확인하겠습니다.";
  contactForm.reset();
}

window.addEventListener("hashchange", () => setActivePage(window.location.hash));
window.addEventListener("load", () => {
  renderProjects();
  setActivePage(window.location.hash || "#home");
  if (contactForm) {
    contactForm.addEventListener("submit", handleContactSubmit);
  }
});
