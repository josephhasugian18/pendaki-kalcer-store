export default function AboutPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-amber-900 mb-2">About</h1>
      <div className="h-1 w-20 bg-amber-900 rounded mb-6"></div>

      <div className="bg-white p-6 rounded-xl shadow-md leading-relaxed text-gray-700 space-y-4">
        <p>
          Welcome to <span className="font-semibold text-amber-900">Pendaki Kalcer Admin</span>. 
          This panel is designed to make managing product and order data 
          in the <span className="font-semibold">Pendaki Kalcer</span> system easier.
        </p>

        <p>
          With a simple yet modern design, admins can manage important information 
          faster, more efficiently, and securely.
        </p>

        <p className="italic text-gray-500">
          © 2025 Pendaki Kalcer Admin
        </p>
      </div>
    </div>
  );
}
