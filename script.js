document.addEventListener('DOMContentLoaded', function() {
    const todoForm = document.getElementById('todoForm');
    const todoInput = document.getElementById('todoInput');
    const imageInput = document.getElementById('imageInput');
    const todoList = document.getElementById('todoList');
    const toggleDarkMode = document.getElementById('toggleDarkMode');

    let todos = [];

    todoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        addTodo();
    });

    toggleDarkMode.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
    });

    function addTodo() {
        const todoText = todoInput.value.trim();
        if (todoText) {
            const todo = {
                id: Date.now(),
                text: todoText,
                completed: false,
                image: imageInput.files[0] ? URL.createObjectURL(imageInput.files[0]) : null
            };
            todos.push(todo);
            renderTodos();
            todoInput.value = '';
            imageInput.value = '';
        }
    }

    function renderTodos() {
        todoList.innerHTML = '';
        todos.forEach(function(todo) {
            const li = document.createElement('li');
            li.innerHTML = `
                <div>
                    <input type="checkbox" ${todo.completed ? 'checked' : ''}>
                    <span ${todo.completed ? 'style="text-decoration: line-through;"' : ''}>${todo.text}</span>
                </div>
                <div>
                    ${todo.image ? `<img src="${todo.image}" class="todo-image" alt="Todo image">` : ''}
                    <button class="delete-btn">Delete</button>
                </div>
            `;

            const checkbox = li.querySelector('input[type="checkbox"]');
            checkbox.addEventListener('change', function() {
                toggleTodo(todo.id);
            });

            const deleteBtn = li.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', function() {
                deleteTodo(todo.id);
            });

            const todoImage = li.querySelector('.todo-image');
            if (todoImage) {
                todoImage.addEventListener('click', function() {
                    toggleEnlargeImage(todoImage);
                });
            }

            todoList.appendChild(li);
        });
    }

    function toggleTodo(id) {
        todos = todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        renderTodos();
    }

    function deleteTodo(id) {
        todos = todos.filter(todo => todo.id !== id);
        renderTodos();
    }

    function toggleEnlargeImage(img) {
        img.classList.toggle('enlarged');
        let overlay = document.querySelector('.todo-image-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.classList.add('todo-image-overlay');
            document.body.appendChild(overlay);
        }
        overlay.style.display = img.classList.contains('enlarged') ? 'block' : 'none';
        overlay.addEventListener('click', function() {
            img.classList.remove('enlarged');
            overlay.style.display = 'none';
        });
    }
});

