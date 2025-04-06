import { logout } from '@/lib/auth';

<header className="bg-white shadow p-4 flex justify-between items-center">
  <h1 className="text-indigo-700 font-bold text-lg">Admin Dashboard</h1>
  <button
    onClick={logout}
    className="text-sm px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 transition"
  >
    Logout
  </button>
</header>