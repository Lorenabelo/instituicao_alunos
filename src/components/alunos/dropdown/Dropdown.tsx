interface DropdownProps {
    onEdit: () => void;
    onDelete: () => void;
}
  
const Dropdown = ({ onEdit, onDelete }: DropdownProps) => (
<div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
    <ul>
    <li>
        <button
        onClick={onEdit}
        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
        >
        Editar
        </button>
    </li>
    <li>
        <button
        onClick={onDelete}
        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
        >
        Deletar
        </button>
    </li>
    </ul>
</div>
);

export default Dropdown;
  