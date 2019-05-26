window.addEventListener('load', function () {
    loadUsers();
});

function loadUsers() {

    let ds = fetch('http://localhost:3000/users')
        .then(res => res.json());

    ds.then(data => {
        let element = document.getElementById('userList');
        data.forEach(name => element.insertAdjacentHTML('beforeend', `<li> ${name.name} </li>`));
    });
}