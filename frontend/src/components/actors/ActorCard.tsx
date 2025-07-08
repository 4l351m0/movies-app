import { User, X } from 'lucide-react';
import { FC } from 'react';
import type { Actor } from '../../types/actor.types';

interface ActorCardProps {
  actor: Actor;
  onDelete?: (id: string) => void;
}

function formatDate(dateString?: string) {
  if (!dateString) return '';
  const d = new Date(dateString);
  if (isNaN(d.getTime())) return dateString;
  return d.toISOString().slice(0, 10);
}

const ActorCard: FC<ActorCardProps> = ({ actor, onDelete }) => {
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this actor?')) {
      try {
        await import('../../services/actors/ActorsService').then(m => m.deleteActor(actor.id));
        if (onDelete) onDelete(actor.id);
      } catch (e) {
        alert('Error deleting actor');
      }
    }
  };
  return (
    <div className="flex flex-col items-center bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-4 max-w-32 group cursor-pointer relative">
      {/* Botón eliminar solo visible en hover */}
      <button
        onClick={handleDelete}
        className="absolute top-2 right-2 bg-red-600 rounded-full p-1 z-10 hover:bg-red-700 transition-colors opacity-0 group-hover:opacity-100"
        style={{ width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        title="Delete actor"
      >
        <X className="w-3 h-3 text-white" />
      </button>
      <div className="relative mb-3">
        <div className="w-20 h-20 rounded-full overflow-hidden ring-2 ring-gray-100 group-hover:ring-blue-300 transition-all duration-300">
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <User className="w-8 h-8 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Actor Info */}
      <div className="text-center">
        <h4 className="text-sm font-bold text-gray-800 mb-1 leading-tight">
          { actor.firstName } { actor.lastName }
        </h4>
        {actor.birthDate && <p className="text-xs text-gray-500 leading-tight">Birth Date: { formatDate(actor.birthDate) }</p>}
      </div>
    </div>
  );
};

export default ActorCard; 