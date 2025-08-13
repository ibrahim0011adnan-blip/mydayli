document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('taskForm');
    const tasksContainer = document.getElementById('tasksContainer');
    const taskCount = document.getElementById('taskCount');
    const completedCounter = document.getElementById('completedCounter');
    
    let tasks = [];
    
    taskForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const title = document.getElementById('taskTitle').value;
        const description = document.getElementById('taskDescription').value;
        const priority = document.getElementById('taskPriority').value;
        
        if (title.trim() === '') return;
        
        const newTask = {
            id: Date.now(),
            title,
            description,
            priority,
            completed: false
        };
        
        tasks.push(newTask);
        renderTasks();
        taskForm.reset();
    });
    
    function renderTasks() {
        tasksContainer.innerHTML = '';
        
        tasks.forEach(task => {
            const taskElement = document.createElement('div');
            taskElement.className = `task-item ${task.completed ? 'completed' : ''}`;
            taskElement.dataset.id = task.id;
            
            let priorityClass = '';
            let priorityText = '';
            
            if (task.priority === 'high') {
                priorityClass = 'priority-high';
                priorityText = 'بەرز';
            } else if (task.priority === 'medium') {
                priorityClass = 'priority-medium';
                priorityText = 'مامناوەند';
            } else {
                priorityClass = 'priority-low';
                priorityText = 'نزم';
            }
            
            taskElement.innerHTML = `
                <div class="task-priority ${priorityClass}">${priorityText}</div>
                <h3>${task.title}</h3>
                <p>${task.description}</p>
                <div class="task-actions">
                    <button class="complete-btn">${task.completed ? 'نەتەواو' : 'تەواو بوو'}</button>
                    <button class="delete-btn">سڕینەوە</button>
                </div>
            `;
            
            tasksContainer.appendChild(taskElement);
        });
        
        updateCounters();
    }
    
    tasksContainer.addEventListener('click', function(e) {
        const taskElement = e.target.closest('.task-item');
        if (!taskElement) return;
        
        const taskId = parseInt(taskElement.dataset.id);
        const taskIndex = tasks.findIndex(task => task.id === taskId);
        
        if (e.target.classList.contains('delete-btn')) {
            tasks.splice(taskIndex, 1);
            renderTasks();
        } else if (e.target.classList.contains('complete-btn')) {
            tasks[taskIndex].completed = !tasks[taskIndex].completed;
            renderTasks();
        }
    });
    
    function updateCounters() {
        const totalTasks = tasks.length;
        const completedTasks = tasks.filter(task => task.completed).length;
        taskCount.textContent = `(${totalTasks} ئەرک)`;
        completedCounter.textContent = `${completedTasks} لە ${totalTasks} ئەرک تەواو بوون`;
    }
});