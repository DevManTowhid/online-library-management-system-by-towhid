// NavItem.js or inline in your dashboard component

function NavItem({ icon, label, active, onClick, isOpen }) {
  return (
    <div 
      onClick={onClick} 
      className={`flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer transition-colors ${active ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400' : 'text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white'}`}
    >
      <div className="w-5 h-5">{icon}</div>
      {isOpen && <span className="text-sm font-medium whitespace-nowrap">{label}</span>}
    </div>
  );
}

export default NavItem;
