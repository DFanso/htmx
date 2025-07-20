# 🚀 Interactive HTMX Learning Tutorial

A comprehensive, hands-on tutorial for learning HTMX through interactive examples. This project includes a complete web application with a working backend that demonstrates all core and advanced HTMX features.

## 📖 What You'll Learn

- **Core HTMX Concepts**: GET/POST requests, targeting, swapping, triggers
- **Advanced Features**: Custom headers, error handling, animations, events
- **Real-world Examples**: Forms, search, todo app, live updates
- **Best Practices**: Progressive enhancement, accessibility, performance

## 🎯 Features

### Interactive Examples (12+ Demos)
1. **Basic AJAX Requests** - Simple GET requests with `hx-get`
2. **Loading Indicators** - Built-in loading states with `htmx-indicator`
3. **Form Submissions** - POST requests without page reloads
4. **Content Swapping** - Different strategies for inserting content
5. **Custom Triggers** - Mouse events, keyboard input, timers
6. **CSS Animations** - Smooth transitions with content updates
7. **Error Handling** - Graceful error responses and user feedback
8. **Auto-Refresh/Polling** - Live data updates every second
9. **Advanced Targeting** - Complex selectors and multiple targets
10. **JavaScript Integration** - HTMX events and custom behavior
11. **Request Configuration** - Custom headers and selective form data
12. **Todo Application** - Full CRUD operations with real persistence

### Working Backend
- **Express.js Server** with real API endpoints
- **Complete CRUD Operations** for todo management
- **Error Simulation** for testing error handling
- **Live Data Updates** with timestamps and random values
- **Header Inspection** to see request details

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd htmx
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm start
   ```

4. **Open your browser**
   ```
   http://localhost:3000
   ```

### Development Mode
For auto-restart during development:
```bash
npm run dev
```

## 📁 Project Structure

```
htmx/
├── learn-htmx.html    # Main tutorial page with all examples
├── server.js          # Express.js backend with API endpoints
├── package.json       # Dependencies and scripts
├── .gitignore         # Git ignore rules
└── README.md          # This file
```

## 🛠 API Endpoints

The server provides the following endpoints for the tutorial examples:

### Core Examples
- `GET /api/hello` - Simple greeting response
- `GET /api/slow-data` - Simulated slow response (1s delay)
- `POST /api/submit` - Form submission processing
- `GET /api/search?q=term` - Live search functionality

### Advanced Examples
- `GET /api/fade-content` - Animated content with CSS transitions
- `GET /api/error-demo` - Simulated 500 error response
- `GET /api/live-time` - Current time for polling examples
- `GET /api/headers-demo` - Request header inspection
- `POST /api/selective-data` - Selective form data processing

### Todo Application
- `GET /api/todos` - Retrieve all todos
- `POST /api/todos` - Create new todo
- `DELETE /api/todos/:id` - Delete specific todo

### Content Swapping
- `GET /api/swap-inner` - innerHTML replacement
- `GET /api/swap-outer` - outerHTML replacement
- `GET /api/swap-beforeend` - Append content
- `GET /api/swap-afterbegin` - Prepend content

## 🎓 Learning Path

1. **Start with basics** - Click through examples 1-6 to understand core concepts
2. **Explore advanced features** - Try examples 7-12 for deeper understanding
3. **Experiment** - Modify the code and see how changes affect behavior
4. **Check the console** - Watch HTMX events fire as you interact
5. **Read the source** - Examine both HTML and server code

## 🔍 Key HTMX Attributes Covered

| Attribute | Purpose | Example |
|-----------|---------|---------|
| `hx-get` | Make GET request | `hx-get="/api/data"` |
| `hx-post` | Make POST request | `hx-post="/api/submit"` |
| `hx-target` | Where to put response | `hx-target="#result"` |
| `hx-swap` | How to insert content | `hx-swap="innerHTML"` |
| `hx-trigger` | When to make request | `hx-trigger="click"` |
| `hx-headers` | Custom request headers | `hx-headers='{"X-Custom": "value"}'` |
| `hx-include` | Include/exclude form data | `hx-include="false"` |

## 🎨 HTMX Events Demonstrated

- `htmx:beforeRequest` - Before request starts
- `htmx:afterRequest` - After request completes
- `htmx:beforeSwap` - Before content is swapped
- `htmx:afterSwap` - After content is swapped
- `htmx:responseError` - When request fails

## 🌟 Best Practices Shown

- **Progressive Enhancement** - Works without JavaScript
- **Semantic HTML** - Proper form structure and accessibility
- **Error Handling** - Graceful degradation and user feedback
- **Loading States** - Visual feedback during requests
- **Event Handling** - Custom behavior with HTMX events

## 📚 Additional Resources

- [HTMX Official Documentation](https://htmx.org/docs/)
- [HTMX Examples](https://htmx.org/examples/)
- [HTMX Discord Community](https://htmx.org/discord)
- [Hypermedia Systems Book](https://hypermedia.systems/)

## 🤝 Contributing

Feel free to improve this tutorial:

1. Fork the repository
2. Create a feature branch
3. Add new examples or improve existing ones
4. Submit a pull request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

**Happy Learning!** 🎉

Start your HTMX journey by running `npm start` and opening `http://localhost:3000` in your browser.