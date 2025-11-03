import { AnimatePresence, motion } from 'framer-motion';
import { EyeIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';

interface ActionButtonsProps<T extends string | number> {
  onView?: (id: T) => void;
  onEdit?: (id: T) => void;
  onDelete?: (id: T) => void;
  entityId: T;
}

const ActionButtons = <T extends string | number>({
  onView,
  onEdit,
  onDelete,
  entityId,
}: ActionButtonsProps<T>) => {
  const baseStyles =
    "rounded-xl p-2.5 transition-all duration-200 shadow-sm hover:shadow-md hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2";

  return (
    <AnimatePresence>
      <motion.div className="flex justify-center items-center gap-3 text-gray-700 dark:text-gray-200">
        {onView && (
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => onView(entityId)}
            className={`${baseStyles} bg-indigo-100 hover:bg-indigo-200 dark:bg-indigo-700 dark:hover:bg-indigo-600 focus:ring-indigo-400`}
            title="Ver detalles"
          >
            <EyeIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-300" />
          </motion.button>
        )}
        {onEdit && (
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => onEdit(entityId)}
            className={`${baseStyles} bg-teal-100 hover:bg-teal-200 dark:bg-teal-700 dark:hover:bg-teal-600 focus:ring-teal-400`}
            title="Editar registro"
          >
            <PencilSquareIcon className="w-5 h-5 text-teal-600 dark:text-teal-300" />
          </motion.button>
        )}
        {onDelete && (
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => onDelete(entityId)}
            className={`${baseStyles} bg-orange-100 hover:bg-orange-200 dark:bg-orange-700 dark:hover:bg-orange-600 focus:ring-orange-400`}
            title="Eliminar registro"
          >
            <TrashIcon className="w-5 h-5 text-orange-600 dark:text-orange-300" />
          </motion.button>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default ActionButtons;