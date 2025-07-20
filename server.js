const express = require('express');
const path = require('path');
const cors = require('cors');
const WebSocket = require('ws');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));

// In-memory storage for demo
let todos = [];
let todoIdCounter = 1;

// API Routes for HTMX examples

// Simple hello endpoint
app.get('/api/hello', (req, res) => {
    res.send(`
        <h4>🎉 Hello from HTMX!</h4>
        <p>This content was loaded via AJAX from the server at ${new Date().toLocaleTimeString()}!</p>
        <p>No JavaScript required!</p>
    `);
});

// Slow data endpoint (simulates network delay)
app.get('/api/slow-data', (req, res) => {
    setTimeout(() => {
        res.send(`
            <h4>📊 Data Loaded!</h4>
            <p>This simulated a slow API call (1 second delay).</p>
            <p>Loaded at: ${new Date().toLocaleTimeString()}</p>
        `);
    }, 1000);
});

// Form submission endpoint
app.post('/api/submit', (req, res) => {
    const { username } = req.body;
    res.send(`
        <div class='response-area'>
            <h4>✅ Form Submitted Successfully!</h4>
            <p>Welcome, <strong>${username}</strong>!</p>
            <p>Your form was submitted at: ${new Date().toLocaleTimeString()}</p>
            <p>This data was processed on the server.</p>
        </div>
    `);
});

// Search endpoint
app.get('/api/search', (req, res) => {
    const query = req.query.q || '';
    if (!query) {
        return res.send('<p>Start typing to search...</p>');
    }
    
    const results = [
        'Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 
        'Fig', 'Grape', 'Honeydew', 'Kiwi', 'Lemon'
    ].filter(fruit => fruit.toLowerCase().includes(query.toLowerCase()));
    
    res.send(`
        <h4>🔍 Search Results for "${query}":</h4>
        ${results.length > 0 ? 
            `<ul>${results.map(fruit => `<li>${fruit}</li>`).join('')}</ul>` : 
            '<p>No results found.</p>'
        }
        <p><small>Search performed at: ${new Date().toLocaleTimeString()}</small></p>
    `);
});

// Hover endpoint
app.get('/api/hover', (req, res) => {
    res.send(`
        <p>👋 Mouse entered at: <strong>${new Date().toLocaleTimeString()}</strong></p>
        <p>Random number: ${Math.floor(Math.random() * 1000)}</p>
    `);
});

// Todo endpoints
app.get('/api/todos', (req, res) => {
    const todoHtml = todos.map(todo => `
        <div class='todo-item' style='background: #f0fff4; padding: 10px; margin: 5px 0; border-radius: 4px; border-left: 4px solid #38a169; display: flex; justify-content: space-between; align-items: center;'>
            <span>✓ ${todo.task}</span>
            <button hx-delete='/api/todos/${todo.id}' 
                    hx-target='closest .todo-item' 
                    hx-swap='outerHTML'
                    style='background: #e53e3e; color: white; border: none; font-size: 12px; padding: 4px 8px; border-radius: 3px; cursor: pointer;'>
                Delete
            </button>
        </div>
    `).join('');
    
    res.send(todoHtml || '<p style="color: #666; text-align: center;">No tasks yet. Add one above!</p>');
});

app.post('/api/todos', (req, res) => {
    const { task } = req.body;
    if (!task) {
        return res.status(400).send('<p style="color: red;">Task cannot be empty!</p>');
    }
    
    const newTodo = {
        id: todoIdCounter++,
        task: task,
        createdAt: new Date()
    };
    todos.push(newTodo);
    
    res.send(`
        <div class='todo-item' style='background: #f0fff4; padding: 10px; margin: 5px 0; border-radius: 4px; border-left: 4px solid #38a169; display: flex; justify-content: space-between; align-items: center;'>
            <span>✓ ${newTodo.task}</span>
            <button hx-delete='/api/todos/${newTodo.id}' 
                    hx-target='closest .todo-item' 
                    hx-swap='outerHTML'
                    style='background: #e53e3e; color: white; border: none; font-size: 12px; padding: 4px 8px; border-radius: 3px; cursor: pointer;'>
                Delete
            </button>
        </div>
    `);
});

app.delete('/api/todos/:id', (req, res) => {
    const todoId = parseInt(req.params.id);
    todos = todos.filter(todo => todo.id !== todoId);
    res.send(''); // Empty response removes the element
});

// Polling endpoint for live updates
app.get('/api/poll', (req, res) => {
    const now = new Date();
    res.send(`
        <p>🕐 Live time: <strong>${now.toLocaleTimeString()}</strong></p>
        <p>Random value: ${Math.floor(Math.random() * 100)}</p>
    `);
});

// Advanced examples endpoints

// Fade content with animation
app.get('/api/fade-content', (req, res) => {
    res.send(`
        <div class="fade-in">
            <h4>🎬 Animated Content!</h4>
            <p>This content faded in smoothly using CSS transitions.</p>
            <p>Loaded at: ${new Date().toLocaleTimeString()}</p>
        </div>
    `);
});

// Error demo endpoint
app.get('/api/error-demo', (req, res) => {
    res.status(500).send(`
        <div class="error-message">
            <h4>❌ Server Error!</h4>
            <p>This is a simulated 500 error response.</p>
            <p>Time: ${new Date().toLocaleTimeString()}</p>
        </div>
    `);
});

