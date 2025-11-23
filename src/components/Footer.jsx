 export default function Footer() {
  return (
    <footer className="bg-white border-t mt-10">
      <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-gray-600 flex justify-between">
        <p>© {new Date().getFullYear()} BookFlow. All rights reserved.</p>
        <p>Built with React & Tailwind.</p>
      </div>
    </footer>
  );
}