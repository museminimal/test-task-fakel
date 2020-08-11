'use strict';

let projectsTab = document.querySelector('#project-tab');
let usersTab = document.querySelector('#users-tab');

let projectsTableBody = document.querySelector('.projects tbody');
let usersTableBody = document.querySelector('.users tbody');
let tableBody = document.querySelector('.table-body');

let projectsSearchButton = document.querySelector('.projects-button--search');
let usersSearchButton = document.querySelector('.users-button--search');

let projectsClearButton = document.querySelector('.projects-button--clear');
let usersClearButton = document.querySelector('.users-button--clear');

let projectFilterInput = document.querySelector('.project-filter');
let userFilterInput = document.querySelector('.user-filter');

function createProjectRow(project) {
    return `
        <tr class="projects__project">
            <td class="project__projectId user__info">${project.projectId}</td>
            <td class="project__title user__info">${project.title}</td>
            <td class="project__description user__info">${project.description}</td>
            <td class="project__authorId user__info">${project.authorId}</td>
            <td class="project__phone user__info">${project.phone}</td>
        </tr>
    `;
}

function createUserRow(user) {
    return `
        <tr class="users__user">
            <td class="user__id user__info">${user.id}</td>
            <td class="user__first-name user__info">${user.firstName}</td>
            <td class="user__last name user__info">${user.lastName}</td>
            <td class="user__address user__info">${user.adress.city} ${user.adress.streetAddress}</td>
            <td class="user__email user__info">${user.email}</td>
            <td class="user__phone user__info">${user.phone}</td>
            <td class="user__description user__info">${user.description}</td>
        </tr>
    `;
}

function setProjects() {
    fetch('http://www.filltext.com/?rows=300&projectId={number|1000}&title={business}&description={lorem|32}&authorId={number|1000}&phone={phone|(xxx)xxx-xx-xx}&billing={ccNumber|DISC}')
        .then(response => response.json())
        .then(data => {
            data.forEach(function (item) {
                projectsTableBody.innerHTML += createProjectRow(item);
            });

            projectsSearchButton.addEventListener('click', function(event) {
                projectsTableBody.innerHTML = '';

                let filtered = data.filter(item => item.title.toLowerCase().indexOf(projectFilterInput.value.toLowerCase()) >= 0);

                if (projectFilterInput.value !== '') {
                    filtered.forEach(item => projectsTableBody.innerHTML += createProjectRow(item));
                } else {
                    data.forEach(item => projectsTableBody.innerHTML += createProjectRow(item));
                }
            });

            projectsClearButton.addEventListener('click', function() {
                projectFilterInput.value = '';

                data.forEach(item => projectsTableBody.innerHTML += createProjectRow(item));
            });
        });
}

function setUsers() {
    fetch('http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&adress={addressObject}&description={lorem|32}')
        .then(response => response.json())
        .then(data => {
            data.forEach(function (item) {
                usersTableBody.innerHTML += createUserRow(item);
            });

            usersSearchButton.addEventListener('click', function(event) {
                usersTableBody.innerHTML = '';

                let filtered = data.filter(item => item.email.toLowerCase().indexOf(userFilterInput.value.toLowerCase()) >= 0);

                if (userFilterInput.value !== '') {
                    filtered.forEach(item => usersTableBody.innerHTML += createUserRow(item));
                } else {
                    data.forEach(item => usersTableBody.innerHTML += createUserRow(item));
                }
            });

            usersClearButton.addEventListener('click', function() {
                userFilterInput.value = '';

                data.forEach(item => usersTableBody.innerHTML += createUserRow(item));
            });
        });
}

window.onload = () => {
    usersTab.addEventListener('click', setUsers);
    projectsTab.addEventListener('click', setProjects);
    tableBody.addEventListener("click", function(event) {
        event.target.closest('tr').classList.toggle('background-turquoise');
    });
}







