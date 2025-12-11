// app/(dashboard)/dashboard/layout.jsx

export const metadata = {
  title: "Dashboard",
};

export default function DashboardLayout({ children }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: "250px",
          background: "#f2f2f2",
          padding: "20px",
        }}
      >
        <h2>Dashboard</h2>
        <ul>
          <li>Home</li>
          <li>My Courses</li>
          <li>Settings</li>
        </ul>
      </aside>

      {/* Page Content */}
      <main style={{ flex: 1, padding: "20px" }}>
        {children}
      </main>
    </div>
  );
}
