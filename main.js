function submit() {
    const id = document.getElementById('id').value;
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const message = document.getElementById('txt-message');
    message.innerHTML = ``;
    message.style.color = ``;

    if (!title || !description) {
        message.innerHTML = `Please provide all fields.`;
        message.style.color = `red`;
        return;
    }

    if (id === "") {
        fetch("http://localhost:5000/todos/", {
            method: "POST",
            body: JSON.stringify({
                title: title,
                description: description
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(() => {
            reload();
        });
    }
    else {
        fetch(`http://localhost:5000/todos/${id}`, {
            method: "PUT",
            body: JSON.stringify({
                title: title,
                description: description
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(() => {
            reload();
        });
    }
}

reload();
function reload() {
    document.getElementById('id').value = ``;
    document.getElementById('title').value = ``;
    document.getElementById('description').value = ``;

    fetch("http://localhost:5000/todos/", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => {
            let html = ``;
            data.forEach(k =>
                html += `<tr>
                <td>${k.id}</td>
                <td>${k.title}</td>
                <td>${k.description}</td>
                <td style="text-align: center;">
                    <button type="button" onclick="edit('${k.id}');">Edit</button>
                    <button type="button" onclick="deleteRecord('${k.id}');">Delete</button>
                </td>
                </tr>`
            );

            document.getElementById('tbl-todos').innerHTML = html;
        });
}

function edit(id) {
    fetch(`http://localhost:5000/todos/${id}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => {
            document.getElementById('id').value = data.id;
            document.getElementById('title').value = data.title;
            document.getElementById('description').value = data.description;
        });
}

function deleteRecord(id) {
    fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(() => {
        reload();
    });
}