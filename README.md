# FirstPromotion.in 📮

![React](https://img.shields.io/badge/React-v19-blue) ![Vite](https://img.shields.io/badge/Vite-v5-purple) ![TailwindCSS](https://img.shields.io/badge/Tailwind-v4-cyan) ![Status](https://img.shields.io/badge/Status-Frontend_Ready-green)

**India’s #1 Trusted Hub for Postal Departmental Exams.**
FirstPromotion is a specialized EdTech platform designed to help India Post employees (GDS, MTS, Postman) crack departmental promotion exams like PA/SA, IPO, and PS Group B.

---

## 🚀 Features

### Core Platform
- [cite_start]**Landing Page:** High-conversion design with Hero, Advantages, and Testimonials sections[cite: 30].
- [cite_start]**Course Catalog:** Categorized course listing with dynamic badges (Entry Level vs. Officer Level)[cite: 135].
- [cite_start]**News Ticker:** CSS-animated marquee for urgent departmental alerts[cite: 268].
- [cite_start]**Mobile CTA:** Sticky bottom bar for high-conversion WhatsApp enrollment on mobile devices[cite: 233].

### Student Modules
- [cite_start]**Hall of Fame:** Searchable gallery of successful candidates with mock data integration[cite: 373].
- [cite_start]**Know Your PO:** A knowledge base for postal rules and articles[cite: 395].
- [cite_start]**Latest Updates:** Real-time exam notification feed with priority tagging[cite: 415].

### Authentication & Security
- [cite_start]**Secure Forms:** Login and Signup pages utilizing **React 19 Server Actions** (`useActionState`)[cite: 441, 482].
- [cite_start]**Validation:** Client-side regex validation for Phone (10 digits) and Employee ID (8 digits)[cite: 485].
- [cite_start]**Password Strength:** Real-time password strength meter checking for OWASP standards[cite: 481].

---

## 🛠️ Tech Stack

* [cite_start]**Framework:** [React 19](https://react.dev/) [cite: 12]
* [cite_start]**Build Tool:** [Vite](https://vitejs.dev/) [cite: 12]
* [cite_start]**Styling:** [Tailwind CSS v4](https://tailwindcss.com/) [cite: 12]
* [cite_start]**Routing:** React Router DOM v7 [cite: 12]
* [cite_start]**Icons:** Lucide React [cite: 12]
* [cite_start]**Linting:** ESLint with React Hooks & Refresh plugins[cite: 13].

---

## ⚙️ Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/firstpromotion.git](https://github.com/your-username/firstpromotion.git)
    cd firstpromotion
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  **Build for production:**
    ```bash
    npm run build
    ```

---

## 📂 Project Structure

```text
src/
├── assets/            # Static images (Hero, Logos)
├── components/        # Reusable UI (Navbar, Footer, CourseCards)
├── pages/             # Route views (Home, Login, Dashboard)
├── constants.js       # Global config (Phone numbers, Batch text)
├── App.jsx            # Main Router configuration
└── main.jsx           # Entry point