// Success after error
app.get('/api/success-after-error', (req, res) => {
    res.send(`
        <div style="background: #f0fff4; border: 1px solid #68d391; color: #22543d; padding: 10px; border-radius: 4px;">
            <h4>✅ Success!</h4>
            <p>This request completed successfully.</p>
            <p>Time: ${new Date().toLocaleTimeString()}</p>
        </div>
    `);
});

// Live time for polling
app.get('/api/live-time', (req, res) => {
    const now = new Date();
    res.send(`${now.toLocaleTimeString()}`);
});

// Update multiple targets
app.get('/api/update-multiple', (req, res) => {
    const timestamp = new Date().toLocaleTimeString();
    res.send(`<strong>Updated:</strong> ${timestamp}`);
});

// Add item
app.get('/api/add-item', (req, res) => {
    const itemNumber = Math.floor(Math.random() * 1000);
    res.send(`
        <div style="background: #e6fffa; border: 1px solid #4fd1c7; padding: 10px; margin: 5px 0; border-radius: 4px;">
            <strong>New Item #${itemNumber}</strong> - Added at ${new Date().toLocaleTimeString()}
        </div>
    `);
});

// Event demo
app.get('/api/event-demo', (req, res) => {
    res.send(`
        <h4>🔥 Events Fired!</h4>
        <p>Check your browser console to see the HTMX events that were triggered.</p>
        <p>Events fired at: ${new Date().toLocaleTimeString()}</p>
    `);
});

// Headers demo
app.get('/api/headers-demo', (req, res) => {
    const customHeader = req.headers['x-custom-header'] || 'Not provided';
    const requestedWith = req.headers['x-requested-with'] || 'Not provided';
    
    res.send(`
        <h4>📋 Request Headers Received:</h4>
        <ul>
            <li><strong>X-Custom-Header:</strong> ${customHeader}</li>
            <li><strong>X-Requested-With:</strong> ${requestedWith}</li>
            <li><strong>User-Agent:</strong> ${req.headers['user-agent'] || 'Not provided'}</li>
            <li><strong>Content-Type:</strong> ${req.headers['content-type'] || 'Not provided'}</li>
        </ul>
        <p><small>Request processed at: ${new Date().toLocaleTimeString()}</small></p>
    `);
});

// Selective data demo
app.post('/api/selective-data', (req, res) => {
    const receivedData = req.body;
    
    res.send(`
        <h4>📊 Data Received by Server:</h4>
        <pre style="background: #f7fafc; padding: 10px; border-radius: 4px; overflow-x: auto;">
${JSON.stringify(receivedData, null, 2)}
        </pre>
        <p>Notice that only the "included" field was sent to the server.</p>
        <p><small>Processed at: ${new Date().toLocaleTimeString()}</small></p>
    `);
});

// Swap demo endpoints
app.get('/api/swap-inner', (req, res) => {
    res.send('<strong>innerHTML:</strong> Content replaced inside the element');
});

app.get('/api/swap-outer', (req, res) => {
    res.send('<div id="swap-demo" class="response-area"><strong>outerHTML:</strong> Entire element replaced</div>');
});

app.get('/api/swap-beforeend', (req, res) => {
    res.send('<p><strong>beforeend:</strong> Added to the end</p>');
});

app.get('/api/swap-afterbegin', (req, res) => {
    res.send('<p><strong>afterbegin:</strong> Added to the beginning</p>');
});

// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'learn-htmx.html'));
});

const server = app.listen(PORT, () => {
    console.log(`🚀 HTMX Learning Server running at http://localhost:${PORT}`);
    console.log(`📖 Open your browser and visit: http://localhost:${PORT}`);
});

// WebSocket Server
const wss = new WebSocket.Server({ server });

let messageCount = 0;
const connectedClients = new Set();

wss.on('connection', (ws) => {
    connectedClients.add(ws);
    console.log(`📡 WebSocket client connected. Total clients: ${connectedClients.size}`);
    
    // Send welcome message
    ws.send(JSON.stringify({
        type: 'connection',
        message: 'Connected to WebSocket server!',
        timestamp: new Date().toLocaleTimeString(),
        clientCount: connectedClients.size
    }));
    
    // Handle incoming messages
    ws.on('message', (data) => {
        try {
            const message = JSON.parse(data);
            messageCount++;
            
            // Broadcast message to all connected clients
            const broadcastData = {
                type: 'message',
                id: messageCount,
                username: message.username || 'Anonymous',
                message: message.message,
                timestamp: new Date().toLocaleTimeString()
            };
            
            connectedClients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(broadcastData));
                }
            });
        } catch (error) {
            console.error('WebSocket message error:', error);
        }
    });
    
    // Handle client disconnect
    ws.on('close', () => {
        connectedClients.delete(ws);
        console.log(`📡 WebSocket client disconnected. Total clients: ${connectedClients.size}`);
    });
    
    // Handle errors
    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
        connectedClients.delete(ws);
    });
});

// Send periodic updates to all connected clients
setInterval(() => {
    if (connectedClients.size > 0) {
        const updateData = {
            type: 'update',
            message: 'Server heartbeat',
            timestamp: new Date().toLocaleTimeString(),
            serverTime: new Date().toISOString(),
            connectedClients: connectedClients.size
        };
        
        connectedClients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(updateData));
            }
        });
    }
}, 30000); // Every 30 seconds